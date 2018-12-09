import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as _ from 'lodash';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  public whiteList() {
    return _.omit(this, 'password');
  }
}