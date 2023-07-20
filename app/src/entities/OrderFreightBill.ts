import { EntitySchema, Timestamp } from "typeorm";
import { EntityNameOrder, Order } from "./Order";
import { EntitySchemaRelationTypes } from "../modules/Base/contract";

export interface OrderFreightBill {
  id: number;
  freight_bill: string;
  created_at: Timestamp;

  order?: Order;
}
export const EntityNameOrderFreightBill: string = "OrderFreightBill";
export const TableNameOrderFreightBill: string = "order_freight_bills";

export const OrderFreightBillEntity = new EntitySchema<OrderFreightBill>({
  name: EntityNameOrderFreightBill,
  tableName: TableNameOrderFreightBill,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    freight_bill: {
      type: "varchar",
    },
    created_at: {
      type: "timestamp",
    },
  },
  relations: {
    order: {
      type: EntitySchemaRelationTypes.many_to_one,
      target: "Order",
      joinColumn: {
        name: "id_order",
        referencedColumnName: "id",
      },
      inverseSide: "order_freight_bills",
    },
  },
});
