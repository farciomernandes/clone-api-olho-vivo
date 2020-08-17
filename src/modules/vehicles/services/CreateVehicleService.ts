import { injectable, inject } from 'tsyringe';

import Vehicle from '../infra/typeorm/entities/Vehicle';

import IVehicles from '../dtos/ICreateVehicleDTO';
import IVehicleRepository from '../repositories/IVehiclesRepository';

@injectable()
class CreateVehicleService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehicleRepository,
  ) {}

  public async execute({ line_id, name, model }: IVehicles): Promise<Vehicle> {

    const vehicle = await this.vehiclesRepository.create({
      line_id,
      model,
      name,
    });


    return vehicle;
  }
}

export default CreateVehicleService;
