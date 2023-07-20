import { EntitySchema, Timestamp } from "typeorm";
import { EntityNameOrder, Order } from "./Order";
import { Customer, EntityNameCustomer } from "./Customer";
import { EntityNamePackageItem, PackageItem } from "./PackageItem";
import { Bag, EntityNameBag } from "./Bag";
import { EntitySchemaRelationTypes } from "../modules/Base/contract";
import { EntityShippingPartner, ShippingPartner } from "./ShippingPartner";
import { Agency, AgencyEntity } from "./Agency";

export interface Package {
  id: number;
  code: string;
  id_agency: number;
  height: number;
  id_bag: number;
  width: number;
  weight_net: number;
  weight_converted: number;
  weight_box: number;
  weight: number;
  barcode: string;
  type: string;
  status_transport: string;
  status: string;
  volume: number;
  created_at: Timestamp;
  customer_receive: string;
  customer_address_destination: string;
  customer_id_city_destination: string;
  customer_id_country_destination: string;
  customer_id_district_destination: string;
  customer_id_ward_destination: string;
  customer_note: string;
  customer_phone_destination: string;

  order?: Order;
  customer?: Customer;
  package_items?: PackageItem;
  bag?: Bag;
  shipping_partners?: ShippingPartner;
  agency?: Agency;
}

export const EntityNamePackage: string = "Package";
export const TableNamePackage: string = "packages";

export const PackageEntity = new EntitySchema<Package>({
  name: EntityNamePackage,
  tableName: TableNamePackage,
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
    height: {
      type: "int",
    },
    id_bag: {
      type: "int",
    },
    width: {
      type: "int",
    },
    weight_net: {
      type: "int",
    },
    weight_converted: {
      type: "int",
    },
    weight_box: {
      type: "int",
    },
    weight: {
      type: "int",
    },
    barcode: {
      type: "varchar",
    },
    type: {
      type: "varchar",
    },
    status_transport: {
      type: "varchar",
    },
    created_at: {
      type: "timestamp",
    },
    status: {
      type: "varchar",
    },
    volume: {
      type: "double",
    },
    customer_receive: {
      type: "int",
    },
    customer_address_destination: {
      type: "varchar",
    },
    customer_id_city_destination: {
      type: "varchar",
    },
    customer_id_country_destination: {
      type: "varchar",
    },
    customer_id_district_destination: {
      type: "varchar",
    },
    customer_id_ward_destination: {
      type: "varchar",
    },
    customer_note: {
      type: "varchar",
    },
    customer_phone_destination: {
      type: "varchar",
    },
  },
  relations: {
    order: {
      type: EntitySchemaRelationTypes.one_to_one,
      target: EntityNameOrder,
      joinColumn: {
        name: "id_order",
      },
    },
    customer: {
      type: EntitySchemaRelationTypes.one_to_one,
      target: EntityNameCustomer,
      joinColumn: {
        name: "id_customer",
      },
    },
    package_items: {
      type: EntitySchemaRelationTypes.one_to_many,
      target: "PackageItem",
      joinColumn: {
        name: "id",
        referencedColumnName: "id_package",
      },
      inverseSide: "package",
    },
    bag: {
      type: EntitySchemaRelationTypes.many_to_one,
      target: EntityNameBag,
      joinColumn: {
        name: "id_bag",
        referencedColumnName: "id",
      },
      inverseSide: "packages",
    },
    shipping_partners: {
      type: EntitySchemaRelationTypes.many_to_one,
      target: EntityShippingPartner,
      joinColumn: {
        name: "id_shipping_partner",
        referencedColumnName: "id",
      },
      inverseSide: "package",
    },
    agency: {
      type: EntitySchemaRelationTypes.many_to_one,
      target: AgencyEntity,
      joinColumn: {
        name: "id_agency",
        referencedColumnName: "id",
      },
      inverseSide: "package",
    },
  },
});
