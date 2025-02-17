import { describe, it, expect } from 'vitest';
import { validate } from 'class-validator';
import { CreateDashboardAccountDto } from './create-dashboard-account.dto';

describe('CreateDashboardAccountDto', () => {
    it('should validate a valid DTO', async () => {
        const dto = new CreateDashboardAccountDto();
        dto.uuidDashboardAccount = '123e4567-e89b-12d3-a456-426614174000';
        dto.email = 'test@exemple.com';
        dto.password = 'password123';
        dto.createdAt = new Date();
        dto.updatedAt = new Date();

        const errors = await validate(dto);
        expect(errors).toHaveLength(0);
    });

    it('should fail validation for missing required fields', async () => {
        const dto = new CreateDashboardAccountDto();
        // Missing uuidDashboardAccount, email, and password

        const errors = await validate(dto);
        expect(errors).toHaveLength(3); // Expecting errors for uuidDashboardAccount, email, and password
    });

    it('should fail validation for invalid email', async () => {
        const dto = new CreateDashboardAccountDto();
        dto.uuidDashboardAccount = '123e4567-e89b-12d3-a456-426614174000';
        dto.email = 'invalid-email';
        dto.password = 'password123';

        const errors = await validate(dto);
        expect(errors).toHaveLength(1); // Expecting error for invalid email
    });

    it('should validate optional fields', async () => {
        const dto = new CreateDashboardAccountDto();
        dto.uuidDashboardAccount = '123e4567-e89b-12d3-a456-426614174000';
        dto.email = 'test@example.com';
        dto.password = 'password123';
        // createdAt and updatedAt are optional, so we don't set them

        const errors = await validate(dto);
        expect(errors).toHaveLength(0); // No errors expected
    });
});