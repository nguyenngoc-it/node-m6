import { Repository } from "typeorm";
import { Warehouse } from "../../entities/Warehouse";
import {
  WarehousePaginateInput,
  WarehouseServiceInterface,
} from "../Warehouse/contract";

export class WarehouseService implements WarehouseServiceInterface {
  constructor(readonly repo: Repository<Warehouse>) {}

  async find(id: number): Promise<Warehouse | null> {
    return this.repo.findOneBy({ id });
  }

  async paginate({ page, perPage = 5 }: WarehousePaginateInput): Promise<{
    warehouses: Warehouse[];
    total: number;
  }> {
    page = Math.max(1, page || 1);

    const [warehouses, total] = await this.repo
      .createQueryBuilder("warehouses")
      .skip((page - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    return { warehouses, total };
  }
}
