import { EntitySchema } from "typeorm";

export interface Warehouse {
  id: number,
  code: string,
  name: string,
  address: string,
}

export const EntityNameWarehouse:string = 'Warehouse';
export const TableNameWarehouse:string = 'warehouses';

export const WarehouseEntity = new EntitySchema<Warehouse>({
  name: EntityNameWarehouse,
  tableName: TableNameWarehouse,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    code: {
      type: 'varchar',
    },
    address: {
      type: 'varchar',
    }
  },
})