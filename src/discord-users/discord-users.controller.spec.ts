import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DiscordUsersController } from './discord-users.controller';
import { DiscordUsersService } from './discord-users.service';
import { CreateDiscordUserDto } from './dto/create-discord-user.dto';
import { UpdateDiscordUserDto } from './dto/update-discord-user.dto';
import { NotFoundException } from '@nestjs/common';

const mockDiscordUsersService = {
  create: vi.fn(),
  findAll: vi.fn(),
  findOne: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
};

describe('DiscordUsersController', () => {
  let controller: DiscordUsersController;

  beforeEach(() => {
    controller = new DiscordUsersController(mockDiscordUsersService as unknown as DiscordUsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

 
}); 