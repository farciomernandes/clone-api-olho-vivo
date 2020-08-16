import { Router } from 'express';

import PositionVehiclesController from '../controllers/PositionVehiclesController';

const positionVehicleRouter = Router();
const positionVehicleRoutersController = new PositionVehiclesController();

positionVehicleRouter.post('/create', positionVehicleRoutersController.create);
positionVehicleRouter.put(
  '/update/:id',
  positionVehicleRoutersController.update,
);
positionVehicleRouter.delete(
  '/delete',
  positionVehicleRoutersController.delete,
);
positionVehicleRouter.get('/', positionVehicleRoutersController.getAll);
positionVehicleRouter.get('/search', positionVehicleRoutersController.findById);

export default positionVehicleRouter;
