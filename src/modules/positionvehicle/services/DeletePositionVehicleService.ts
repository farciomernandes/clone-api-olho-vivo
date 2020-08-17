/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import IPositionVehicleRepository from '../repositories/IPositionVehicleRepository';
import AppError from '../../../shared/errors/AppError';
import PositionVehicle from '../infra/typeorm/entities/PositionVehicle';

@injectable()
class DeletePositionVehicleService {
  constructor(
    @inject('PositionVehicleRepository')
    private positionVehicleRepository: IPositionVehicleRepository,
  ) {}

  public async execute(id: string): Promise<PositionVehicle | void> {
    const checkExist = await this.positionVehicleRepository.findById(id);
    if (!checkExist) {
      throw new AppError('Id not found!');
    }
    await this.positionVehicleRepository.delete(id);
    return checkExist;
  }
}

export default DeletePositionVehicleService;
