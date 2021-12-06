import * as readline from 'readline';
import { homedir } from 'os';
import { Check } from './check';
import { readdirSync, statSync } from 'fs';

const check: Check = new Check();
const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('権限を検索したいパスを入力してください。e.g.) ~/.ssh : ', answer => {
  const perfectPath: string = answer.replace(/~\//g, `${homedir()}/`);

  if (statSync(perfectPath).isFile()) {
    console.log(perfectPath, check.checkPermission(perfectPath));
  } else {
    const files: string[] = readdirSync(perfectPath);
    files.forEach(fileName => {
      console.log(fileName, check.checkPermission(perfectPath + fileName));
    });
  }
});