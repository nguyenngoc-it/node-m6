import {EntitySchema} from "typeorm";
import {Agency, EntityNameAgency} from "./Agency";
import {EntityNameWarehouse, Warehouse} from "./Warehouse";
import {Customer, EntityNameCustomer} from "./Customer";
import {EntitySchemaRelationTypes} from "../modules/Base/contract";

export interface DeliveryRequest {
    id: number,
    id_partner: number,
    id_agency: number,
    id_customer: number,
    id_warehouse: number,
    code: string,
    receiver_name: string,
    receiver_phone: string,
    address: string,
    note: string,
    status: string,
    created_at: Date,
    updated_at: Date,

    agency?: Agency,
    warehouse?: Warehouse,
    customer?: Customer,
}
export const EntityNameDeliveryRequest:string = 'DeliveryRequest';
export const TableNameDeliveryRequest:string = 'delivery_requests';

export const DeliveryRequestEntity = new EntitySchema<DeliveryRequest>({
    name: EntityNameDeliveryRequest,
    tableName: TableNameDeliveryRequest,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        id_partner: {
            type: 'int',
        },
        id_agency: {
            type: 'int',
        },
        id_customer: {
            type: 'int',
        },
        id_warehouse: {
            type: 'int',
        },
        code: {
            type: 'varchar',
        },
        receiver_name: {
            type: "varchar",
        },
        receiver_phone: {
            type: "varchar",
        },
        address: {
            type: 'varchar',
        },
        note: {
            type: 'varchar',
        },
        status: {
            type: 'varchar',
        },
        created_at: { type: Date, createDate: true},
        updated_at: { type: Date, updateDate: true},
    },
    relations: {
        agency: {
            type: EntitySchemaRelationTypes.one_to_one,
            target: EntityNameAgency,
            joinColumn: {
                name: 'id_agency',
                referencedColumnName: 'id',
            },
        },
        warehouse: {
            type: EntitySchemaRelationTypes.one_to_one,
            target: EntityNameWarehouse,
            joinColumn: {
                name: 'id_warehouse',
            }
        },
        customer: {
            type: EntitySchemaRelationTypes.one_to_one,
            target: EntityNameCustomer,
            joinColumn: {
                name: 'id_customer',
            }
        },
    }
})
