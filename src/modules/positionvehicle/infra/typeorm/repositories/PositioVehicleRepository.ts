import { getRepository, Repository } from 'typeorm';
import AppError from '@shared/errors/AppError';
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
    console.log('REPOSITORIOS');
    const checkExist = await this.vehicleRepository.findOne(id);

    if(!checkExist){
      throw new AppError('Vehicle not found!')
    }

    const newPositionVehicle = await this.ormRepository.create({
      latitude,
      longitude,
      vehicle_id: id,
    });

    const positionVehicleCreated = await this.ormRepository.save(
      newPositionVehicle,
    );
    return positionVehicleCreated;
  }

  public async delete(id: string): Promise<void> {
    const checkExist = await this.ormRepository.findOne({
      where: {vehicle_id: id}
    });

    if (!checkExist) {
      throw new AppError('PositionVehicle not found!');
    }

    await this.ormRepository.remove(checkExist);
  }

  public async findById(id: string): Promise<PositionVehicle | undefined> {
    const searchpositionVehicle = await this.ormRepository.findOne({
      where: {vehicle_id: id}
    });

    return searchpositionVehicle || undefined;
  }

  public async getAll(): Promise<PositionVehicle[]> {

    let lines;
    try{
      lines  = await this.ormRepository.find();
    }catch(err){
      console.log(err)
    }

    return lines;
  }

  public async update(
    id: string,
    data: ICreatePositionVehicle,
  ): Promise<PositionVehicle | void> {
    const checkExist = await this.ormRepository.findOne({
      where: {vehicle_id: id}
    });

    if (!checkExist) {
      throw new AppError('PositionVehicle not found!');
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
