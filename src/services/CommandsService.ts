import { singleton, inject } from 'tsyringe';
import { Subject } from 'rxjs';
import { Message } from 'discord.js';

import { LoggerService } from './LoggerService';
import { ConfigurationService } from './ConfigurationService';
import { DiscordService } from './DiscordService';

@singleton()
export class CommandsService {
  private prefix: string;
  command$: Subject<Message>;

  constructor(
    @inject(LoggerService) private logger: LoggerService,
    @inject(ConfigurationService) config: ConfigurationService,
    @inject(DiscordService) discord: DiscordService
  ) {
    this.prefix = config.get('COMMAND_PREFIX');
    this.command$ = new Subject<Message>();

    this.logger.debug('Starting CommandService');

    discord.client.on('message', (message) => {
      if (!message.content.startsWith(this.prefix)) {
        return;
      }

      this.logger.debug(`Command message received: ${JSON.stringify(message)}`);
      this.command$.next(message);
    });
  }
}
