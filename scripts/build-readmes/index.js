import fs from 'fs/promises';
import generateMarkdown from './generate-markdown.js';

const FILE_NAME = 'README.md';
const MANIFEST_FILE = './custom-elements.json';

async function buildReadmes() {
  console.log('Building README.md files...');

  const manifest = JSON.parse(await fs.readFile(MANIFEST_FILE, 'utf-8'));

  if (!manifest) {
    console.log('No manifest found. Skipping README.md generation.');
    return;
  }

  console.log('Found manifest. Generating README.md files...');

  const tasks = new Map();

  manifest.modules.forEach(m => {
    const path = `${m.path.split('/').slice(0, -1).join('/')}/${FILE_NAME}`;
    const md = generateMarkdown(m);

    if (tasks.has(path)) {
      const isProvider = m.declarations[0].intlprovider;

      if (isProvider) {
        // Always put the provider at the top of the list
        tasks.get(path).unshift(md);
      } else {
        tasks.get(path).push(md);
      }
    } else {
      tasks.set(path, [md]);
    }
  });

  tasks.forEach(async (md, path) => {
    await fs.writeFile(path, md.join('\n\n***\n\n') + '\n');
  });

  console.log(`${tasks.size} README.md file(s) generated.`);
}

buildReadmes();