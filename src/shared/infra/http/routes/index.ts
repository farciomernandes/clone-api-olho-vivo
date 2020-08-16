import { Router } from 'express';
import vehiclesRouter from '@modules/vehicles/infra/http/routes/vehicles.routes';
import linesRouter from '@modules/lines/infra/http/routes/lines.routes';
import positionvehiclesRouter from '@modules/positionvehicle/infra/http/routes/positionvehicles.routes';
import stopsRouter from '@modules/stops/infra/http/routes/stops.routes';

const routes = Router();

routes.use('/vehicles', vehiclesRouter);
routes.use('/lines', linesRouter);
routes.use('/stops', stopsRouter);
routes.use('/vehiclepositions', positionvehiclesRouter);

export default routes;
