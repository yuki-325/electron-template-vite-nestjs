import { join } from 'path';
import { readFileSync } from 'fs';

interface WindowConfig {
  width: number;
  height: number;
}

interface Config {
  window: WindowConfig;
}

/**
 * 設定ファイルを読み込む関数
 * @returns {Config} - 設定オブジェクト
 */
function loadConfig(configFilePath: string): Config {
  const configFile = readFileSync(configFilePath, 'utf-8');
  return JSON.parse(configFile);
}

export { loadConfig, Config };
