import { describe, it, expect } from "vitest";
import { validate } from 'class-validator';
import { CreateCourseDto } from "./create-course.dto";

describe('CreateCourseDto', () => {
    it('should validate a valid DTO', async () => {
        const dto = new CreateCourseDto();
        dto.uuidCourse = '123e4567-e89b-12d3-a456-426614174000';
        dto.name = 'cda-vals-p4';
        dto.isCertified = true;

        const errors = await validate(dto);
        expect(errors).toHaveLength(0);
    });

    it('should fail validation for missing required fields', async () => {
        const dto = new CreateCourseDto();
        // Ne pas définir les champs pour tester la validation des champs requis

        const errors = await validate(dto);
        
        // Vérifier le nombre total d'erreurs
        expect(errors).toHaveLength(3);
        
        // Vérifier que chaque champ requis génère une erreur
        const errorProperties = errors.map(error => error.property);
        expect(errorProperties).toContain('uuidCourse');
        expect(errorProperties).toContain('name');
        expect(errorProperties).toContain('isCertified');
    });

    it('should fail validation for short name', async () => {
        const dto = new CreateCourseDto();
        dto.uuidCourse = '123e4567-e89b-12d3-a456-426614174000';
        dto.name = 'cd';
        dto.isCertified = true;

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
    });
});