/* eslint-disable @typescript-eslint/interface-name-prefix */
import Vehicle from '../infra/typeorm/entities/Vehicle';
import ICreateVehicleDTO from '../dtos/ICreateVehicleDTO';

export default interface IVehicleRepository {
  create(data: ICreateVehicleDTO): Promise<Vehicle>;
  findById(id: string): Promise<Vehicle | undefined>;
  getAll(): Promise<Vehicle[]>;
  update(id: string, data: ICreateVehicleDTO): Promise<Vehicle | void>;
  delete(id: string): Promise<Vehicle | void>;
}
