/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import Stop from '../infra/typeorm/entities/Stop';

import IStop from '../dtos/ICreateStopDTO';
import IStopRepository from '../repositories/IStopRepository';

@injectable()
class CreateStopService {
  constructor(
    @inject('StopsRepository')
    private stopsRepository: IStopRepository,
  ) {}

  public async execute({ name, latitude, longitude }: IStop): Promise<Stop> {
    const stop = await this.stopsRepository.create({
      name,
      latitude,
      longitude,
    });

    return stop;
  }
}

export default CreateStopService;
