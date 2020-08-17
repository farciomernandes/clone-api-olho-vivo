import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateVehicleService from '../../../services/CreateVehicleService';
import DeleteVehicleService from '../../../services/DeleteVehicleService';
import UpdatedVehicleService from '../../../services/UpdatedVehicleService';

import GetAllVehicleService from '../../../services/GetAllVehicleService';
import FindByIdVehicleService from '../../../services/FindByIdVehicleService';



export default class VehiclesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { model, name, line_id } = request.body;

    const createVehicle = container.resolve(CreateVehicleService);

    const vehicle = await createVehicle.execute({
      model,
      name,
      line_id,
    });

    return response.json(vehicle);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteVehicle = container.resolve(DeleteVehicleService);

    const deletedVehicle = await deleteVehicle.execute(id);

    return response.json(deletedVehicle);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, model } = request.body;
    const { id } = request.params;


    const uptdadeVehicle = container.resolve(UpdatedVehicleService);

    const data = {
      name,
      model,
    };

    const updatedVehicle = await uptdadeVehicle.execute(id, data);

    return response.json(updatedVehicle);
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.body;

    const findByVehicle = container.resolve(FindByIdVehicleService);

    const vehicle = await findByVehicle.execute(id);

    return response.json(vehicle);
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const getVehicles = container.resolve(GetAllVehicleService);

    const vehicles = await getVehicles.execute();

    return response.json(vehicles);
  }
}
