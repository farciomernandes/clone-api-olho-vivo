import { getRepository, Repository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { uuid } from 'uuidv4';
import PositionVehicle from '../entities/PositionVehicle';

import ICreatePositionVehicle from '../../../dtos/ICreatePositionVehicle';
import IPositionVehicleRepository from '../../../repositories/IPositionVehicleRepository';
import Vehicle from '../../../../vehicles/infra/typeorm/entities/Vehicle';

class PositionVehicleRepository implements IPositionVehicleRepository {
  private ormRepository: Repository<PositionVehicle>;

  private vehicleRepository: Repository<Vehicle>;

  constructor() {
    this.ormRepository = getRepository(PositionVehicle);
    this.vehicleRepository = getRepository(Vehicle);
  }

  public async create({
    latitude,
    longitude,
    id,
  }: ICreatePositionVehicle): Promise<PositionVehicle> {
    const checkExist = await this.vehicleRepository.findOne(id);

    if (!checkExist) {
      throw new AppError('Vehicle not found!');
    }

    const newPositionVehicle = await this.ormRepository.create({
      latitude,
      longitude,
      vehicle_id: id,
      id: uuid(),
      vehicle_name: checkExist.name,
    });

    const positionVehicleCreated = await this.ormRepository.save(
      newPositionVehicle,
    );

    return positionVehicleCreated;
  }

  public async delete(id: string): Promise<void> {
    const checkExist = await this.ormRepository.findOne({
      where: { id },
    });

    if (!checkExist) {
      throw new AppError('This id not found in table PositionVehicle!');
    }

    await this.ormRepository.remove(checkExist);
  }

  public async findById(id: string): Promise<PositionVehicle> {
    const searchpositionVehicle = await this.ormRepository.findOne(id);

    if (!searchpositionVehicle) {
      throw new AppError('Id not found!');
    }
    return searchpositionVehicle;
  }

  public async getAll(): Promise<PositionVehicle[]> {
    const lines = await this.ormRepository.find();

    return lines;
  }

  public async update(
    id: string,
    data: ICreatePositionVehicle,
  ): Promise<PositionVehicle | void> {
    const checkExist = await this.ormRepository.findOne(id);

    if (!checkExist) {
      throw new AppError('This id not found in table PositionVehicle!');
    }

    const newPositionVehicle = {
      ...checkExist,
      ...data,
    };

    const createdLine = await this.ormRepository.save(newPositionVehicle);

    return createdLine;
  }
}

export default PositionVehicleRepository;
