import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLineService from '../../../services/LineServices/CreateLineService';
import DeleteLineService from '../../../services/LineServices/DeleteLineService';
import UpdatedLineService from '../../../services/LineServices/UpdatedLineService';

import GetAllLineService from '../../../services/LineServices/GetAllLineService';
import FindByIdLineService from '../../../services/LineServices/FindByIdLineService';
import LineByStop from '../../../services/LineStopRelationServices/LineByStop';
import VehiclesForLineService from '../../../services/LineStopRelationServices/VehiclesForLineService';
import GetAllRelationsService from '../../../services/LineStopRelationServices/GetAllRelationsService';

export default class LinesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, stop_name } = request.body;

    const createLine = container.resolve(CreateLineService);

    const stop = await createLine.execute({
      name,
      stop_name,
    });

    return response.json(stop);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteLine = container.resolve(DeleteLineService);

    const deletedLine = await deleteLine.execute(id);

    return response.json(deletedLine);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const uptdadeline = container.resolve(UpdatedLineService);

    const updatedLine = await uptdadeline.execute(id, name);

    return response.json(updatedLine);
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const findByLine = container.resolve(FindByIdLineService);

    const line = await findByLine.execute(id);

    return response.json(line);
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const getLines = container.resolve(GetAllLineService);

    const lines = await getLines.execute();

    return response.json(lines);
  }

  public async lineByStop(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { stop_id } = request.body;

    const getLines = container.resolve(LineByStop);

    const lines = await getLines.execute(stop_id);

    return response.json(lines);
  }

  public async vehiclesForLine(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.body;

    const getVehicles = container.resolve(VehiclesForLineService);

    const vehicles = await getVehicles.execute(id);

    return response.json(vehicles);
  }

  public async getAllRelations(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getRelations = container.resolve(GetAllRelationsService);

    const relations = await getRelations.execute();

    return response.json(relations);
  }
}
