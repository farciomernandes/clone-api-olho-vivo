import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';


@Entity('vehiclePosition')
class PositionVehicle {
  @PrimaryColumn()
  id: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PositionVehicle;
