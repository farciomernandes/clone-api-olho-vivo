/* eslint-disable no-useless-constructor */
import { injectable, inject } from 'tsyringe';

import ILineRepository from '../../repositories/ILineRepository';
import Line from '../../infra/typeorm/entities/Line';

@injectable()
class GetAllVehiclesService {
  constructor(
    @inject('LinesRepository')
    private linesRepository: ILineRepository,
  ) {}

  public async execute(): Promise<Line[]> {
    const getAll = await this.linesRepository.getAll();

    return getAll;
  }
}

export default GetAllVehiclesService;
