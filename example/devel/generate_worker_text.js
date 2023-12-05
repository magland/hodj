import fs from 'fs'
import { exec } from 'child_process'

const findFiles = (dir) => {
    if (dir.includes('node_modules')) {
        return [];
    }
    const ret = [];
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const path = `${dir}/${item}`;
        const stat = fs.statSync(path);
        if (stat.isDirectory()) {
            const a = findFiles(path);
            ret.push(...a);
        } else if (item.endsWith('.text.ts')) {
            ret.push(path);
        }
    }
    return ret;
}
const files = findFiles('src');

for (const file of files) {
    console.info(file);
    const sourcePath = file.replace('.text.ts', '.ts');
    const sourcePathJs = file.replace('.text.ts', '.js');
    if (fs.existsSync(sourcePathJs)) {
        fs.unlinkSync(sourcePathJs);
    }
    const cmd = `tsc ${sourcePath} --esModuleInterop false --target es2020 --module commonjs`
    exec(cmd, (error, stdout, stderr) => {
        console.info(`stdout: ${stdout}`);
        if (error) {
            console.error(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        const text = fs.readFileSync(sourcePathJs, 'utf-8');
        const lines = text.split('\n').filter((line) => (
            !line.includes('defineProperty(exports') // a hack to remove reference to exports
        ));
        const text2 = lines.join('\n');
        const textEscaped = text2.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
        const content = `export default \`${textEscaped}\`;`;
        console.info(`Writing ${file}`)
        fs.writeFileSync(file, content, 'utf-8');
    });
}