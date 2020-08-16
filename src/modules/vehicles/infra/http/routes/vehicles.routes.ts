import { Router } from 'express';

import VehiclesController from '../controllers/VehiclesController';

const vehiclesRouter = Router();
const vehiclesController = new VehiclesController();

vehiclesRouter.post('/create', vehiclesController.create);
vehiclesRouter.put('/update/:id', vehiclesController.update);
vehiclesRouter.delete('/delete', vehiclesController.delete);
vehiclesRouter.get('/', vehiclesController.getAll);
vehiclesRouter.get('/search', vehiclesController.findById);

export default vehiclesRouter;
