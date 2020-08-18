import { injectable, inject } from 'tsyringe';

import ILineRelationRepositoy from '../../repositories/ILineRelationRepositoy';
import Line from '../../infra/typeorm/entities/LineStopRelation';

@injectable()
class LineByStopService {
  constructor(
    @inject('LineRelationRepositoy')
    private linesStop: ILineRelationRepositoy,
  ) {}

  public async execute(stop_id: string): Promise<Line[]> {
    const byStops = await this.linesStop.lineByStop(stop_id);
    return byStops;
  }
}

export default LineByStopService;
