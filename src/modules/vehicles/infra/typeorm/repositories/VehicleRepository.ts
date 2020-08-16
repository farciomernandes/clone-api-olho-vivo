import { getRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import Vehicle from '../entities/Vehicle';

import ICreateVehicleDTO from '../../../dtos/ICreateVehicleDTO';
import IVehiclesRepositoy from '../../../repositories/IVehiclesRepository';

class VehicleRepositoy implements IVehiclesRepositoy {
  private ormRepository: Repository<Vehicle>;

  constructor() {
    this.ormRepository = getRepository(Vehicle);
  }

  public async create({ name, model }: ICreateVehicleDTO): Promise<Vehicle> {
    const vehicle = await this.ormRepository.create({
      name,
      model,
      id: uuid(),
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
    console.log('ENTORU')
    const searchVehicle = await this.ormRepository.findOne({
      where: { id },
    });
    console.log('ALO')

    if (!searchVehicle) {
      throw new AppError('Id not found! ');
    }

    const vehicle = {
      ...searchVehicle,
      ...data,
    };

    console.log(vehicle)
    const createVehicle = await this.ormRepository.save(vehicle);

    return createVehicle;
  }
}

export default VehicleRepositoy;
