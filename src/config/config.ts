import { join } from 'path';
import { readFileSync } from 'fs';
import log from 'electron-log/main';

interface WindowConfig {
  width: number;
  height: number;
}

export interface Config {
  window: WindowConfig;
}

