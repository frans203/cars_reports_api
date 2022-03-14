import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logCreate() {
    console.log('created user with id:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('updated user with id:', this.id);
  }

  @AfterRemove()
  logDelete() {
    console.log('deleted user with id:', this.id);
  }
}
