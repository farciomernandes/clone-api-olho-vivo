import { injectable, inject } from 'tsyringe';

import IPositionVehicleRepository from '../repositories/IPositionVehicleRepository';
import PositionVehicle from '../infra/typeorm/entities/PositionVehicle';

@injectable()
class GetAllPositionVehicleService {
  constructor(
    @inject('PositionVehicleRepository')
    private positionVehicleRepository: IPositionVehicleRepository,
  ) {}

  public async execute(): Promise<PositionVehicle[]> {
    const getAll = await this.positionVehicleRepository.getAll();

    return getAll;
  }
}

export default GetAllPositionVehicleService;
