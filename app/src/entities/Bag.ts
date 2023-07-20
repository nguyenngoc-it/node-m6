import { EntitySchema} from "typeorm";
import {EntityNameWarehouse, Warehouse} from "./Warehouse";
import {EntityShippingPartner, ShippingPartner} from "./ShippingPartner";
import {EntityNamePackage, Package} from "./Package";
import {Customer, EntityNameCustomer} from "./Customer";
import {EntitySchemaRelationTypes} from "../modules/Base/contract";
export interface Bag {
  id: number,
  code: string,
  id_partner: number,
  id_agency: number,
  id_bag_area: number,
  id_customer: number,
  id_shipping_user: number,
  id_shipping_partner: number,
  id_warehouse_current: number,
  id_warehouse_input: number,
  id_warehouse_destination: number,
  status: string,
  fixed_code: string,
  receiver_name: string,
  receiver_phone: string,
  status_warehouse: string,
  type: string,
  note: string,
  note_to_customer: string,
  weight_real: number,
  weight_package: number,
  num_package: number,
  volume: number,
  height: number,
  width: number,
  length: number,
  storage_fee: number,
  time_scan: Date,
  shipping_at: Date,
  completed_at: Date,
  archived_at: Date,
  created_at: Date,
  updated_at: Date,
  shipping_partner ?: ShippingPartner,
  warehouse_current ?: Warehouse,
  warehouse_input ?: Warehouse,
  warehouse_destination ?: Warehouse,
  customer?: Customer,
  packages ?: Package[]
}

export const EntityNameBag:string = 'Bag';
export const TableNameBag:string = 'bags';

export const BagEntity = new EntitySchema<Bag>({
  name: EntityNameBag,
  tableName: TableNameBag,
  columns: {
    id: {primary: true, type: 'int', generated: true},
    code: {type: 'varchar'},
    id_partner: {type: 'int'},
    id_agency: {type: 'int'},
    id_bag_area: {type: 'int'},
    id_customer: {type: 'int'},
    id_shipping_user: {type: 'int'},
    id_shipping_partner: {type: 'int'},
    id_warehouse_current: {type: 'int'},
    id_warehouse_input: {type: 'int'},
    id_warehouse_destination: {type: 'int'},
    status: {type: 'varchar'},
    fixed_code: {type: 'varchar'},
    receiver_name: {type: 'varchar'},
    receiver_phone: {type: 'varchar'},
    status_warehouse: {type: 'varchar'},
    type: {type: 'varchar'},
    note: {type: 'varchar'},
    note_to_customer: {type: 'varchar'},
    weight_real: {type: 'double'},
    weight_package: {type: 'double'},
    num_package: {type: 'int'},
    volume: {type: 'double'},
    height: {type: 'double'},
    width: {type: 'double'},
    length: {type: 'double'},
    storage_fee: {type: 'double'},
    time_scan: { type: Date, createDate: true},
    shipping_at: { type: Date, createDate: true},
    completed_at: { type: Date, createDate: true},
    archived_at: { type: Date, createDate: true},
    created_at: { type: Date, createDate: true},
    updated_at: { type: Date, updateDate: true},
  },
  relations: {
    shipping_partner:  {
      type: EntitySchemaRelationTypes.one_to_one,
      target: EntityShippingPartner,
      joinColumn: {
        name: 'id_shipping_partner',
        referencedColumnName: 'id',
      }
    },
    warehouse_current: {
      type: EntitySchemaRelationTypes.one_to_one,
      target: EntityNameWarehouse,
      joinColumn: {
        name: 'id_warehouse_current',
      }
    },
    warehouse_input: {
      type: EntitySchemaRelationTypes.one_to_one,
      target: EntityNameWarehouse,
      joinColumn: {
        name: 'id_warehouse_input',
      }
    },
    warehouse_destination: {
      type: EntitySchemaRelationTypes.one_to_one,
      target: EntityNameWarehouse,
      joinColumn: {
        name: 'id_warehouse_destination',
      }
    },
    customer: {
      type: EntitySchemaRelationTypes.one_to_one,
      target: EntityNameCustomer,
      joinColumn: {
        name: "id_customer",
      },
    },
    packages:  {
      type: EntitySchemaRelationTypes.one_to_many,
      target: "Package",
      joinColumn: {
        name: "id",
        referencedColumnName: "id_bag",
      },
      inverseSide: "bag",
    },
  }
})