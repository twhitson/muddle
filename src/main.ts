import 'reflect-metadata';
import { container } from 'tsyringe';
import { CommandsService, LoggerService, DiscordService } from './services';

container.register<CommandsService>(CommandsService, { useClass: CommandsService });

const logger = container.resolve(LoggerService);
const discord = container.resolve(DiscordService);

discord.login().subscribe(
  () => {
    logger.debug('Logged into Discord');
  },
  () => {
    logger.error("Couldn't connect to Discord");
    process.exit();
  }
);
