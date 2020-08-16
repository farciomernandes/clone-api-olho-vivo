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

    const createVehicle = container.resolve(CreateStopService);

    const vehicle = await createVehicle.execute({
      name,
      latitude,
      longitude,
    });

    return response.json(vehicle);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteLine = container.resolve(DeleteLineService);

    const deletedLine = await deleteLine.execute(id);

    return response.json(deletedLine);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, latitude, longitude } = request.body;
    const { id } = request.params;

    const uptdadeLine = container.resolve(UpdatedLineService);

    const data = {
      name,
      latitude,
      longitude,
    };

    const updatedLine = await uptdadeLine.execute(id, data);

    return response.json(updatedLine);
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.body;

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
