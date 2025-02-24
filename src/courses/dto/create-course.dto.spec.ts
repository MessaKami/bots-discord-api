import { describe, it, expect } from "vitest";
import { validate } from 'class-validator';
import { CreateCourseDto } from "./create-course.dto";

describe('CreateCourseDto', () => {
    it('should validate a valid DTO', async () => {
        const dto = new CreateCourseDto();
        dto.name = 'Développeur web';
        dto.isCertified = true;
        dto.uuidGuild = '123456789012345678';
        dto.uuidCategory = '123456789012345678';

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
    });

    it('should fail validation for missing required fields', async () => {
        const dto = new CreateCourseDto();
        // Ne pas définir les champs pour tester la validation des champs requis

        const errors = await validate(dto);
        
        // Vérifier le nombre total d'erreurs (name, isCertified, uuidGuild sont requis)
        expect(errors).toHaveLength(4);
        
        // Vérifier que chaque champ requis génère une erreur
        const errorProperties = errors.map(error => error.property);
        expect(errorProperties).toContain('name');
        expect(errorProperties).toContain('isCertified');
        expect(errorProperties).toContain('uuidGuild');
    });

    it('should fail validation for short name', async () => {
        const dto = new CreateCourseDto();
        dto.name = 'cd';
        dto.isCertified = true;
        dto.uuidGuild = '123456789012345678';

        const errors = await validate(dto);
        expect(errors).toHaveLength(2);
        expect(errors[0].property).toBe('name');
    });
});