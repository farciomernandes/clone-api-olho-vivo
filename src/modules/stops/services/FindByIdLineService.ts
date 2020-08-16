/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import IStopRepository from '../repositories/IStopRepository';
import AppError from '../../../shared/errors/AppError';
import Stop from '../infra/typeorm/entities/Stop';

@injectable()
class FindByIdStopService {
  constructor(
    @inject('StopsRepository')
    private stopsRepository: IStopRepository,
  ) {}

  public async execute(id: string): Promise<Stop | void> {
    const checkExist = await this.stopsRepository.findById(id);

    if (!checkExist) {
      throw new AppError('Id is not found!');
    }

    return checkExist;
  }
}

export default FindByIdStopService;
