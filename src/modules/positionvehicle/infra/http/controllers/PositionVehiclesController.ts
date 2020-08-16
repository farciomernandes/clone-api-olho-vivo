import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePositionVehicleService from '../../../services/CreatePositionVehicleService';
import DeletePositionVehicleService from '../../../services/DeletePositionVehicleService';
import UpdatedPositionVehicleService from '../../../services/UpdatedPositionVehicleService';

import GetAllPositionVehicleService from '../../../services/GetAllPositionVehicleService';
import FindByIdPositionVehicleService from '../../../services/FindByIdPositionVehicleService';

export default class PositionVehiclesController {
  public async create(request: Request, response: Response): Promise<Response> {
    console.log('controller');

    const { latitude, longitude, id } = request.body;

    const createPositionVehicle = container.resolve(
      CreatePositionVehicleService,
    );

    const positionVehicle = await createPositionVehicle.execute({
      latitude,
      longitude,
      id,
    });

    return response.json(positionVehicle);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deletePositionVehicle = container.resolve(
      DeletePositionVehicleService,
    );

    const deletedPositionVehicle = await deletePositionVehicle.execute(id);

    return response.json(deletedPositionVehicle);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { latitude, longitude } = request.body;
    const { id } = request.params;

    const uptdadeVehicle = container.resolve(UpdatedPositionVehicleService);

    const data = {
      id,
      latitude,
      longitude,
    };

    const updatedPositionVehicle = await uptdadeVehicle.execute(id, data);

    return response.json(updatedPositionVehicle);
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    console.log('ALOU')
    const { id } = request.params;

    const findByPositionVehicle = container.resolve(
      FindByIdPositionVehicleService,
    );

    const positionVehicle = await findByPositionVehicle.execute(id);

    return response.json(positionVehicle);
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const getPositionVehicle = container.resolve(GetAllPositionVehicleService);

    const positionsVehicles = await getPositionVehicle.execute();

    return response.json(positionsVehicles);
  }
}
