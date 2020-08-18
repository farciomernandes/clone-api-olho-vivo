import { getRepository, Repository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import LineStopRelation from '../entities/LineStopRelation';

import ILineRelationRepositoy from '../../../repositories/ILineRelationRepositoy';
import Vehicle from '../../../../vehicles/infra/typeorm/entities/Vehicle';

class LineStopRepository implements ILineRelationRepositoy {
  private ormRepository: Repository<LineStopRelation>;

  private vehicleRepository: Repository<Vehicle>;

  constructor() {
    this.ormRepository = getRepository(LineStopRelation);
    this.vehicleRepository = getRepository(Vehicle);
  }

  public async lineByStop(stop_id: string): Promise<LineStopRelation[]> {
    const searchLines = await this.ormRepository.find({
      where: { stop_id },
    });
    if (searchLines.length === 0) {
      throw new AppError('This stop do not have lines.');
    }

    return searchLines;
  }

  public async vehiclesForLine(id: string): Promise<Vehicle[]> {
    const vehicles = await this.vehicleRepository.find({
      where: { line_id: id },
    });

    if (!vehicles) {
      throw new AppError('Nobody vehicle encountered this id!');
    }

    return vehicles;
  }

  public async getRelations(): Promise<LineStopRelation[]> {
    const relations = await this.ormRepository.find();

    return relations;
  }
}

export default LineStopRepository;
