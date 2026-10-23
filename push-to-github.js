/**
 * GitHub Push Script (Zero-Dependency)
 * Git quraşdırılması tələb etmədən faylları birbaşa GitHub repozitoriyasına yükləyir.
 * GitHub REST / Git Database API istifadə edir.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const REPO_OWNER = 'aliyevvtural7-sys';
const REPO_NAME = 'Serbest-i-';
const BRANCH = 'main';

const IGNORED_PATHS = [
  'node_modules',
  '.git',
  '.system_generated',
  '.DS_Store',
  'Thumbs.db'
];

// Helper: Make GitHub API Request
function githubRequest(token, method, endpoint, body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.github.com',
      path: endpoint,
      method: method,
      headers: {
        'User-Agent': 'Serbest-Is-Uploader',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    if (postData) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = data ? JSON.parse(data) : {};
        } catch (e) {
          parsed = { raw: data };
        }

        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(parsed);
        } else {
          const err = new Error(parsed.message || `GitHub API xətası (${res.statusCode})`);
          err.statusCode = res.statusCode;
          err.details = parsed;
          reject(err);
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

// Helper: Recursively get all files
function getAllFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  for (const item of list) {
    if (IGNORED_PATHS.includes(item)) continue;
    if (item.endsWith('.log') || item.endsWith('.tmp')) continue;

    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, baseDir));
    } else {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      results.push({ fullPath, relPath });
    }
  }
  return results;
}

// Prompt user for input
function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('===============================================================');
  console.log('       GITHUB PUSH ALƏTİ - SƏRBƏST İŞ PROQRAMI');
  console.log(`       Repozitoriya: https://github.com/${REPO_OWNER}/${REPO_NAME}`);
  console.log('===============================================================\n');

  let token = process.env.GITHUB_TOKEN || process.argv[2];

  if (!token) {
    console.log('GitHub-a kod yükləmək üçün şəxsi giriş açarı (Personal Access Token) lazımdır.');
    console.log('Açarı almaq qaydası:');
    console.log('  1. https://github.com/settings/tokens səhifəsinə daxil olun');
    console.log('  2. "Generate new token (classic)" seçin');
    console.log('  3. "repo" qutusuna quş qoyun və "Generate token" klikləyin');
    console.log('  4. Alınan açarı (ghp_ ilə başlayan) bura yapışdırın:\n');

    token = await promptUser('GitHub Token daxil edin: ');
  }

  if (!token) {
    console.error('Xəta: Token daxil edilmədi!');
    process.exit(1);
  }

  try {
    console.log('\n1. GitHub istifadəçisi yoxlanılır...');
    const user = await githubRequest(token, 'GET', '/user');
    console.log(`   Giriş edildi: @${user.login} (${user.name || user.login})`);

    // Check or create repo
    console.log(`\n2. Repozitoriya yoxlanılır (${REPO_OWNER}/${REPO_NAME})...`);
    let repoExists = false;
    try {
      await githubRequest(token, 'GET', `/repos/${REPO_OWNER}/${REPO_NAME}`);
      repoExists = true;
      console.log('   Repozitoriya mövcuddur.');
    } catch (err) {
      if (err.statusCode === 404) {
        console.log('   Repozitoriya tapılmadı, yeni repozitoriya yaradılır...');
        await githubRequest(token, 'POST', '/user/repos', {
          name: REPO_NAME,
          description: 'Azərbaycan ali məktəb tələbələri üçün avtomatlaşdırılmış sərbəst iş və referat hazırlayan proqram',
          private: false,
          auto_init: false
        });
        console.log('   Repozitoriya uğurla yaradıldı!');
      } else {
        throw err;
      }
    }

    // Read all files
    const rootDir = __dirname;
    const files = getAllFiles(rootDir);
    console.log(`\n3. Yüklənəcək fayllar (${files.length} ədəd):`);
    files.forEach(f => console.log(`   • ${f.relPath}`));

    // Upload files via GitHub Contents API (Works seamlessly on empty and existing repositories)
    console.log('\n4. Fayllar GitHub-a yüklənir...');

    for (const file of files) {
      const content = fs.readFileSync(file.fullPath);
      const isText = !file.relPath.endsWith('.docx') && !file.relPath.endsWith('.png') && !file.relPath.endsWith('.ico');
      const base64Content = content.toString('base64');

      // Check if file already exists to get its SHA (needed for updating)
      let fileSha = null;
      try {
        const existing = await githubRequest(token, 'GET', `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${file.relPath}`);
        if (existing && existing.sha) {
          fileSha = existing.sha;
        }
      } catch (e) {
        // File does not exist yet
      }

      const body = {
        message: `Add ${file.relPath}`,
        content: base64Content,
        branch: BRANCH
      };
      if (fileSha) {
        body.sha = fileSha;
      }

      await githubRequest(token, 'PUT', `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${file.relPath}`, body);
      console.log(`   ✓ ${file.relPath}`);
    }

    console.log('\n===============================================================');
    console.log('   🎉 BÜTÜN KODLAR UĞURLA GITHUB-A PUSH EDİLDİ!');
    console.log(`   Link: https://github.com/${REPO_OWNER}/${REPO_NAME}`);
    console.log('===============================================================\n');

  } catch (err) {
    console.error('\n❌ Xəta baş verdi:', err.message);
    if (err.details) {
      console.error('Ətraflı:', JSON.stringify(err.details, null, 2));
    }
    process.exit(1);
  }
}

main();

