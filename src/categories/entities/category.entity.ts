import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

import { Guild } from 'src/guilds/entities/guild.entity';

@Entity('categories')
export class Category {

    @PrimaryColumn('varchar', { name: 'uuid_category' })
    uuidSF: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'int', name: 'category_position'})
    position: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
      })
      createdAt: Date;
  
      @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true,
      })
      updatedAt: Date;

    @OneToOne(() => Guild)
    @JoinColumn({ name: 'uuid_guild' })
    guild: Guild;

}
