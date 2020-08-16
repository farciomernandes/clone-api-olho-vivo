import Line from '../infra/typeorm/entities/Line';
import ICreateLineDTO from '../dtos/ICreateLineDTO';

export default interface ILineRepositoy {
  create(data: ICreateLineDTO): Promise<Line>;
  findById(id: string): Promise<Line | undefined>;
  getAll(): Promise<Line[]>;
  update(id: string, data: Line): Promise<Line | void>;
  delete(id: string): Promise<Line | void>;
}
