import { getRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';

import Vehicle from '../entities/Vehicle';
import Line from '../../../../lines/infra/typeorm/entities/Line';

import ICreateVehicleDTO from '../../../dtos/ICreateVehicleDTO';
import IVehiclesRepositoy from '../../../repositories/IVehiclesRepository';

class VehicleRepositoy implements IVehiclesRepositoy {
  private ormRepository: Repository<Vehicle>;

  private lineeRepository: Repository<Line>;

  constructor() {
    this.ormRepository = getRepository(Vehicle);
    this.lineeRepository = getRepository(Line);
  }

  public async create({
    name,
    model,
    line_id,
  }: ICreateVehicleDTO): Promise<Vehicle> {
    const checkExist = await this.lineeRepository.findOne(line_id);

    if (!checkExist) {
      throw new AppError('Line_id not found!');
    }

    const vehicle = await this.ormRepository.create({
      name,
      model,
      id: uuid(),
      line_id,
      line_name: checkExist.name,
    });
    await this.ormRepository.save(vehicle);

    return vehicle;
  }

  public async delete(id: string): Promise<void> {
    const vehicle = await this.ormRepository.findOne(id);

    if (!vehicle) {
      throw new AppError('This Vehicle is not exist !');
    }

    await this.ormRepository.remove(vehicle);
  }

  public async findById(id: string): Promise<Vehicle | undefined> {
    const vehicle = await this.ormRepository.findOne({
      where: { id },
    });

    return vehicle || undefined;
  }

  public async getAll(): Promise<Vehicle[]> {
    const vehicles = await this.ormRepository.find();

    return vehicles;
  }

  public async update(
    id: string,
    data: ICreateVehicleDTO,
  ): Promise<Vehicle | void> {
    const searchVehicle = await this.ormRepository.findOne({
      where: { id },
    });

    if (!searchVehicle) {
      throw new AppError('Id not found! ');
    }

    const vehicle = {
      ...searchVehicle,
      ...data,
    };

    delete vehicle.line_id;
    delete vehicle.line_name;

    const createVehicle = await this.ormRepository.save(vehicle);

    return createVehicle;
  }
}

export default VehicleRepositoy;
