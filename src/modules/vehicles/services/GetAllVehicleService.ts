/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import IVehicleRepository from '../repositories/IVehiclesRepository';
import Vehicle from '../infra/typeorm/entities/Vehicle';

@injectable()
class GetAllVehiclesService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehicleRepository,
  ) {}

  public async execute(): Promise<Vehicle[]> {
    const getAll = await this.vehiclesRepository.getAll();

    return getAll;
  }
}

export default GetAllVehiclesService;
