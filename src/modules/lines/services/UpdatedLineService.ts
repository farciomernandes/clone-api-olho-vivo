/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import ILineRepository from '../repositories/ILineRepository';
import AppError from '../../../shared/errors/AppError';
import Line from '../infra/typeorm/entities/Line';
import ICreateLineDTO from '../dtos/ICreateLineDTO';

@injectable()
class UpdatedLineService {
  constructor(
    @inject('LinesRepository')
    private vehiclesRepository: ILineRepository,
  ) {}

  public async execute(id: string, data: ICreateLineDTO): Promise<Line | void> {
    const checkExist = await this.vehiclesRepository.findById(id);

    if (!checkExist) {
      throw new AppError('Id not found!');
    }

    const line = {
      ...checkExist,
      ...data,
    };

    const updatedLine = await this.vehiclesRepository.update(id, line)

    return updatedLine;
  }
}

export default UpdatedLineService;
