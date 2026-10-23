/**
 * Sərbəst İş Hazırlayan Proqram - Əsas İdarəetmə Skripti
 */

// Initial State with standard Azerbaijani University defaults
let currentDoc = {
  ministry: "AZƏRBAYCAN RESPUBLİKASI ELM VƏ TƏHSİL NAZİRLİYİ",
  university: "BAKI DÖVLƏT UNİVERSİTETİ",
  faculty: "Tətbiqi Riyaziyyat və Kibernetika fakültəsi",
  department: "İnformatika kafedrası",
  specialty: "Kompüter elmləri",
  subject: "Süni İntellekt Sistemləri",
  topic: "Müasir Cəmiyyətdə Süni İntellektin Rolu və İnkişaf Perspektivləri",
  course: "III",
  group: "682a",
  student: "Əliyev Əli Məmməd oğlu",
  supervisor: "dos. Məmmədov Vüqar Həsən oğlu",
  city: "Bakı",
  year: "2026",
  plan: [
    "Giriş",
    "1. Süni intellekt anlayışı, tarixi təkamülü və əsas istiqamətləri",
    "2. Maşın öyrənməsi və dərin neyron şəbəkələrinin iş prinsipləri",
    "3. Süni intellektin iqtisadiyyat, səhiyyə və təhsildə tətbiqi sahələri",
    "4. Süni intellektin tətbiqində etik, hüquqi və təhlükəsizlik problemləri",
    "Nəticə və təkliflər",
    "İstifadə edilmiş ədəbiyyat siyahısı"
  ],
  sections: [],
  conclusion: [],
  references: []
};

// University presets catalog
const UNIVERSITIES = [
  {
    name: "BAKI DÖVLƏT UNİVERSİTETİ",
    faculties: [
      "Tətbiqi Riyaziyyat və Kibernetika fakültəsi",
      "İnformasiya və sənəd menecmenti fakültəsi",
      "Mexanika-Riyaziyyat fakültəsi",
      "Fizika fakültəsi",
      "Kimya fakültəsi",
      "Biologiya fakültəsi",
      "Tarix fakültəsi",
      "Filologiya fakültəsi",
      "Hüquq fakültəsi",
      "Beynəlxalq münasibətlər və İqtisadiyyat fakültəsi"
    ]
  },
  {
    name: "AZƏRBAYCAN DÖVLƏT İQTİSAD UNİVERSİTETİ (UNEC)",
    faculties: [
      "Rəqəmsal İqtisadiyyat fakültəsi",
      "Maliyyə və Mühasibat fakültəsi",
      "İqtisadiyyat və İdarəetmə fakültəsi",
      "Biznes və Menecment fakültəsi",
      "Mühəndislik fakültəsi"
    ]
  },
  {
    name: "AZƏRBAYCAN DÖVLƏT NEFT VƏ SƏNAYƏ UNİVERSİTETİ (ADNSU)",
    faculties: [
      "İnformasiya Texnologiyaları və İdarəetmə fakültəsi (İTİF)",
      "Qaz-Neft-Mədən fakültəsi",
      "Kimya-Texnologiya fakültəsi",
      "Neft-Mexanika fakültəsi",
      "Energetika fakültəsi"
    ]
  },
  {
    name: "AZƏRBAYCAN TEXNİKİ UNİVERSİTETİ (AzTU)",
    faculties: [
      "İnformasiya və Kommunikasiya Texnologiyaları fakültəsi",
      "Kibertəhlükəsizlik fakültəsi",
      "Maşınqayırma və Robototexnika fakültəsi",
      "Nəqliyyat və Logistika fakültəsi"
    ]
  },
  {
    name: "BAKI MÜHƏNDİSLİK UNİVERSİTETİ (BMU)",
    faculties: [
      "Mühəndislik fakültəsi",
      "İnformasiya Texnologiyaları fakültəsi",
      "İqtisadiyyat və İdarəetmə fakültəsi",
      "Pedaqoji fakültə"
    ]
  },
  {
    name: "AZƏRBAYCAN TİBB UNİVERSİTETİ (ATU)",
    faculties: [
      "I Müalicə-Profilaktika fakültəsi",
      "II Müalicə-Profilaktika fakültəsi",
      "Stomatologiya fakültəsi",
      "Əczaçılıq fakültəsi",
      "İctimai Səhiyyə fakültəsi"
    ]
  },
  {
    name: "ADA UNİVERSİTETİ",
    faculties: [
      "İnformasiya Texnologiyaları və Mühəndislik Məktəbi",
      "Biznes Məktəbi",
      "İctimai və Beynəlxalq Münasibətlər Məktəbi"
    ]
  },
  {
    name: "AZƏRBAYCAN DÖVLƏT PEDAQOJİ UNİVERSİTETİ (ADPU)",
    faculties: [
      "Riyaziyyat və İnformatika fakültəsi",
      "Filologiya fakültəsi",
      "Tarix və Coğrafiya fakültəsi",
      "Pedaqogika və Psixologiya fakültəsi"
    ]
  },
  {
    name: "MİLLİ AVİASİYA AKADEMİYASI (MAA)",
    faculties: [
      "Aerokosmik fakültə",
      "Aviasiya Radiotexnikası və Elektronikası fakültəsi",
      "Hava Nəqliyyatının Uçuş İstismarı fakültəsi"
    ]
  },
  {
    name: "DİGƏR (Xüsusi daxil et)",
    faculties: []
  }
];

