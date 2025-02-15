import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('members_informations')
export class MemberInformations {

    @PrimaryGeneratedColumn('uuid', {
      name: 'uuid_member_infos',
    })
    uuid: string;

    @Column({type: 'varchar', length: 50})
    firstname: string;

    @Column({type: 'varchar', length: 50})
    lastname: string;

    @Column({type: 'varchar', length: 50})
    email: string;

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

    //@OneToOne(() => Member)
    //@JoinColumn({ name: 'uuid_member' })
    //member: Member;

}
