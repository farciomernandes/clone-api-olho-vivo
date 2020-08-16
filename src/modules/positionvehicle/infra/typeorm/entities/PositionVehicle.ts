import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Vehicle from '../../../../vehicles/infra/typeorm/entities/Vehicle';


@Entity('vehiclePosition')
class PositionVehicle {
  @PrimaryColumn()
  id: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @ManyToOne(() => Vehicle)
  @JoinColumn({name: 'vehicle_id'})
  vehicle: string;

  @Column()
  vehicle_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PositionVehicle;
