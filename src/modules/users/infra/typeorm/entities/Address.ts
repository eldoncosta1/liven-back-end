import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import User from './User';

@Entity('addresses')
class Address {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  country: string;

  @ManyToOne(() => User, user => user.addresses)
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Address;