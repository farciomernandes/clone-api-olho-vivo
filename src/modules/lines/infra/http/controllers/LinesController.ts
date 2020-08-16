import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLineService from '../../../services/CreateLineService';
import DeleteLineService from '../../../services/DeleteLineService';
import UpdatedLineService from '../../../services/UpdatedLineService';

import GetAllLineService from '../../../services/GetAllLineService';
import FindByIdLineService from '../../../services/FindByIdLineService';

export default class LinesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, stop_name } = request.body;

    const createStop = container.resolve(CreateLineService);

    const stop = await createStop.execute({
      name,
      stop_name,
    });

    return response.json(stop);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteStop = container.resolve(DeleteLineService);

    const deletedVehicle = await deleteStop.execute(id);

    return response.json(deletedVehicle);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, stop_name, id } = request.body;

    const uptdadeVehicle = container.resolve(UpdatedLineService);

    const data = {
      name,
      stop_name,
    };

    const updatedStop = await uptdadeVehicle.execute(id, data);

    return response.json(updatedStop);
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.body;

    const findByStop = container.resolve(FindByIdLineService);

    const vehicle = await findByStop.execute(id);

    return response.json(vehicle);
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const getStops = container.resolve(GetAllLineService);

    const vehicles = await getStops.execute();

    return response.json(vehicles);
  }
}
