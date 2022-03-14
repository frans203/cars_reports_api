import { User } from '../users/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @Column()
  mensuration: string;

  @Column()
  mileage: number;

  @Column({
    default: false,
  })
  approved: boolean;

  // @Column({
  //   default: true,
  // })
  // admin: boolean;
}
