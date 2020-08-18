import LineStopRelation from '../infra/typeorm/entities/LineStopRelation';
import Vehicle from '../../vehicles/infra/typeorm/entities/Vehicle';

export default interface ILineRepositoy {
  lineByStop(id_stop: string): Promise<LineStopRelation[]>;
  vehiclesForLine(id: string): Promise<Vehicle[]>;
  getRelations(): Promise<LineStopRelation[]>;
}
