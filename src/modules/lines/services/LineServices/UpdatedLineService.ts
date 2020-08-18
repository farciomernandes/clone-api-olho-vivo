/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import ILineRepository from '../../repositories/ILineRepository';
import AppError from '../../../../shared/errors/AppError';
import Line from '../../infra/typeorm/entities/Line';

@injectable()
class UpdatedLineService {
  constructor(
    @inject('LinesRepository')
    private linesRepository: ILineRepository,
  ) {}

  public async execute(id: string, name: string): Promise<Line | void> {
    const checkExist = await this.linesRepository.findById(id);

    if (!checkExist) {
      throw new AppError('Id not found!');
    }

    const line = {
      ...checkExist,
      name,
    };

    const updatedLine = await this.linesRepository.update(id, line);

    return updatedLine;
  }
}

export default UpdatedLineService;
