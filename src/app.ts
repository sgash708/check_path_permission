import * as readline from 'readline';
import { Check } from './component/check';
import { readdirSync, statSync } from 'fs';

const check: Check = new Check();
let fileName: string;

// REF: https://maku77.github.io/nodejs/io/readline-from-keyboard.html
const readLineInterface: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

readLineInterface.question('権限を検索したいパスを入力してください。e.g.) ~/.ssh : ', answer => {
  const perfectPath: string = check.convertPath(answer);

  if (statSync(perfectPath).isFile()) {
    fileName = check.pickOutFileNameFromPath(perfectPath)
    console.log(fileName, check.checkPermission(perfectPath));
  } else {
    const files: string[] = readdirSync(perfectPath);
    files.forEach(fileName => {
      console.log(fileName, check.checkPermission(`${perfectPath}/${fileName}`));
    });
  }

  // 入力を終了する
  readLineInterface.close();
});