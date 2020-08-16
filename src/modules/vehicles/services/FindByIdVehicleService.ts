/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import IVehicleRepository from '../repositories/IVehiclesRepository';
import AppError from '../../../shared/errors/AppError';
import Vehicle from '../infra/typeorm/entities/Vehicle';

@injectable()
class FindByIdVehicleService {
  constructor(
    @inject('VehiclesRepository')
    private vehicleRepositoy: IVehicleRepository,
  ) {}

  public async execute(id: string): Promise<Vehicle | void> {
    const checkExist = await this.vehicleRepositoy.findById(id);

    if (!checkExist) {
      throw new AppError('Id is not found!');
    }

    return checkExist;
  }
}

export default FindByIdVehicleService;
