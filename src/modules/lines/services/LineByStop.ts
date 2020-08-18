/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import ILineRepository from '../repositories/ILineRepository';
import Line from '../infra/typeorm/entities/Line';

@injectable()
class LineByStopService {
  constructor(
    @inject('LinesRepository')
    private stopsRepository: ILineRepository,
  ) {}

  public async execute(stop_id: string): Promise<Line[]> {
    const byStops = await this.stopsRepository.lineByStop(stop_id);
    return byStops;
  }
}

export default LineByStopService;
