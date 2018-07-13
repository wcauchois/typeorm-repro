import 'reflect-metadata';
import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import Gadget from './Gadget';

@Entity()
export default class Gizmo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Gadget, gadget => gadget.gizmo, { nullable: true })
  gadget: Promise<Gadget>;
} 
