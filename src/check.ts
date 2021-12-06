import { Stats, statSync } from 'fs';
import { homedir } from 'os';

export interface ICheck {
  checkPermission(filepath: string): string
  convertPath(input: string): string
}

export class Check implements ICheck {
  /**
   * checkPermission
   * パーミッションを確認する
   * 
   * @param filepath ファイルパス
   * @returns 
   */
  checkPermission(filepath: string): string {
    const stat: Stats = statSync(filepath);

    return (stat.mode & parseInt('777', 8)).toString(8);
  }

  /**
   * convertPath
   * パスを変更する
   * 
   * @param input 入力値
   * @returns 
   */
  convertPath(input: string): string {
    return input.replace(/~\//g, `${homedir()}/`);
  }
}