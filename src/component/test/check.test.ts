import { homedir } from 'os';
import { Check } from '../check';

const check: Check = new Check();
const home: string = homedir();

describe('checkPermission', () => {
  it('success_exist_directory', () => {
    expect(check.checkPermission(`${home}/.ssh/`)).toBe('700');
  });
  it('exception_not_exist_dir', () => {
    expect(() => check.checkPermission(`./.ssh_test`)).toThrow("ENOENT: no such file or directory, stat './.ssh_test'");
  });
  it('success_exist_file', () => {
    expect(check.checkPermission(`${home}/.bash_history`)).toBe('600');
  });
  it('exception_not_exist_file', () => {
    // REF: https://teratail.com/questions/259723
    expect(() => check.checkPermission('./test.txt')).toThrow("ENOENT: no such file or directory, stat './test.txt'");
  });
});

describe('convertPath', () => {
  it('success_including_tilde', () => {
    expect(check.convertPath('~/.ssh/authorized_keys')).toBe(`${home}/.ssh/authorized_keys`);
  });
  it('success_including_prefix_tilde', () => {
    expect(check.convertPath('~~test.txt')).toBe('~~test.txt');
  });
  it('success_including_prefix_double_tilde', () => {
    expect(check.convertPath('~~/nice.txt')).toBe('~~/nice.txt');
  });
  it('success_including_between_tilde', () => {
    expect(check.convertPath('~test~/nice.txt')).toBe('~test~/nice.txt');
  });
  it('success_not_including_tilde', () => {
    expect(check.convertPath(`${home}/.ssh/authorized_keys`)).toBe(`${home}/.ssh/authorized_keys`);
  });
});

describe('pickOutFileNameFromPath', () => {
  it('success_including_file_without_extension', () => {
    expect(check.pickOutFileNameFromPath(`${home}/.ssh/authorized_keys`)).toBe('authorized_keys');
  });
  it('success_including_file_with_extention', () => {
    expect(check.pickOutFileNameFromPath(`${home}/.ssh/iam.pem`)).toBe('iam.pem');
  });
});