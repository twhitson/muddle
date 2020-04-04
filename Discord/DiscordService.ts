import { singleton, inject } from 'tsyringe';
import { Client } from 'discord.js';
import { ConfigurationService } from '../Configuration/ConfigurationService';

@singleton()
export class DiscordService {
  client: Client = new Client();
  private token: string;

  constructor(@inject(ConfigurationService) config: ConfigurationService) {
    this.token = config.get('DISCORD_TOKEN');
  }

  async connect(): Promise<void> {
    await this.client.login(this.token);
  }
}
