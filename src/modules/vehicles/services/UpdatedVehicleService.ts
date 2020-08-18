/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import IVehicleRepository from '../repositories/IVehiclesRepository';
import AppError from '../../../shared/errors/AppError';
import Vehicle from '../infra/typeorm/entities/Vehicle';
import ICreateVehicleDTO from '../dtos/ICreateVehicleDTO';

@injectable()
class UpdatedVehicleService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehicleRepository,
  ) {}

  public async execute(
    id: string,
    data: ICreateVehicleDTO,
  ): Promise<Vehicle | void> {
    const checkExist = await this.vehiclesRepository.findById(id);

    if (!checkExist) {
      throw new AppError('Id not found!');
    }

    const vehicle = {
      ...checkExist,
      ...data,
    };

    const updatedVehicle = await this.vehiclesRepository.update(id, vehicle);
    return updatedVehicle;
  }
}

export default UpdatedVehicleService;
