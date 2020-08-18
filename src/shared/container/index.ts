import { container } from 'tsyringe';

import IVehiclesRepositoy from '../../modules/vehicles/repositories/IVehiclesRepository';
import VehicleRepositoy from '../../modules/vehicles/infra/typeorm/repositories/VehicleRepository';

import ILineRepository from '../../modules/lines/repositories/ILineRepository';
import LineRepository from '../../modules/lines/infra/typeorm/repositories/LineRepository';

import ILineRelationRepositoy from '../../modules/lines/repositories/ILineRelationRepositoy';
import LineStopRepository from '../../modules/lines/infra/typeorm/repositories/LineStopRepository';

import IPositionVehicleRepository from '../../modules/positionvehicle/repositories/IPositionVehicleRepository';
import PositioVehicleRepository from '../../modules/positionvehicle/infra/typeorm/repositories/PositioVehicleRepository';

import IStopRepository from '../../modules/stops/repositories/IStopRepository';
import StopRepository from '../../modules/stops/infra/typeorm/repositories/StopRepository';

container.registerSingleton<IVehiclesRepositoy>(
  'VehiclesRepository',
  VehicleRepositoy,
);

container.registerSingleton<ILineRepository>('LinesRepository', LineRepository);

container.registerSingleton<IPositionVehicleRepository>(
  'PositionVehicleRepository',
  PositioVehicleRepository,
);

container.registerSingleton<IStopRepository>('StopsRepository', StopRepository);

container.registerSingleton<ILineRelationRepositoy>(
  'LineRelationRepositoy',
  LineStopRepository,
);
