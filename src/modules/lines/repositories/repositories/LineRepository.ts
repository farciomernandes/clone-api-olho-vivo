import { getRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import Line from '../entities/Line';
import LineStopRelation from '../entities/LineStopRelation';
import Stop from '../../../../stops/infra/typeorm/entities/Stop';

import ICreateLineDTO from '../../../dtos/ICreateLineDTO';
import ILineRepository from '../../../repositories/ILineRepository';
import Vehicle from '../../../../vehicles/infra/typeorm/entities/Vehicle';

class LineRepository implements ILineRepository {
  private ormRepository: Repository<Line>;

  private lineStopRepository: Repository<LineStopRelation>;

  private stopRepository: Repository<Stop>;

  private vehicleRepository: Repository<Vehicle>;

  constructor() {
    this.ormRepository = getRepository(Line);
    this.stopRepository = getRepository(Stop);
    this.lineStopRepository = getRepository(LineStopRelation);
    this.vehicleRepository = getRepository(Vehicle);
  }

  public async create({ name, stop_name }: ICreateLineDTO): Promise<Line> {
    const stop = await this.stopRepository.findOne({
      where: { name: stop_name },
    });

    if (!stop) {
      throw new AppError('Stop not found!');
    }

    const lineId = uuid();
    const newLine = await this.ormRepository.create({
      name,
      id: lineId,
      stop_name: stop.name,
    });

    const lineCreated = await this.ormRepository.save(newLine);

    const checkExistRelation = await this.ormRepository.findOne({
      where: { name: newLine.name },
    });

    if (!checkExistRelation) {
      const createRelation = this.lineStopRepository.create({
        id: uuid(),
        line_id: lineId,
        stop_id: stop.id,
      });

      await this.lineStopRepository.save(createRelation);
    }

    return lineCreated;
  }

  public async delete(id: string): Promise<void> {
    const checkExist = await this.ormRepository.findOne(id);

    if (!checkExist) {
      throw new AppError('Line not found!');
    }

    await this.ormRepository.remove(checkExist);
  }

  public async findById(id: string): Promise<Line> {
    const searchLine = await this.ormRepository.findOne(id);

    if (!searchLine) {
      throw new AppError('id not found.');
    }

    return searchLine;
  }

  public async getAll(): Promise<Line[]> {
    const lines = await this.ormRepository.find();

    return lines;
  }

  public async update(id: string, data: Line): Promise<Line | void> {
    const checkExist = await this.ormRepository.findOne(id);

    if (!checkExist) {
      throw new AppError('Line not found!');
    }

    const newLine = {
      ...checkExist,
      ...data,
    };

    const createdLine = await this.ormRepository.save(newLine);

    return createdLine;
  }

  public async lineByStop(stop_id: string): Promise<LineStopRelation[]> {
    const searchLines = await this.lineStopRepository.find({
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
    const relations = await this.lineStopRepository.find();

    return relations;
  }
}

export default LineRepository;
