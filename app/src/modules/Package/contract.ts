import { Package } from "../../entities/Package";
import { FilterJoinTable, PaginateInput } from "../Base/contract";
import { TableNameCustomer } from "../../entities/Customer";
import { TableNameOrder } from "../../entities/Order";

export enum PackageColumn {
  "id" = "id",
  "order_id" = "id_order",
  "customer_id" = "id_customer",
  "code" = "code",
  "status" = "status",
  "status_transport" = "status_transport",
  "customer_username" = "customer_username",
  "id_warehouse_current" = "id_warehouse_current",
}

export const PackageFillAble: string[] = Object.values(PackageColumn);

export const PackageFilterJoinTable: FilterJoinTable = {
  order_code: {
    joinTableName: TableNameOrder,
    joinKey: PackageColumn.order_id,
    filterKey: PackageColumn.code,
  },
  customer_code: {
    joinTableName: TableNameCustomer,
    joinKey: PackageColumn.customer_id,
    filterKey: PackageColumn.code,
  },
};

export type PackageFilter = {
  id?: number;
  code?: string;
  order_code?: string;
  customer_code?: string;
  freight_bill_code?: string;
  order_id?: number;
  customer_id?: number;
  status_transport?: string;
  customer_username?: string;
  status?: string;
  id_warehouse_current?: string;
  id_order_service?: number;
  id_propertie?: number;
};

export interface PackageServiceInterface {
  paginate(
    input: PaginateInput<PackageFilter>
  ): Promise<{ packages: Package[]; total: number }>;
  find(agencyId: number, id: number): Promise<Package | null>;
}