// Document Zoom Level
let zoom = 100;

document.addEventListener('DOMContentLoaded', () => {
  initUniversityDropdown();
  initTabs();
  initTopicChips();
  initGenerator();
  initEventListeners();

  // Load initial content from knowledge base / default
  triggerInitialGeneration();
});

// Toast notification helper
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => {
    toast.className = 'toast';
  }, 3500);
}

// Initialize University Dropdown
function initUniversityDropdown() {
  const select = document.getElementById('selectUniversity');
  select.innerHTML = '';

  UNIVERSITIES.forEach((uni, idx) => {
    const opt = document.createElement('option');
    opt.value = uni.name;
    opt.textContent = uni.name;
    if (idx === 0) opt.selected = true;
    select.appendChild(opt);
  });

  select.addEventListener('change', (e) => {
    const selectedUni = UNIVERSITIES.find(u => u.name === e.target.value);
    const customInput = document.getElementById('inputUniversityCustom');
    const facultyDatalist = document.getElementById('facultyList');
    const facultyInput = document.getElementById('inputFaculty');

    if (e.target.value === "DİGƏR (Xüsusi daxil et)") {
      customInput.value = "";
      customInput.focus();
    } else {
      customInput.value = e.target.value;
    }

    // Populate faculty datalist
    facultyDatalist.innerHTML = '';
    if (selectedUni && selectedUni.faculties.length > 0) {
      selectedUni.faculties.forEach(fac => {
        const o = document.createElement('option');
        o.value = fac;
        facultyDatalist.appendChild(o);
      });
      facultyInput.value = selectedUni.faculties[0];
    }

    updateTitulData();
  });

  // Trigger initial populate
  const initialUni = UNIVERSITIES[0];
  const facultyDatalist = document.getElementById('facultyList');
  initialUni.faculties.forEach(fac => {
    const o = document.createElement('option');
    o.value = fac;
    facultyDatalist.appendChild(o);
  });
}

// Tab Switching
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

// Popular Topic Chips
function initTopicChips() {
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const type = chip.getAttribute('data-topic');
      if (type === 'ai') {
        document.getElementById('inputTopic').value = "Müasir Cəmiyyətdə Süni İntellektin Rolu və İnkişaf Perspektivləri";
        document.getElementById('inputSubject').value = "Süni İntellekt Sistemləri";
        document.getElementById('inputSpecialty').value = "Kompüter elmləri";
      } else if (type === 'cyber') {
        document.getElementById('inputTopic').value = "Müasir İnformasiya Şəbəkələrində Kibertəhlükəsizlik və Məlumatların Qorunması";
        document.getElementById('inputSubject').value = "Kibertəhlükəsizliyin Əsasları";
        document.getElementById('inputSpecialty').value = "İnformasiya təhlükəsizliyi";
      } else if (type === 'economy') {
        document.getElementById('inputTopic').value = "Rəqəmsal İqtisadiyyatın İnkişafı və Onun Milli İqtisadiyyata Təsiri";
        document.getElementById('inputSubject').value = "Milli İqtisadiyyatın Əsasları";
        document.getElementById('inputSpecialty').value = "Maliyyə və İqtisadiyyat";
      } else if (type === 'custom-green') {
        document.getElementById('inputTopic').value = "Azərbaycanın Yaşıl Enerji Strategiyası və Qlobal Ekoloji Təşəbbüslər (COP29)";
        document.getElementById('inputSubject').value = "Ekologiya və Ətraf Mühit";
        document.getElementById('inputSpecialty').value = "Ekologiya mühəndisliyi";
      } else if (type === 'custom-karabakh') {
        document.getElementById('inputTopic').value = "Qarabağ və Şərqi Zəngəzur İqtisadi Rayonlarının Bərpası və Ağıllı Şəhər Konsepsiyası";
        document.getElementById('inputSubject').value = "Regional İqtisadiyyat və İdarəetmə";
        document.getElementById('inputSpecialty').value = "Dövlət və Bələdiyyə İdarəetməsi";
      }

      showToast("Mövzu seçildi. Generasiya düyməsini klikləyin.");
    });
  });
}

