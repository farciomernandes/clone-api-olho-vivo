import PositionVehicle from '../infra/typeorm/entities/PositionVehicle';
import ICreatePositionVehicle from '../dtos/ICreatePositionVehicle';

export default interface IPosionVehicleRepositoy {
  create(data: ICreatePositionVehicle): Promise<PositionVehicle>;
  findById(id: string): Promise<PositionVehicle | undefined>;
  getAll(): Promise<PositionVehicle[]>;
  update(id: string, data: PositionVehicle): Promise<PositionVehicle | void>;
  delete(id: string): Promise<PositionVehicle | void>;
}
