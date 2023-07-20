import { Bag } from "../../entities/Bag";
import {FilterJoinTable, PaginateInput} from "../Base/contract";
import {TableNameWarehouse} from "../../entities/Warehouse";
import {TableNameShippingPartner} from "../../entities/ShippingPartner";
import {TableNameCustomer} from "../../entities/Customer";
import {CustomerColumn} from "../Customer/contract";

export enum BagColumn  {
  "id" = "id",
  "code" = "code",
  "status" = "status",
  "shipping_partner_id" = "id_shipping_partner",
  "warehouse_current_id" = "id_warehouse_current",
  "warehouse_input_id" = "id_warehouse_input",
  "warehouse_destination_id" = "id_warehouse_destination",
  "customer_id" = "id_customer",
  "fixed_code" = "fixed_code",
  "type" = "type"
}

export const BagFillAble:string[] = Object.values(BagColumn);

export const BagFilterJoinTable: FilterJoinTable = {
  warehouse_current_code: {joinTableName: TableNameWarehouse, joinKey: BagColumn.warehouse_current_id, filterKey: BagColumn.code},
  warehouse_input_code: {joinTableName: TableNameWarehouse, joinKey: BagColumn.warehouse_input_id, filterKey: BagColumn.code},
  warehouse_destination_code: {joinTableName: TableNameWarehouse, joinKey: BagColumn.warehouse_destination_id, filterKey: BagColumn.code},
  shipping_partner_code: {joinTableName: TableNameShippingPartner, joinKey: BagColumn.shipping_partner_id, filterKey: BagColumn.code},
  customer_code: {joinTableName: TableNameCustomer, joinKey: BagColumn.customer_id, filterKey: CustomerColumn.code},
  customer_username: {joinTableName: TableNameCustomer, joinKey: BagColumn.customer_id, filterKey: CustomerColumn.username},
};

export type BagFilter = {
  id?: number,
  code?: string,
  order_code?: string,
  package_code?: string,
  freight_bill_code?: string,
  status?: string,
  id_shipping_partner?: number,
  id_warehouse_current?: number,
  id_warehouse_input?: number,
  id_warehouse_destination?: number,
  id_customer?: number,
  fixed_code?: string,
  type?: string,
  warehouse_current_code?: string,
  warehouse_input_code?: string,
  warehouse_destination_code?: string,
  shipping_partner_code?: string,
  customer_code?: string,
  customer_username?: string,
}

export interface BagServiceInterface {
  paginate(input: PaginateInput<BagFilter>): Promise<{bags: Bag[], total: number}>
  find(agencyId: number, id: number): Promise<Bag | null> 
}