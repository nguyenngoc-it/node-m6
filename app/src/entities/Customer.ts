import { EntitySchema } from "typeorm";

export interface Customer {
  id: number;
  id_agency: number,
  code: string;
  username: string;
  address: string;
  email: string;
  full_name: string;
  phone: string;
  type: string;
}

export const EntityNameCustomer:string = 'Customer';
export const TableNameCustomer:string = 'customers';

export const CustomerEntity = new EntitySchema<Customer>({
  name: EntityNameCustomer,
  tableName: TableNameCustomer,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    id_agency: {
      type: "int",
    },
    code: {
      type: "varchar",
    },
    username: {
      type: "varchar",
    },
    address: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
    full_name: {
      type: "varchar",
    },
    phone: {
      type: "varchar",
    },
    type: {
      type: "varchar",
    },
  },
});
