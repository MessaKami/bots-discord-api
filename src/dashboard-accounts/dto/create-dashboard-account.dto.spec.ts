import { describe, it, expect } from 'vitest';
import { validate } from 'class-validator';
import { CreateDashboardAccountDto } from './create-dashboard-account.dto';

describe('CreateDashboardAccountDto', () => {
    it('should validate a valid DTO', async () => {
        const dto = new CreateDashboardAccountDto();
        dto.uuidDashboardAccount = '123e4567-e89b-12d3-a456-426614174000';
        dto.email = 'test@example.com';
        dto.password = 'password123';

        const errors = await validate(dto);
        expect(errors).toHaveLength(0);
    });

    it('should fail validation for missing required fields', async () => {
        const dto = new CreateDashboardAccountDto();
        // Ne pas définir les champs pour tester la validation des champs requis

        const errors = await validate(dto);
        
        // Vérifier le nombre total d'erreurs
        expect(errors).toHaveLength(3);
        
        // Vérifier que chaque champ requis génère une erreur
        const errorProperties = errors.map(error => error.property);
        expect(errorProperties).toContain('uuidDashboardAccount');
        expect(errorProperties).toContain('email');
        expect(errorProperties).toContain('password');
    });

    it('should fail validation for invalid email', async () => {
        const dto = new CreateDashboardAccountDto();
        dto.uuidDashboardAccount = '123e4567-e89b-12d3-a456-426614174000';
        dto.email = 'invalid-email';
        dto.password = 'password123';

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('email');
    });

    it('should fail validation for short password', async () => {
        const dto = new CreateDashboardAccountDto();
        dto.uuidDashboardAccount = '123e4567-e89b-12d3-a456-426614174000';
        dto.email = 'test@example.com';
        dto.password = 'short';

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('password');
    });
});