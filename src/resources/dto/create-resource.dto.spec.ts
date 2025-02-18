import { validate } from 'class-validator';
import { CreateResourceDto } from './create-resource.dto';
import { describe, it, expect } from 'vitest';

describe('CreateResourceDto', () => {
  it('should validate a correct DTO', async () => {
    const dto = new CreateResourceDto();
    dto.title = 'Test Resource';
    dto.description = 'Test Description';
    dto.content = 'Test Content';
    dto.status = 'active';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('title validation', () => {
    it('should reject title > 50 chars', async () => {
      const dto = new CreateResourceDto();
      dto.title = 'a'.repeat(51);
      dto.description = 'Test Description';
      dto.content = 'Test Content';
      dto.status = 'active';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('maxLength');
    });

    it('should reject empty title', async () => {
      const dto = new CreateResourceDto();
      dto.title = '';
      dto.description = 'Test Description';
      dto.content = 'Test Content';
      dto.status = 'active';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should reject missing title', async () => {
      const dto = new CreateResourceDto();
      dto.description = 'Test Description';
      dto.content = 'Test Content';
      dto.status = 'active';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
  });

  describe('description validation', () => {
    it('should reject empty description', async () => {
      const dto = new CreateResourceDto();
      dto.title = 'Test Resource';
      dto.description = '';
      dto.content = 'Test Content';
      dto.status = 'active';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should reject missing description', async () => {
      const dto = new CreateResourceDto();
      dto.title = 'Test Resource';
      dto.content = 'Test Content';
      dto.status = 'active';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
  });

  describe('content validation', () => {
    it('should reject empty content', async () => {
      const dto = new CreateResourceDto();
      dto.title = 'Test Resource';
      dto.description = 'Test Description';
      dto.content = '';
      dto.status = 'active';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should reject missing content', async () => {
      const dto = new CreateResourceDto();
      dto.title = 'Test Resource';
      dto.description = 'Test Description';
      dto.status = 'active';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
  });

  describe('status validation', () => {
    it('should reject invalid status', async () => {
      const dto = new CreateResourceDto();
      dto.title = 'Test Resource';
      dto.description = 'Test Description';
      dto.content = 'Test Content';
      dto.status = 'invalid';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isEnum');
    });

    it('should reject missing status', async () => {
      const dto = new CreateResourceDto();
      dto.title = 'Test Resource';
      dto.description = 'Test Description';
      dto.content = 'Test Content';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
  });
}); 