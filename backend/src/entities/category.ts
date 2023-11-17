import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Ad } from "./ad";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}
