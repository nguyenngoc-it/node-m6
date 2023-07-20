import { EntitySchema } from "typeorm";
import { EntitySchemaRelationTypes } from "../modules/Base/contract";
import { Package } from "./Package";

export interface ShippingPartner {
  id: number;
  code: string;
  name: string;
  address: string;

  package?: Package;
}

export const EntityShippingPartner: string = "ShippingPartner";
export const TableNameShippingPartner: string = "shipping_partners";

export const ShippingPartnerEntity = new EntitySchema<ShippingPartner>({
  name: EntityShippingPartner,
  tableName: TableNameShippingPartner,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    code: {
      type: "varchar",
    },
    address: {
      type: "varchar",
    },
  },
  relations: {
    package: {
      type: EntitySchemaRelationTypes.one_to_many,
      target: "Package",
      joinColumn: {
        name: "id",
        referencedColumnName: "id_shipping_partnerd",
      },
      inverseSide: "shipping_partners",
    },
  },
});
