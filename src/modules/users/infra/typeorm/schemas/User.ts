import { Column, Entity, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable, JoinColumn } from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import Address from './Address';

@Entity('users')
class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Address, address => address.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  addresses: Address[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default User;