import { homedir } from 'os';
import { Check } from './check';
import { readdirSync, statSync } from 'fs';

const check: Check = new Check();
const path: string = `${homedir()}/.ssh/`;

if (statSync(path).isFile()) {
    console.log(path, check.checkPermission(path));
} else {
    const files: string[] = readdirSync(path);

    files.forEach(fileName => {
        console.log(fileName, check.checkPermission(path + fileName));
    });
}