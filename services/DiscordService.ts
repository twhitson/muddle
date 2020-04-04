import { singleton, inject } from 'tsyringe';
import { from, Observable } from 'rxjs';
import { Client } from 'discord.js';

import { ConfigurationService } from './ConfigurationService';
import { LoggerService } from './LoggerService';

@singleton()
export class DiscordService {
  client: Client = new Client();

  private token: string;

  constructor(
    @inject(ConfigurationService) config: ConfigurationService,
    @inject(LoggerService) private logger: LoggerService
  ) {
    this.token = config.get('DISCORD_TOKEN');

    if (!this.token) {
      this.logger.error('Discord token is required');
      process.exit();
    }
  }

  login(): Observable<string> {
    this.logger.debug('Logging into Discord');

    return from(this.client.login(this.token));
  }
}
