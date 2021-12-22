import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

import User from './User';

@Entity('address')
class Address {

  @ObjectIdColumn()
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
  user: User;

}

export default Address;