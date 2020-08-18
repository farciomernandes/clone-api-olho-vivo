import { injectable, inject } from 'tsyringe';

import ILineRepository from '../../repositories/ILineRelationRepositoy';
import LineStopRelation from '../../infra/typeorm/entities/LineStopRelation';

@injectable()
class GetAllRelationsService {
  constructor(
    @inject('LineRelationRepositoy')
    private linesStop: ILineRepository,
  ) {}

  public async execute(): Promise<LineStopRelation[]> {
    const getAll = await this.linesStop.getRelations();

    return getAll;
  }
}

export default GetAllRelationsService;
