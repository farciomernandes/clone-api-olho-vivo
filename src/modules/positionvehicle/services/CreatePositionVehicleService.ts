/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import PositionVehicle from '../infra/typeorm/entities/PositionVehicle';

import ICreatePositionVehicle from '../dtos/ICreatePositionVehicle';
import IPositionVehicleRepository from '../repositories/IPositionVehicleRepository';

@injectable()
class CreatePositionVehicleService {
  constructor(
    @inject('PositionVehicleRepository')
    private positionVehicleRepository: IPositionVehicleRepository,
  ) {}

  public async execute({
    latitude,
    longitude,
    id,
  }: ICreatePositionVehicle): Promise<PositionVehicle> {


    const positionVehicle = await this.positionVehicleRepository.create({
      latitude,
      longitude,
      id,
    });

    return positionVehicle;
  }
}

export default CreatePositionVehicleService;
