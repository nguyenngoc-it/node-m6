import { Warehouse } from "../../entities/Warehouse";
import { db } from "../App/db";
import { WarehouseService } from "./WarehouseService";
import { Repository } from "typeorm";
import { WarehouseServiceInterface } from "./contract";

export const warehouseRepository: Repository<Warehouse> =
  db.getRepository<Warehouse>("Warehouse");

export const warehouseService: WarehouseServiceInterface = new WarehouseService(
  warehouseRepository
);
