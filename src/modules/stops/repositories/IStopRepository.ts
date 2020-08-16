import Stop from '../infra/typeorm/entities/Stop';
import ICreateStopDTO from '../dtos/ICreateStopDTO';

export default interface IStopRepository {
  create(data: ICreateStopDTO): Promise<Stop>;
  findById(id: string): Promise<Stop | undefined>;
  getAll(): Promise<Stop[]>;
  update(id: string, data: Stop): Promise<Stop | void>;
  delete(id: string): Promise<Stop | void>;
}
