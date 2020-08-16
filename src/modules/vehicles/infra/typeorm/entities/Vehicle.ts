import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';

// import Line from '@modules/lines/infra/typeorm/entities/Line';

@Entity('vehicles')
class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  line_id: string;

  // @ManyToOne(() => Line)
  // @JoinColumn({ name: 'lineId' })
  // lineId: Line;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Vehicle;
