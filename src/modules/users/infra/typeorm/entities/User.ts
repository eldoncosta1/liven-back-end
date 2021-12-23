import { Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ObjectID, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import Address from './Address';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Address, addresses => addresses.user, {
    cascade: true,
    eager: true
  })
  addresses: Address[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default User;