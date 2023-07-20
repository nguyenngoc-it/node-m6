import { EntitySchema } from "typeorm";
import {EntityNameOrder, Order} from "./Order";
import {EntitySchemaRelationTypes} from "../modules/Base/contract";

export interface OrderItem {
  id: number;
  id_order: number;
  code_item: string;
  order?: Order;
}

export const EntityNameOrderItem:string = "OrderItem";
export const TableNameOrderItem:string = 'order_items';

export const OrderItemEntity = new EntitySchema<OrderItem>({
  name: EntityNameOrderItem,
  tableName: TableNameOrderItem,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    id_order: {
      type: "int",
    },
    code_item: {
      type: "varchar",
    },
  },
  relations: {
    // Với relation one-to-many & many-to-one thì phải khai báo relation ở cả 2 entity
    order: {
      type: EntitySchemaRelationTypes.many_to_one,
      target: EntityNameOrder,
      joinColumn: {
        name: "id_order",
        referencedColumnName: "id",
      },
      inverseSide: "order_items", // Note that this is relation name, not the entity name
    },
  },
});
