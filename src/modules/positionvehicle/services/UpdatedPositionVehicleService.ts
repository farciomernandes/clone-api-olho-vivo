/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import IPositionVehicleRepository from '../repositories/IPositionVehicleRepository';
import AppError from '../../../shared/errors/AppError';
import PositionVehicle from '../infra/typeorm/entities/PositionVehicle';
import ICreatePositionVehicle from '../dtos/ICreatePositionVehicle';

@injectable()
class UpdatedLineService {
  constructor(
    @inject('PositionVehicleRepository')
    private positionVehicleRepository: IPositionVehicleRepository,
  ) {}

  public async execute(
    id: string,
    data: ICreatePositionVehicle,
  ): Promise<PositionVehicle | void> {
    const checkExist = await this.positionVehicleRepository.findById(id);

    if (!checkExist) {
      throw new AppError('Id not found!');
    }

    const vehicle = {
      ...checkExist,
      ...data,
    };

    return vehicle;
  }
}

export default UpdatedLineService;
