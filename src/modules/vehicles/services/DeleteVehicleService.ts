/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import IVehicleRepository from '../repositories/IVehiclesRepository';
import AppError from '../../../shared/errors/AppError';
import Vehicle from '../infra/typeorm/entities/Vehicle';

@injectable()
class DeleteVehicleService {
  constructor(
    @inject('VehiclesRepository')
    private vehicleRepository: IVehicleRepository,
  ) {}

  public async execute(id: string): Promise<Vehicle | void> {
    const checkExist = await this.vehicleRepository.findById(id);

    if (!checkExist) {
      throw new AppError('Id not found!');
    }
    await this.vehicleRepository.delete(id);
    return checkExist;
  }
}

export default DeleteVehicleService;
