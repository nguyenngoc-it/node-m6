import { EntitySchema } from "typeorm";
import { Agency, EntityNameAgency } from "./Agency";
import { EntityNameOrderItem, OrderItem } from "./OrderItem";
import { EntitySchemaRelationTypes } from "../modules/Base/contract";
import {
  EntityNameOrderFreightBill,
  OrderFreightBill,
} from "./OrderFreightBill";

export interface Order {
  id: number;
  code: string;
  id_agency: number;

  agency?: Agency;
  order_items?: OrderItem[];
  order_freight_bills?: OrderFreightBill;
}

export const EntityNameOrder: string = "Order";

export const TableNameOrder: string = "orders";

export const OrderEntity = new EntitySchema<Order>({
  name: EntityNameOrder,
  tableName: TableNameOrder,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    code: {
      type: "varchar",
    },
    id_agency: {
      type: "int",
    },
  },
  relations: {
    agency: {
      type: EntitySchemaRelationTypes.one_to_one,
      target: EntityNameAgency,
      joinColumn: {
        name: "id_agency",
        referencedColumnName: "id",
      },
    },
    // Với relation one-to-many & many-to-one thì phải khai báo relation ở cả 2 entity
    order_items: {
      type: EntitySchemaRelationTypes.many_to_one,
      target: "OrderItem",
      joinColumn: {
        name: "id",
        referencedColumnName: "id_order",
      },
      inverseSide: "order", // Note that this is relation name, not the entity name
    },
    order_freight_bills: {
      type: EntitySchemaRelationTypes.one_to_many,
      target: "OrderFreightBill",
      joinColumn: {
        name: "id",
        referencedColumnName: "id_order",
      },
      inverseSide: "order",
    },
  },
});
