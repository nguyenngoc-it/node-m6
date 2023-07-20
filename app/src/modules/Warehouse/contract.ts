import { Warehouse } from "../../entities/Warehouse";

export type WarehousePaginateInput = {
  page?: number;
  perPage?: number;
};
export interface WarehouseServiceInterface {
  find(id: number): Promise<Warehouse | null>;
  paginate(
    input: WarehousePaginateInput
  ): Promise<{ warehouses: Warehouse[]; total: number }>;
}
