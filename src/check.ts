import { Stats, statSync } from 'fs';

export interface ICheck {
  checkPermission(filepath: string): string
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
}