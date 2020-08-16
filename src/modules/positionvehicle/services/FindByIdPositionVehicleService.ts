/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import IPositionVehicleRepository from '../repositories/IPositionVehicleRepository';
import AppError from '../../../shared/errors/AppError';
import PositionVehicle from '../infra/typeorm/entities/PositionVehicle';

@injectable()
class FindByIdPositionVehicleService {
  constructor(
    @inject('PositionVehicleRepository')
    private positionVehicleRepository: IPositionVehicleRepository,
  ) {}

  public async execute(id: string): Promise<PositionVehicle | void> {
    const checkExist = await this.positionVehicleRepository.findById(id);

    if (!checkExist) {
      throw new AppError('Id is not found!');
    }

    return checkExist;
  }
}

export default FindByIdPositionVehicleService;
