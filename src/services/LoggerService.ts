import { singleton, inject } from 'tsyringe';

import { LogLevel } from '../enums/LogLevel';
import { ConfigurationService } from './ConfigurationService';

@singleton()
export class LoggerService {
  private logLevel: LogLevel;

  constructor(@inject(ConfigurationService) config: ConfigurationService) {
    this.logLevel = config.get('LOG_LEVEL') as LogLevel;
  }

  debug(message: string): void {
    if (this.logLevel !== LogLevel.Debug) {
      return;
    }

    console.debug(message);
  }

  info(message: string): void {
    if (this.logLevel !== LogLevel.Info && this.logLevel !== LogLevel.Debug) {
      return;
    }

    console.info(message);
  }

  warn(message: string): void {
    if (this.logLevel !== LogLevel.Info && this.logLevel !== LogLevel.Debug && this.logLevel !== LogLevel.Warn) {
      return;
    }

    console.warn(message);
  }

  error(message: string): void {
    if (this.logLevel === LogLevel.None) {
      return;
    }

    console.error(message);
  }
}
