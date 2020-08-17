import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

import Line from './Line';
import Stop from '../../../../stops/infra/typeorm/entities/Stop';

@Entity('lines_stops')
class LineStopRelation {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Line)
  @JoinColumn({name: 'line_id'})
  line: string;

  @Column()
  line_id: string;

  @ManyToOne(() => Stop)
  @JoinColumn({name: 'stop_id'})
  stop: string;

  @Column()
  stop_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default LineStopRelation;
