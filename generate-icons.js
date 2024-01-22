const fs = require('fs');
const path = require('path');

const iconsDirectory = path.join(__dirname, 'src/assets/icons');
const outputFilePath = path.join(__dirname, 'src/components/icons.ts');

// 아이콘 파일들을 읽는 함수
function readIcons(dir) {
  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.png'))
    .map(file => path.basename(file, '.png'));
}

// icons.ts 파일을 생성하는 함수
function generateIconsFile(icons) {
  const imports = icons
    .map(name => `import ${name} from '../assets/icons/${name}.png';`)
    .join('\n');
  const exportStatement = `export default { ${icons.join(', ')} };`;

  return `${imports}\n\n${exportStatement}`;
}

const icons = readIcons(iconsDirectory);
const content = generateIconsFile(icons);

fs.writeFileSync(outputFilePath, content);
console.log(`Generated icons.ts with ${icons.length} icons.`);
