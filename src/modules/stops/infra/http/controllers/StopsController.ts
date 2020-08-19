import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStopService from '../../../services/CreateStopService';
import DeleteLineService from '../../../services/DeleteLineService';
import UpdatedLineService from '../../../services/UpdatedLineService';

import GetAllStopService from '../../../services/GetAllStopService';
import FindByIdLineService from '../../../services/FindByIdLineService';

export default class StopsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, latitude, longitude } = request.body;

    const createStop = container.resolve(CreateStopService);

    const stop = await createStop.execute({
      name,
      latitude,
      longitude,
    });

    return response.json(stop);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteStop = container.resolve(DeleteLineService);

    const deletedStop = await deleteStop.execute(id);

    return response.json(deletedStop);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, latitude, longitude } = request.body;
    const { id } = request.params;

    const uptdadeStop = container.resolve(UpdatedLineService);

    const data = {
      name,
      latitude,
      longitude,
    };

    const updatedStop = await uptdadeStop.execute(id, data);

    return response.json(updatedStop);
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const findByStop = container.resolve(FindByIdLineService);

    const stop = await findByStop.execute(id);

    return response.json(stop);
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const getStops = container.resolve(GetAllStopService);

    const stops = await getStops.execute();

    return response.json(stops);
  }
}
