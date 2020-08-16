import { getRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import Stop from '../entities/Stop';

import ICreateStopDTO from '../../../dtos/ICreateStopDTO';
import IStopRepositoy from '../../../repositories/IStopRepository';

class StopRepositoy implements IStopRepositoy {
  private ormRepository: Repository<Stop>;

  constructor() {
    this.ormRepository = getRepository(Stop);
  }

  public async create({
    name,
    latitude,
    longitude,
  }: ICreateStopDTO): Promise<Stop> {
    const stop = await this.ormRepository.create({
      name,
      latitude,
      longitude,
      id: uuid(),
    });

    let created;
    try{
      created = await this.ormRepository.save(stop);
      console.log(stop)
      console.log(created)

    }catch(err){
      console.log(err)
    }

    return created;
  }

  public async delete(id: string): Promise<void> {
    const stop = await this.ormRepository.findOne(id);

    if (!stop) {
      throw new AppError('This Vehicle is not exist !');
    }

    await this.ormRepository.remove(stop);
  }

  public async findById(id: string): Promise<Stop | undefined> {
    const stop = await this.ormRepository.findOne({
      where: { id },
    });

    return stop || undefined;
  }

  public async getAll(): Promise<Stop[]> {
    const stop = await this.ormRepository.find();

    return stop;
  }

  public async update(id: string, data: ICreateStopDTO): Promise<Stop | void> {
    const searchStop = await this.ormRepository.findOne({
      where: { id },
    });

    if (!searchStop) {
      throw new AppError('Id not found! ');
    }

    const stop = {
      ...searchStop,
      ...data,
    };
    const createStop = await this.ormRepository.save(stop);

    return createStop;
  }
}

export default StopRepositoy;
