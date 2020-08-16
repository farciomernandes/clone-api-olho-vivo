/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import IStopRepository from '../repositories/IStopRepository';
import AppError from '../../../shared/errors/AppError';
import Stop from '../infra/typeorm/entities/Stop';

@injectable()
class DeleteStopService {
  constructor(
    @inject('StopsRepository')
    private stopsRepository: IStopRepository,
  ) {}

  public async execute(id: string): Promise<Stop | void> {
    const checkExist = await this.stopsRepository.findById(id);

    if (!checkExist) {
      throw new AppError('Id not found!');
    }
    await this.stopsRepository.delete(id);
    return checkExist;
  }
}

export default DeleteStopService;
