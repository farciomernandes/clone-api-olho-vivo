/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import IStopRepository from '../repositories/IStopRepository';
import Stop from '../infra/typeorm/entities/Stop';

@injectable()
class GetAllStopService {
  constructor(
    @inject('StopsRepository')
    private stopsRepository: IStopRepository,
  ) {}

  public async execute(): Promise<Stop[]> {
    const getAll = await this.stopsRepository.getAll();

    return getAll;
  }
}

export default GetAllStopService;
