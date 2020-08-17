import { Router } from 'express';

import LinesController from '../controllers/LinesController';

const linesRouter = Router();
const linesController = new LinesController();

linesRouter.post('/create', linesController.create);
linesRouter.put('/update/:id', linesController.update);
linesRouter.delete('/delete', linesController.delete);

linesRouter.get('/', linesController.getAll);
linesRouter.get('/search/:id', linesController.findById);
linesRouter.get('/search', linesController.lineByStop);



export default linesRouter;
