import { injectable, inject } from 'tsyringe';

import ILineRelationRepositoy from '../../repositories/ILineRelationRepositoy';
import ILineRepository from '../../repositories/ILineRepository';

import AppError from '../../../../shared/errors/AppError';
import Vehicle from '../../../vehicles/infra/typeorm/entities/Vehicle';

@injectable()
class VehiclesForLineService {
  constructor(
    @inject('LineRelationRepositoy')
    private linesStop: ILineRelationRepositoy,
    @inject('LinesRepository')
    private linesRepository: ILineRepository,
  ) {}

  public async execute(id: string): Promise<Vehicle[]> {
    const checkExist = await this.linesRepository.findById(id);
    if (!checkExist) {
      throw new AppError('Id not found!');
    }
    const vehicles = await this.linesStop.vehiclesForLine(id);
    return vehicles;
  }
}

export default VehiclesForLineService;
