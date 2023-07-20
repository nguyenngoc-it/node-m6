import { EntitySchema } from "typeorm";
import {EntityNamePackage, Package} from "./Package";
import {EntitySchemaRelationTypes} from "../modules/Base/contract";

export interface PackageItem {
  id: number;
  code_item: string;
  id_order: number;
  sku: string;
  order_quantity: number;
  unit_price: number;
  unit_price_origin: number;

  package?: Package;
}

export const EntityNamePackageItem:string = 'PackageItem';
export const TableNamePackageItem:string = 'package_items';

export const PackageItemEntity = new EntitySchema<PackageItem>({
  name: EntityNamePackageItem,
  tableName: TableNamePackageItem,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    code_item: {
      type: "varchar",
    },
    id_order: {
      type: "varchar",
    },
    sku: {
      type: "varchar",
    },
    order_quantity: {
      type: "int",
    },
    unit_price: {
      type: "double",
    },
    unit_price_origin: {
      type: "double",
    },
  },
  relations: {
    package: {
      type: EntitySchemaRelationTypes.many_to_one,
      target: EntityNamePackage,
      joinColumn: {
        name: "id_package",
        referencedColumnName: "id",
      },
      inverseSide: "package_items",
    },
  },
});
