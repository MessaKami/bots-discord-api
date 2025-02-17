import { EntityRepository, Repository } from 'typeorm';
import { DashboardAccount } from './entities/dashboard-account.entity';

@EntityRepository(DashboardAccount)
export class DashboardAccountRepository extends Repository<DashboardAccount> {
    // Vous pouvez ajouter des méthodes personnalisées ici si nécessaire

    async findByEmail(email: string): Promise<DashboardAccount | undefined> {
        return this.findOne({ where: { email } });
    }

    // Ajoutez d'autres méthodes spécifiques à votre logique métier si nécessaire
}