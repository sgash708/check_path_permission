import { homedir } from 'os';
import { Check } from './check';

describe('checkPermission', () => {
  const check: Check = new Check();

  it('success_dirctory', () => {
    expect(check.checkPermission(`${homedir}/.ssh/`)).toBe('700');
  });
  it('success_file', () => {
    expect(check.checkPermission(`${homedir}/.bash_history`)).toBe('600');
  });
  it('exception_not_exist_file', () => {
    // REF: https://teratail.com/questions/259723
    expect(() => check.checkPermission('./test.txt')).toThrow("ENOENT: no such file or directory, stat './test.txt'");
  });
});
