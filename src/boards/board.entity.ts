import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board.model';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn() //pk 명시
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
  @Column()
  status: BoardStatus;
}
