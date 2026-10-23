/**
 * Sərbəst İş Hazırlayan Proqram - Yerli Veb Server
 * Node.js daxili modulları ilə işləyir (Heç bir xarici paket tələb etmir).
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { exec } = require('child_process');

const { generateSerbestIsDocx } = require('./docx-builder');
const { UNIVERSITIES, PRESET_TOPICS, generateAcademicContent } = require('./knowledge-base');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME types for static files
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Helper: Parse JSON body from request
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString('utf8');
      if (body.length > 10 * 1024 * 1024) { // 10MB limit
        reject(new Error('Request body too large'));
      }
    });
    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// Helper: Query Gemini API for live bespoke content generation
function callGeminiApi(apiKey, prompt) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        responseMimeType: "application/json"
      }
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const parsedUrl = new URL(url);

    const req = https.request({
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.candidates && json.candidates[0] && json.candidates[0].content) {
            const rawText = json.candidates[0].content.parts[0].text;
            resolve(JSON.parse(rawText));
          } else {
            reject(new Error(json.error ? json.error.message : 'Naməlum AI cavabı'));
          }
        } catch (e) {
          reject(new Error('AI cavabını oxumaq mümkün olmadı: ' + e.message));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // API: Get Initial Presets (Universities, Topics)
  if (pathname === '/api/presets' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      universities: UNIVERSITIES,
      presetTopics: PRESET_TOPICS
    }));
  }

  // API: Generate Content (Offline Intelligent Engine)
  if (pathname === '/api/generate-content' && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const generated = generateAcademicContent(data);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: true, data: generated }));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // API: AI Live Generation with Gemini API Key
  if (pathname === '/api/ai-generate' && req.method === 'POST') {
    try {
      const { apiKey, topic, subject, specialty } = await parseJsonBody(req);
      if (!apiKey) {
        throw new Error('Gemini API açarı daxil edilməyib');
      }

      const prompt = `Azərbaycan ali məktəb tələbəsi üçün akademik səviyyədə tam dolğun "Sərbəst İş" (referat) mətni hazırla.
Mövzu: "${topic}"
Fənn: "${subject || 'Fənn'}"
İxtisas: "${specialty || 'İxtisas'}"

Sənəd Azərbaycan dilində, elmi, akademik və rəsmi dildə olmalıdır.
Aşağıdakı JSON formatında cavab ver:
{
  "topic": "${topic}",
  "plan": ["Giriş", "1. Başlıq 1", "2. Başlıq 2", "3. Başlıq 3", "4. Başlıq 4", "Nəticə və təkliflər", "İstifadə edilmiş ədəbiyyat siyahısı"],
  "sections": [
    {
      "title": "GİRİŞ",
      "content": ["Giriş üçün 3-4 uzun və ətraflı elmi abzas: aktuallıq, məqsəd və vəzifələr."]
    },
    {
      "title": "1. Birinci fəslin adı",
      "content": ["Dərindən izah edən 3-5 ədəd geniş abzas."]
    },
    {
      "title": "2. İkinci fəslin adı",
      "content": ["Dərindən izah edən 3-5 ədəd geniş abzas."]
    },
    {
      "title": "3. Üçüncü fəslin adı",
      "content": ["Dərindən izah edən 3-5 ədəd geniş abzas."]
    },
    {
      "title": "4. Dördüncü fəslin adı",
      "content": ["Dərindən izah edən 3-5 ədəd geniş abzas."]
    }
  ],
  "conclusion": [
    "Nəticə və ümumiləşdirmələr üçün 2-3 geniş elmi abzas.",
    "Praktiki təklif və tövsiyələr."
  ],
  "references": [
    "Azərbaycan və xarici dildə ən azı 6-8 ədəd real elmi ədəbiyyat, dərslik və rəsmi mənbə siyahısı."
  ]
}`;

      const aiResult = await callGeminiApi(apiKey, prompt);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: true, data: aiResult }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // API: Generate & Download DOCX Word Document
  if (pathname === '/api/generate-docx' && req.method === 'POST') {
    try {
      const docData = await parseJsonBody(req);
      const docxBuffer = generateSerbestIsDocx(docData, zlib);

      const safeFilename = encodeURIComponent((docData.topic || 'serbest_is').replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, '_'));

      res.writeHead(200, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${safeFilename}.docx"`,
        'Content-Length': docxBuffer.length
      });
      return res.end(docxBuffer);
    } catch (err) {
      console.error('Docx generation error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // Static File Serving
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

  // Prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Giriş qadağandır');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Fayl tapılmadı');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

// Start listening
server.listen(PORT, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${PORT}`;
  console.log(`=======================================================`);
  console.log(`  SƏRBƏST İŞ HAZIRLAYAN PROQRAM UĞURLA İŞƏ DÜŞDÜ!`);
  console.log(`  Ünvan: ${url}`);
  console.log(`  Brauzerinizdə açmaq üçün yuxarıdakı linkə klikləyin.`);
  console.log(`=======================================================`);

  // Automatically open browser on Windows if not disabled
  if (process.platform === 'win32' && !process.env.NO_BROWSER) {
    exec(`start ${url}`, (err) => {
      // Ignore errors when running headlessly
    });
  }
});
