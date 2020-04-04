import 'reflect-metadata';
import { container } from 'tsyringe';
import { DiscordService } from './Discord/DiscordService';

const discord = container.resolve(DiscordService);

discord.connect();
