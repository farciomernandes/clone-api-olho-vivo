import { Router } from 'express';

import StopsController from '../controllers/StopsController';

const stopsRouter = Router();
const stopsController = new StopsController();

stopsRouter.post('/create', stopsController.create);
stopsRouter.put('/update/:id', stopsController.update);
stopsRouter.delete('/delete', stopsController.delete);
stopsRouter.get('/', stopsController.getAll);
stopsRouter.get('/search', stopsController.findById);

export default stopsRouter;
