import 'reflect-metadata';
import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Gizmo from './Gizmo';

@Entity()
export default class Gadget extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Gizmo, gizmo => gizmo.gadget, { nullable: false })
  @JoinColumn()
  gizmo: Promise<Gizmo>;
}
