import { join } from 'node:path';
import { app } from 'electron';
import { existsSync, mkdirSync, copyFileSync, readFileSync } from 'fs';
import log, { LogMessage } from 'electron-log';
import { loadConfig } from 'src/util/configuration-reader';

export interface LogConfig {
  log: {
    level: log.LevelOption;
    filePath: string;
  };
}

export function initializeLogger(configFilePath: string) {
  const config: LogConfig = loadConfig(configFilePath);

  log.transports.file.level = config.log.level || 'info';
  log.transports.file.resolvePathFn = () =>
    join(app.getPath('userData'), config.log.filePath || 'logs/main.log');
  log.initialize();
  log.info('Logger initialized with config:', config.log);
}