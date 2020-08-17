import { getRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import Line from '../entities/Line';
import LineStopRelation from '../entities/LineStopRelation';
import Stop from '../../../../stops/infra/typeorm/entities/Stop';

import ICreateLineDTO from '../../../dtos/ICreateLineDTO';
import ILineRepository from '../../../repositories/ILineRepository';

class LineRepository implements ILineRepository {
  private ormRepository: Repository<Line>;
  private lineStopRepository: Repository<LineStopRelation>;
  private stopRepository: Repository<Stop>;




  constructor() {
    this.ormRepository = getRepository(Line);
    this.stopRepository = getRepository(Stop);
    this.lineStopRepository = getRepository(LineStopRelation);
  }

  public async create({ name, stop_name }: ICreateLineDTO): Promise<Line> {
    const stop = await this.stopRepository.findOne({
      where: {name: stop_name}
    })

    if(!stop){
      throw new AppError('Stop not found!')
    }

    const lineId = uuid();
    const newLine = await this.ormRepository.create({
      name,
      stops_id:stop.id,
      id: lineId,
    });


     const lineCreated = await this.ormRepository.save(newLine);
     console.log('BUG')

    const createRelation = await this.lineStopRepository.create({
      id: uuid(),
      line_id: lineId,
      stop_id: stop.id,
    });

      await this.lineStopRepository.save(createRelation);

    return lineCreated;
  }

  public async delete(id: string): Promise<void> {
    const checkExist = await this.ormRepository.findOne(id);

    if (!checkExist) {
      throw new AppError('Line not found!');
    }

    await this.ormRepository.remove(checkExist);
  }

  public async findById(id: string): Promise<Line | undefined> {
    const searchLine = await this.ormRepository.findOne(id);

    return searchLine || undefined;
  }

  public async getAll(): Promise<Line[]> {
    const lines = await this.ormRepository.find();

    return lines;
  }

  public async update(id: string, data: ICreateLineDTO): Promise<Line | void> {
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
}

export default LineRepository;
