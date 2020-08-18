import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('lines')
class Line {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  stop_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Line;
