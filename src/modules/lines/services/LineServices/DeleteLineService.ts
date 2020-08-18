/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import ILineRepository from '../../repositories/ILineRepository';
import AppError from '../../../../shared/errors/AppError';
import Line from '../../infra/typeorm/entities/Line';

@injectable()
class DeleteLineService {
  constructor(
    @inject('LinesRepository')
    private linesRepository: ILineRepository,
  ) {}

  public async execute(id: string): Promise<Line | void> {
    const checkExist = await this.linesRepository.findById(id);

    if (!checkExist) {
      throw new AppError('Id not found!');
    }
    await this.linesRepository.delete(id);
    return checkExist;
  }
}

export default DeleteLineService;