// Generator Mode Switch (Offline vs Gemini AI)
function initGenerator() {
  const modeSelect = document.getElementById('generatorMode');
  const geminiGroup = document.getElementById('geminiKeyGroup');

  modeSelect.addEventListener('change', () => {
    if (modeSelect.value === 'gemini') {
      geminiGroup.classList.remove('hidden');
    } else {
      geminiGroup.classList.add('hidden');
    }
  });

  const btnGenerate = document.getElementById('btnGenerate');
  btnGenerate.addEventListener('click', async () => {
    await performGeneration();
  });
}

// Perform generation
async function performGeneration() {
  const topic = document.getElementById('inputTopic').value.trim();
  const subject = document.getElementById('inputSubject').value.trim();
  const specialty = document.getElementById('inputSpecialty').value.trim();
  const mode = document.getElementById('generatorMode').value;
  const apiKey = document.getElementById('geminiApiKey').value.trim();
  const btnGenerate = document.getElementById('btnGenerate');

  if (!topic) {
    showToast("Zəhmət olmasa mövzunu daxil edin!", "error");
    return;
  }

  btnGenerate.disabled = true;
  btnGenerate.innerHTML = `<span>⏳</span> Mətn hazırlanır, zəhmət olmasa gözləyin...`;

  try {
    let resultData = null;

    if (mode === 'gemini') {
      if (!apiKey) {
        throw new Error("Gemini API açarını daxil edin və ya Daxili Generatordan istifadə edin!");
      }
      showToast("Gemini AI ilə əlaqə yaradılır...", "info");

      // Try server endpoint first, fallback to direct client call if server unavailable
      try {
        const resp = await fetch('/api/ai-generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey, topic, subject, specialty })
        });
        const json = await resp.json();
        if (!json.success) throw new Error(json.error || 'AI xətası');
        resultData = json.data;
      } catch (serverErr) {
        // Client-side direct call to Gemini
        const directResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Azərbaycan dilində akademik sərbəst iş hazırla: Mövzu: "${topic}", Fənn: "${subject}", İxtisas: "${specialty}". Aşağıdakı JSON formatında cavab ver: {"topic":"${topic}","plan":["Giriş","1. ...","2. ...","3. ...","Nəticə","Ədəbiyyat"],"sections":[{"title":"GİRİŞ","content":["..."]},{"title":"1. ...","content":["..."]}],"conclusion":["..."],"references":["..."]}` }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });
        const directJson = await directResp.json();
        const raw = directJson.candidates[0].content.parts[0].text;
        resultData = JSON.parse(raw);
      }
    } else {
      // Offline / Internal Generator
      let loaded = false;
      try {
        const resp = await fetch('/api/generate-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic, subject, specialty })
        });
        if (resp.ok) {
          const json = await resp.json();
          if (json.success) {
            resultData = json.data;
            loaded = true;
          }
        }
      } catch (e) {
        // network / file protocol fallback
      }

      if (!loaded && typeof window.generateAcademicContent === 'function') {
        resultData = window.generateAcademicContent({ topic, subject, specialty });
      }
    }

    // Apply generated data
    currentDoc.topic = resultData.topic || topic;
    currentDoc.subject = subject || currentDoc.subject;
    currentDoc.specialty = specialty || currentDoc.specialty;
    currentDoc.plan = resultData.plan || [];
    currentDoc.sections = resultData.sections || [];
    currentDoc.conclusion = resultData.conclusion || [];
    currentDoc.references = resultData.references || [];

    // Populate editor tab
    syncDocToEditor();

    // Render A4 sheets
    renderPages();

    showToast("Sərbəst iş mətni tam uğurla hazırlandı!", "success");
  } catch (err) {
    console.error(err);
    showToast("Xəta: " + err.message, "error");
  } finally {
    btnGenerate.disabled = false;
    btnGenerate.innerHTML = `<span>✨</span> Mətni Avtomatik Generasiya Et`;
  }
}

// Initial generation on page load
async function triggerInitialGeneration() {
  updateTitulData();
  await performGeneration();
}

// Synchronize state from Titul form
function updateTitulData() {
  currentDoc.ministry = document.getElementById('inputMinistry').value;
  currentDoc.university = document.getElementById('inputUniversityCustom').value;
  currentDoc.faculty = document.getElementById('inputFaculty').value;
  currentDoc.department = document.getElementById('inputDepartment').value;
  currentDoc.course = document.getElementById('inputCourse').value;
  currentDoc.group = document.getElementById('inputGroup').value;
  currentDoc.student = document.getElementById('inputStudent').value;
  currentDoc.supervisor = document.getElementById('inputSupervisor').value;
  currentDoc.city = document.getElementById('inputCity').value;
  currentDoc.year = document.getElementById('inputYear').value;
  currentDoc.subject = document.getElementById('inputSubject').value;
  currentDoc.specialty = document.getElementById('inputSpecialty').value;
  currentDoc.topic = document.getElementById('inputTopic').value;

  renderPages();
}

// Sync currentDoc to the Editor Textareas
function syncDocToEditor() {
  document.getElementById('editPlan').value = currentDoc.plan.join('\n');
  document.getElementById('editConclusion').value = Array.isArray(currentDoc.conclusion) ? currentDoc.conclusion.join('\n\n') : currentDoc.conclusion;
  document.getElementById('editReferences').value = currentDoc.references.join('\n');
}

// Sync Editor Textareas back to currentDoc
function syncEditorToDoc() {
  const planLines = document.getElementById('editPlan').value.split('\n').map(s => s.trim()).filter(Boolean);
  const concLines = document.getElementById('editConclusion').value.split('\n\n').map(s => s.trim()).filter(Boolean);
  const refLines = document.getElementById('editReferences').value.split('\n').map(s => s.trim()).filter(Boolean);

  currentDoc.plan = planLines;
  currentDoc.conclusion = concLines;
  currentDoc.references = refLines;

  renderPages();
  showToast("Dəyişikliklər tətbiq edildi!", "success");
}

// Event Listeners for buttons and zoom
function initEventListeners() {
  document.getElementById('btnApplyTitul').addEventListener('click', () => {
    updateTitulData();
    showToast("Titul vərəqi yeniləndi!", "success");
  });

  document.getElementById('btnApplyContentChanges').addEventListener('click', () => {
    syncEditorToDoc();
  });

  // Download DOCX
  document.getElementById('btnDownloadDocx').addEventListener('click', async () => {
    await downloadDocx();
  });

  // Print / PDF
  document.getElementById('btnPrintPdf').addEventListener('click', () => {
    window.print();
  });

  // Copy All Text
  document.getElementById('btnCopyText').addEventListener('click', () => {
    copyAllPlainText();
  });

  // Zoom Controls
  document.getElementById('btnZoomIn').addEventListener('click', () => {
    if (zoom < 150) {
      zoom += 10;
      applyZoom();
    }
  });

  document.getElementById('btnZoomOut').addEventListener('click', () => {
    if (zoom > 60) {
      zoom -= 10;
      applyZoom();
    }
  });
}

function applyZoom() {
  const wrapper = document.getElementById('pagesWrapper');
  wrapper.style.transform = `scale(${zoom / 100})`;
  wrapper.style.transformOrigin = 'top center';
  document.getElementById('zoomLevel').textContent = `${zoom}%`;
}

// Render A4 sheets in preview
function renderPages() {
  const wrapper = document.getElementById('pagesWrapper');
  wrapper.innerHTML = '';

  let pageNum = 1;

  // PAGE 1: TITUL VƏRƏQİ (No page number printed)
  const page1 = document.createElement('div');
  page1.className = 'a4-page';
  page1.innerHTML = `
    <div class="titul-ministry" contenteditable="true">${escapeHtml(currentDoc.ministry)}</div>
    <div class="titul-university" contenteditable="true">${escapeHtml(currentDoc.university)}</div>
    ${currentDoc.faculty ? `<div class="titul-faculty" contenteditable="true">${escapeHtml(currentDoc.faculty)}</div>` : ''}
    ${currentDoc.department ? `<div class="titul-department" contenteditable="true">${escapeHtml(currentDoc.department)}</div>` : ''}

    <div class="titul-center-badge">S Ə R B Ə S T &nbsp; İ Ş</div>

    <div class="titul-subject" contenteditable="true">Fənn: ${escapeHtml(currentDoc.subject)}</div>
    <div class="titul-topic" contenteditable="true">Mövzu: "${escapeHtml(currentDoc.topic)}"</div>

    <div class="titul-info-block">
      <div class="titul-info-row"><strong>İxtisas:</strong> <span contenteditable="true">${escapeHtml(currentDoc.specialty)}</span></div>
      <div class="titul-info-row"><strong>Kurs / Qrup:</strong> <span contenteditable="true">${escapeHtml(currentDoc.course)} kurs, ${escapeHtml(currentDoc.group)}</span></div>
      <div class="titul-info-row"><strong>Tələbə:</strong> <span contenteditable="true">${escapeHtml(currentDoc.student)}</span></div>
      <div class="titul-info-row"><strong>Elmi rəhbər:</strong> <span contenteditable="true">${escapeHtml(currentDoc.supervisor)}</span></div>
    </div>

    <div class="titul-footer" contenteditable="true">${escapeHtml(currentDoc.city.toUpperCase())} – ${escapeHtml(currentDoc.year)}</div>
  `;
  wrapper.appendChild(page1);

  // PAGE 2: PLAN (MÜNDƏRİCAT)
  pageNum++;
  const page2 = document.createElement('div');
  page2.className = 'a4-page';
  let planHtml = `
    <div class="doc-heading-center">P L A N</div>
    <div style="margin-top: 30px;">
  `;
  currentDoc.plan.forEach(item => {
    planHtml += `<div class="plan-item" contenteditable="true">${escapeHtml(item)}</div>`;
  });
  planHtml += `</div>
    <div class="page-number-footer">${pageNum}</div>
  `;
  page2.innerHTML = planHtml;
  wrapper.appendChild(page2);

  // CONTENT PAGES (Giriş & Sections)
  if (currentDoc.sections && currentDoc.sections.length > 0) {
    currentDoc.sections.forEach((sec, idx) => {
      pageNum++;
      const p = document.createElement('div');
      p.className = 'a4-page';

      let secHtml = `<div class="doc-heading-center" contenteditable="true">${escapeHtml(sec.title)}</div>`;
      const paras = Array.isArray(sec.content) ? sec.content : String(sec.content).split('\n');
      paras.forEach(para => {
        if (para.trim()) {
          secHtml += `<p class="doc-paragraph" contenteditable="true">${escapeHtml(para)}</p>`;
        }
      });
      secHtml += `<div class="page-number-footer">${pageNum}</div>`;
      p.innerHTML = secHtml;
      wrapper.appendChild(p);
    });
  }

  // CONCLUSION PAGE
  if (currentDoc.conclusion && currentDoc.conclusion.length > 0) {
    pageNum++;
    const pConc = document.createElement('div');
    pConc.className = 'a4-page';
    let concHtml = `<div class="doc-heading-center">N Ə T İ C Ə</div>`;
    const concParas = Array.isArray(currentDoc.conclusion) ? currentDoc.conclusion : String(currentDoc.conclusion).split('\n');
    concParas.forEach(para => {
      if (para.trim()) {
        concHtml += `<p class="doc-paragraph" contenteditable="true">${escapeHtml(para)}</p>`;
      }
    });
    concHtml += `<div class="page-number-footer">${pageNum}</div>`;
    pConc.innerHTML = concHtml;
    wrapper.appendChild(pConc);
  }

  // REFERENCES PAGE
  if (currentDoc.references && currentDoc.references.length > 0) {
    pageNum++;
    const pRef = document.createElement('div');
    pRef.className = 'a4-page';
    let refHtml = `<div class="doc-heading-center">İSTİFADƏ EDİLMİŞ ƏDƏBİYYAT</div><div style="margin-top: 25px;">`;
    currentDoc.references.forEach((ref, idx) => {
      const refText = /^\d+[\.\)]/.test(ref.trim()) ? ref.trim() : `${idx + 1}. ${ref.trim()}`;
      refHtml += `<div class="reference-item" contenteditable="true">${escapeHtml(refText)}</div>`;
    });
    refHtml += `</div><div class="page-number-footer">${pageNum}</div>`;
    pRef.innerHTML = refHtml;
    wrapper.appendChild(pRef);
  }
}

// Download DOCX file
async function downloadDocx() {
  const btn = document.getElementById('btnDownloadDocx');
  btn.disabled = true;
  btn.innerHTML = `<span>⏳</span> Word Faylı Hazırlanır...`;

  try {
    let blob = null;

    // Try server endpoint first
    try {
      const resp = await fetch('/api/generate-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentDoc)
      });

      if (resp.ok) {
        blob = await resp.blob();
      }
    } catch (netErr) {
      // Server is offline or app opened via file://
    }

    // Client-side fallback if server not reachable
    if (!blob && typeof window.generateSerbestIsDocx === 'function') {
      const docxBytes = window.generateSerbestIsDocx(currentDoc);
      blob = new Blob([docxBytes], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
    }

    if (!blob) {
      throw new Error("Word sənədini formalaşdırmaq mümkün olmadı.");
    }

    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    const safeTopic = (currentDoc.topic || 'serbest_is').replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, '_');
    a.download = `${safeTopic}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(downloadUrl);

    showToast("Microsoft Word (.docx) faylı uğurla endirildi!", "success");
  } catch (err) {
    console.error(err);
    showToast("DOCX endirmə xətası: " + err.message, "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span>📥</span> Word (.docx) Yüklə`;
  }
}

// Copy full document plain text to clipboard
function copyAllPlainText() {
  let fullText = "";

  fullText += `${currentDoc.ministry}\n`;
  fullText += `${currentDoc.university}\n`;
  if (currentDoc.faculty) fullText += `${currentDoc.faculty}\n`;
  if (currentDoc.department) fullText += `${currentDoc.department}\n\n`;
  fullText += `SƏRBƏST İŞ\n\n`;
  fullText += `Fənn: ${currentDoc.subject}\n`;
  fullText += `Mövzu: "${currentDoc.topic}"\n\n`;
  fullText += `İxtisas: ${currentDoc.specialty}\n`;
  fullText += `Kurs/Qrup: ${currentDoc.course} kurs, ${currentDoc.group}\n`;
  fullText += `Tələbə: ${currentDoc.student}\n`;
  fullText += `Elmi rəhbər: ${currentDoc.supervisor}\n`;
  fullText += `${currentDoc.city} – ${currentDoc.year}\n\n`;
  fullText += `--------------------------------------------------\n\n`;

  fullText += `PLAN:\n`;
  currentDoc.plan.forEach(p => fullText += `${p}\n`);
  fullText += `\n--------------------------------------------------\n\n`;

  if (currentDoc.sections) {
    currentDoc.sections.forEach(sec => {
      fullText += `${sec.title}\n\n`;
      const paras = Array.isArray(sec.content) ? sec.content : [sec.content];
      paras.forEach(p => fullText += `${p}\n\n`);
    });
  }

  if (currentDoc.conclusion) {
    fullText += `NƏTİCƏ\n\n`;
    const conc = Array.isArray(currentDoc.conclusion) ? currentDoc.conclusion : [currentDoc.conclusion];
    conc.forEach(p => fullText += `${p}\n\n`);
  }

  if (currentDoc.references) {
    fullText += `İSTİFADƏ EDİLMİŞ ƏDƏBİYYAT\n\n`;
    currentDoc.references.forEach((ref, idx) => {
      const refText = /^\d+[\.\)]/.test(ref.trim()) ? ref.trim() : `${idx + 1}. ${ref.trim()}`;
      fullText += `${refText}\n`;
    });
  }

  navigator.clipboard.writeText(fullText).then(() => {
    showToast("Bütün sənəd mətni panoya kopyalandı!", "success");
  }).catch(() => {
    showToast("Kopyalamaq mümkün olmadı", "error");
  });
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
