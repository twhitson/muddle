import { config } from 'dotenv';
import { singleton } from 'tsyringe';

@singleton()
export class ConfigurationService {
  constructor() {
    config();
  }

  get(key: string): string {
    const val = process.env[key];

    return val ? val : '';
  }
}
