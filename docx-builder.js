/**
 * Universal DOCX Generator for Sərbəst İş
 * Həm Node.js serverində, həm də birbaşa brauzerdə (Client-Side) 100% işləyir.
 * Sıfır kənar asılılıq (Zero-dependency).
 */

(function (global) {
  'use strict';

  // Helper: Escape XML
  function escapeXml(unsafe) {
    if (unsafe === undefined || unsafe === null) return '';
    return String(unsafe)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  // CRC32 table
  const crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    crcTable[i] = c >>> 0;
  }

  function calculateCrc32(bytes) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xFF];
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  // Convert string or Uint8Array/Buffer to Uint8Array
  function toUint8Array(input) {
    if (typeof input === 'string') {
      if (typeof TextEncoder !== 'undefined') {
        return new TextEncoder().encode(input);
      }
      if (typeof Buffer !== 'undefined') {
        return Uint8Array.from(Buffer.from(input, 'utf8'));
      }
    }
    if (input instanceof Uint8Array) return input;
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(input)) {
      return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
    }
    return new Uint8Array(0);
  }

  // Universal ZIP Builder (Supports Deflate if zlib provided, otherwise Store method 0)
  function createZipArchive(files, zlibModule) {
    const isNode = typeof Buffer !== 'undefined';
    const localHeaders = [];
    const centralDirHeaders = [];
    let offset = 0;

    for (const file of files) {
      const nameBytes = toUint8Array(file.name);
      const rawBytes = toUint8Array(file.data);
      const crc = calculateCrc32(rawBytes);

      let compBytes = rawBytes;
      let compMethod = 0; // 0 = Store (Uncompressed, universally supported by MS Word)

      if (zlibModule && typeof zlibModule.deflateRawSync === 'function') {
        try {
          const def = zlibModule.deflateRawSync(rawBytes);
          compBytes = toUint8Array(def);
          compMethod = 8; // 8 = Deflate
        } catch (e) {
          compBytes = rawBytes;
          compMethod = 0;
        }
      }

      // Local File Header (30 bytes + filename)
      const lhBuf = new Uint8Array(30 + nameBytes.length);
      const lhView = new DataView(lhBuf.buffer);
      lhView.setUint32(0, 0x04034b50, true); // signature
      lhView.setUint16(4, 20, true);         // version needed (2.0)
      lhView.setUint16(6, 0x0800, true);     // flags (UTF-8)
      lhView.setUint16(8, compMethod, true); // compression
      lhView.setUint16(10, 0, true);         // time
      lhView.setUint16(12, 0, true);         // date
      lhView.setUint32(14, crc, true);       // crc-32
      lhView.setUint32(18, compBytes.length, true); // compressed size
      lhView.setUint32(22, rawBytes.length, true);  // uncompressed size
      lhView.setUint16(26, nameBytes.length, true); // name length
      lhView.setUint16(28, 0, true);                // extra field len
      lhBuf.set(nameBytes, 30);

      localHeaders.push(lhBuf, compBytes);

      // Central Directory Header (46 bytes + filename)
      const cdBuf = new Uint8Array(46 + nameBytes.length);
      const cdView = new DataView(cdBuf.buffer);
      cdView.setUint32(0, 0x02014b50, true); // signature
      cdView.setUint16(4, 20, true);         // version made by
      cdView.setUint16(6, 20, true);         // version needed
      cdView.setUint16(8, 0x0800, true);     // flags
      cdView.setUint16(10, compMethod, true);// compression
      cdView.setUint16(12, 0, true);         // time
      cdView.setUint16(14, 0, true);         // date
      cdView.setUint32(16, crc, true);       // crc32
      cdView.setUint32(20, compBytes.length, true); // compressed size
      cdView.setUint32(24, rawBytes.length, true);  // uncompressed size
      cdView.setUint16(28, nameBytes.length, true); // name length
      cdView.setUint16(30, 0, true);         // extra len
      cdView.setUint16(32, 0, true);         // comment len
      cdView.setUint16(34, 0, true);         // disk start
      cdView.setUint16(36, 0, true);         // internal file attr
      cdView.setUint32(38, 0, true);         // external file attr
      cdView.setUint32(42, offset, true);    // relative offset of local header
      cdBuf.set(nameBytes, 46);

      centralDirHeaders.push(cdBuf);
      offset += lhBuf.length + compBytes.length;
    }

    const cdOffset = offset;
    let cdSize = 0;
    for (const c of centralDirHeaders) {
      cdSize += c.length;
    }

    // End of Central Directory Record (22 bytes)
    const eocd = new Uint8Array(22);
    const eocdView = new DataView(eocd.buffer);
    eocdView.setUint32(0, 0x06054b50, true);
    eocdView.setUint16(4, 0, true);  // disk
    eocdView.setUint16(6, 0, true);  // disk start
    eocdView.setUint16(8, files.length, true);  // entries on disk
    eocdView.setUint16(10, files.length, true); // total entries
    eocdView.setUint32(12, cdSize, true);
    eocdView.setUint32(16, cdOffset, true);
    eocdView.setUint16(20, 0, true);

    // Merge into single continuous buffer
    const allChunks = [...localHeaders, ...centralDirHeaders, eocd];
    let totalLen = 0;
    for (const chunk of allChunks) totalLen += chunk.length;

    const out = new Uint8Array(totalLen);
    let cur = 0;
    for (const chunk of allChunks) {
      out.set(chunk, cur);
      cur += chunk.length;
    }

    if (isNode) {
      return Buffer.from(out.buffer);
    }
    return out;
  }

  /**
   * Generates DOCX bytes from structured academic data.
   */
  function generateSerbestIsDocx(data, zlibModule) {
    const {
      ministry = "AZƏRBAYCAN RESPUBLİKASI ELM VƏ TƏHSİL NAZİRLİYİ",
      university = "BAKI DÖVLƏT UNİVERSİTETİ",
      faculty = "Tətbiqi Riyaziyyat və Kibernetika fakültəsi",
      department = "İnformatika kafedrası",
      specialty = "Kompüter elmləri",
      subject = "Süni İntellekt Sistemləri",
      topic = "Müasir Cəmiyyətdə Süni İntellektin Rolu və İnkişaf Perspektivləri",
      course = "III",
      group = "682a",
      student = "Əliyev Əli Məmməd oğlu",
      supervisor = "dos. Məmmədov Vüqar Həsən oğlu",
      city = "Bakı",
      year = "2026",
      plan = [],
      sections = [],
      conclusion = "",
      references = []
    } = data;

    const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>
</Types>`;

    const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

    const docRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>
</Relationships>`;

    const footer1Xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:p>
    <w:pPr><w:jc w:val="center"/></w:pPr>
    <w:r>
      <w:rPr>
        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
        <w:sz w:val="24"/>
      </w:rPr>
      <w:fldSimple w:instr="PAGE"/>
    </w:r>
  </w:p>
</w:ftr>`;

    const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Times New Roman" w:eastAsia="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
        <w:sz w:val="28"/>
        <w:szCs w:val="28"/>
        <w:lang w:val="az-Latn-AZ"/>
      </w:rPr>
    </w:rPrDefault>
    <w:pPrDefault>
      <w:pPr>
        <w:spacing w:line="360" w:lineRule="auto" w:after="0" w:before="0"/>
      </w:pPr>
    </w:pPrDefault>
  </w:docDefaults>
</w:styles>`;

    function p(text, options = {}) {
      const {
        bold = false,
        size = 28,
        align = "both",
        indent = 709,
        before = 0,
        after = 0,
        pageBreak = false
      } = options;

      let pPr = `<w:pPr>`;
      if (pageBreak) pPr += `<w:pageBreakBefore/>`;
      pPr += `<w:jc w:val="${align}"/>`;
      pPr += `<w:spacing w:line="360" w:lineRule="auto" w:before="${before}" w:after="${after}"/>`;
      if (indent > 0) pPr += `<w:ind w:firstLine="${indent}"/>`;
      pPr += `</w:pPr>`;

      let rPr = `<w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/><w:sz w:val="${size}"/><w:szCs w:val="${size}"/>`;
      if (bold) rPr += `<w:b/><w:bCs/>`;
      rPr += `</w:rPr>`;

      return `<w:p>${pPr}<w:r>${rPr}<w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r></w:p>`;
    }

    function emptyP(lines = 1) {
      let out = '';
      for (let i = 0; i < lines; i++) {
        out += `<w:p><w:pPr><w:spacing w:line="360" w:lineRule="auto" w:before="0" w:after="0"/></w:pPr></w:p>`;
      }
      return out;
    }

    let bodyXml = '';

    // ==================== TITUL VƏRƏQİ ====================
    bodyXml += p(ministry.toUpperCase(), { bold: true, align: "center", size: 26, indent: 0, before: 100, after: 100 });
    bodyXml += p(university.toUpperCase(), { bold: true, align: "center", size: 28, indent: 0, after: 140 });
    if (faculty) bodyXml += p(faculty, { bold: false, align: "center", size: 26, indent: 0, after: 80 });
    if (department) bodyXml += p(department, { bold: false, align: "center", size: 26, indent: 0, after: 200 });

    bodyXml += emptyP(3);
    bodyXml += p("S Ə R B Ə S T   İ Ş", { bold: true, align: "center", size: 36, indent: 0, before: 200, after: 200 });
    bodyXml += emptyP(2);

    bodyXml += p(`Fənn:  ${subject}`, { bold: true, align: "center", size: 28, indent: 0, after: 120 });
    bodyXml += p(`Mövzu:  "${topic}"`, { bold: true, align: "center", size: 28, indent: 0, after: 200 });

    bodyXml += emptyP(4);

    bodyXml += `<w:p><w:pPr><w:jc w:val="right"/><w:spacing w:line="360" w:lineRule="auto"/></w:pPr>
      <w:r><w:rPr><w:rFonts w:ascii="Times New Roman"/><w:sz w:val="26"/><w:b/></w:rPr><w:t>İxtisas: </w:t></w:r>
      <w:r><w:rPr><w:rFonts w:ascii="Times New Roman"/><w:sz w:val="26"/></w:rPr><w:t>${escapeXml(specialty)}</w:t></w:r>
    </w:p>`;

    if (course || group) {
      bodyXml += `<w:p><w:pPr><w:jc w:val="right"/><w:spacing w:line="360" w:lineRule="auto"/></w:pPr>
        <w:r><w:rPr><w:rFonts w:ascii="Times New Roman"/><w:sz w:val="26"/><w:b/></w:rPr><w:t>Kurs / Qrup: </w:t></w:r>
        <w:r><w:rPr><w:rFonts w:ascii="Times New Roman"/><w:sz w:val="26"/></w:rPr><w:t>${escapeXml(course)} kurs, ${escapeXml(group)} qrupu</w:t></w:r>
      </w:p>`;
    }

    bodyXml += `<w:p><w:pPr><w:jc w:val="right"/><w:spacing w:line="360" w:lineRule="auto"/></w:pPr>
      <w:r><w:rPr><w:rFonts w:ascii="Times New Roman"/><w:sz w:val="26"/><w:b/></w:rPr><w:t>Tələbə: </w:t></w:r>
      <w:r><w:rPr><w:rFonts w:ascii="Times New Roman"/><w:sz w:val="26"/></w:rPr><w:t>${escapeXml(student)}</w:t></w:r>
    </w:p>`;

    bodyXml += `<w:p><w:pPr><w:jc w:val="right"/><w:spacing w:line="360" w:lineRule="auto"/></w:pPr>
      <w:r><w:rPr><w:rFonts w:ascii="Times New Roman"/><w:sz w:val="26"/><w:b/></w:rPr><w:t>Elmi rəhbər: </w:t></w:r>
      <w:r><w:rPr><w:rFonts w:ascii="Times New Roman"/><w:sz w:val="26"/></w:rPr><w:t>${escapeXml(supervisor)}</w:t></w:r>
    </w:p>`;

    bodyXml += emptyP(3);
    bodyXml += p(`${city.toUpperCase()} – ${year}`, { bold: true, align: "center", size: 26, indent: 0, before: 200, after: 100 });

    // ==================== PLAN ====================
    bodyXml += `<w:p><w:pPr><w:pageBreakBefore/></w:pPr></w:p>`;
    bodyXml += p("P L A N", { bold: true, align: "center", size: 30, indent: 0, before: 100, after: 240 });

    if (plan && plan.length > 0) {
      plan.forEach(item => {
        bodyXml += p(item, { bold: false, align: "left", size: 28, indent: 709, after: 100 });
      });
    }

    // ==================== SECTIONS ====================
    if (sections && sections.length > 0) {
      sections.forEach(sec => {
        bodyXml += `<w:p><w:pPr><w:pageBreakBefore/></w:pPr></w:p>`;
        bodyXml += p(sec.title.toUpperCase(), { bold: true, align: "center", size: 28, indent: 0, before: 200, after: 200 });

        const paras = Array.isArray(sec.content) ? sec.content : String(sec.content).split('\n');
        paras.forEach(para => {
          if (para.trim()) {
            bodyXml += p(para.trim(), { bold: false, align: "both", size: 28, indent: 709, after: 100 });
          }
        });
      });
    }

    // ==================== NƏTİCƏ ====================
    if (conclusion) {
      bodyXml += `<w:p><w:pPr><w:pageBreakBefore/></w:pPr></w:p>`;
      bodyXml += p("N Ə T İ C Ə", { bold: true, align: "center", size: 28, indent: 0, before: 200, after: 200 });
      const concParas = Array.isArray(conclusion) ? conclusion : String(conclusion).split('\n');
      concParas.forEach(para => {
        if (para.trim()) {
          bodyXml += p(para.trim(), { bold: false, align: "both", size: 28, indent: 709, after: 100 });
        }
      });
    }

    // ==================== ƏDƏBİYYAT ====================
    if (references && references.length > 0) {
      bodyXml += `<w:p><w:pPr><w:pageBreakBefore/></w:pPr></w:p>`;
      bodyXml += p("İSTİFADƏ EDİLMİŞ ƏDƏBİYYAT", { bold: true, align: "center", size: 28, indent: 0, before: 200, after: 200 });
      references.forEach((ref, idx) => {
        const refText = /^\d+[\.\)]/.test(ref.trim()) ? ref.trim() : `${idx + 1}. ${ref.trim()}`;
        bodyXml += p(refText, { bold: false, align: "left", size: 26, indent: 709, after: 80 });
      });
    }

    const sectPr = `<w:sectPr>
      <w:footerReference w:type="default" r:id="rId2" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/>
      <w:titlePg/>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1134" w:right="850" w:bottom="1134" w:left="1701" w:header="708" w:footer="708" w:gutter="0"/>
      <w:cols w:space="708"/>
      <w:docGrid w:linePitch="360"/>
    </w:sectPr>`;

    const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${bodyXml}
    ${sectPr}
  </w:body>
</w:document>`;

    const files = [
      { name: '[Content_Types].xml', data: contentTypesXml },
      { name: '_rels/.rels', data: relsXml },
      { name: 'word/_rels/document.xml.rels', data: docRelsXml },
      { name: 'word/styles.xml', data: stylesXml },
      { name: 'word/footer1.xml', data: footer1Xml },
      { name: 'word/document.xml', data: documentXml }
    ];

    return createZipArchive(files, zlibModule);
  }

  // Export for Node and Browser
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      generateSerbestIsDocx,
      createZipArchive,
      calculateCrc32
    };
  } else {
    global.generateSerbestIsDocx = generateSerbestIsDocx;
    global.createZipArchive = createZipArchive;
  }
})(typeof window !== 'undefined' ? window : global);
