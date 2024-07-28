import { join } from 'node:path';
import { app } from 'electron';
import { existsSync, mkdirSync, copyFileSync, readFileSync } from 'fs';
import { Config } from 'src/config/config';


export function loadConfig<T>(configFilePath: string): T {
    const configContent = readFileSync(configFilePath, 'utf-8');
    return JSON.parse(configContent) as T;
  }
export function ensureConfigFile(fileName: string): string {
    const userDataPath = app.getPath('userData');
    const configDir = join(userDataPath, 'config');
    const configFilePath = join(configDir, fileName);

    if (!existsSync(configDir)) {
        mkdirSync(configDir);
    }

    if (!existsSync(configFilePath)) {
        const resourceConfigPath = join(__dirname, '../config', fileName);
        if (existsSync(resourceConfigPath)) {
            copyFileSync(resourceConfigPath, configFilePath);
        } else {
            console.error(`Resource config file not found at ${resourceConfigPath}`);
        }
    }

    return configFilePath;
}