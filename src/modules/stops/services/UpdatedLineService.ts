/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import IStopRepository from '../repositories/IStopRepository';
import AppError from '../../../shared/errors/AppError';
import Stop from '../infra/typeorm/entities/Stop';
import ICreateStopDTO from '../dtos/ICreateStopDTO';

@injectable()
class UpdatedLineService {
  constructor(
    @inject('StopsRepository')
    private vehiclesRepository: IStopRepository,
  ) {}

  public async execute(id: string, data: ICreateStopDTO): Promise<Stop | void> {
    const checkExist = await this.vehiclesRepository.findById(id);

    if (!checkExist) {
      throw new AppError('Id not found!');
    }

    const line = {
      ...checkExist,
      ...data,
    };

    const updatedLine = await this.vehiclesRepository.update(id, line);
    return updatedLine;
  }
}

export default UpdatedLineService;
