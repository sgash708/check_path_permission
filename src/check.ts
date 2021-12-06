import { Stats, statSync } from 'fs';
import { homedir } from 'os';

export interface ICheck {
  checkPermission(filepath: string): string
  convertPath(input: string): string
  pickOutFileNameFromPath(input: string): string
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
    return input.replace(/^~\//g, `${homedir()}/`);
  }

  /**
   * pickOutFileName
   * ファイル名をパスから取り出す。
   * 
   * @param input 
   * @returns ファイル名もしくは、パスを返す
   */
  pickOutFileNameFromPath(path: string): string {
    // REF: https://tektektech.com/javascript-get-fileinfo-from-path/
    const res: RegExpMatchArray | null = path.match(".+/(.+?)([\?#;])?$");

    return res ? res[1] : path;
  }
}