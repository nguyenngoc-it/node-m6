import {DeliveryRequest} from "../../entities/DeliveryRequest";
import {FilterJoinTable, PaginateInput} from "../Base/contract";
import {TableNameWarehouse} from "../../entities/Warehouse";
import {TableNameCustomer} from "../../entities/Customer";


export enum DeliveryRequestColumn  {
    "id" = "id",
    "code" = "code",
    "status" = "status",
    "warehouse_id" = "id_warehouse",
    "customer_id" = "id_customer",
}

export const DeliveryRequestFillAble:string[] = Object.values(DeliveryRequestColumn);

export const DeliveryRequestFilterJoinTable: FilterJoinTable = {
    warehouse_code: {joinTableName: TableNameWarehouse, joinKey: DeliveryRequestColumn.warehouse_id, filterKey: DeliveryRequestColumn.code},
    customer_code: {joinTableName: TableNameCustomer, joinKey: DeliveryRequestColumn.customer_id, filterKey: DeliveryRequestColumn.code},
};

export type DeliveryRequestFilter = {
    id?: number,
    code?: string,
    warehouse_id?: number,
    customer_id?: number,
    warehouse_code?: string,
    customer_code?: string,
    status?: string,
}

export interface DeliveryRequestServiceInterface {
    find(id: number): Promise<DeliveryRequest | null>
    findByCode(agencyId: number, code: string): Promise<DeliveryRequest | null>
    paginate(input: PaginateInput<DeliveryRequestFilter>): Promise<{ deliveryRequests: DeliveryRequest[], total: number }>
}