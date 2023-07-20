import { EntitySchema, Timestamp } from "typeorm";
import { EntitySchemaRelationTypes } from "../modules/Base/contract";

export interface Agency {
  id: number;
  id_partner: number;
  id_location: number;
  code: string;
  name: string;
  address: string;
  inherit: string;
  active: number;
  created_at: Timestamp;

  packages?: Agency;
}
export const EntityNameAgency: string = "Agency";
export const TableNameAgency: string = "agencies";

export const AgencyEntity = new EntitySchema<Agency>({
  name: EntityNameAgency,
  tableName: TableNameAgency,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    id_partner: {
      type: "int",
    },
    id_location: {
      type: "int",
    },
    code: {
      type: "varchar",
    },
    address: {
      type: "varchar",
    },
    inherit: {
      type: "varchar",
    },
    active: {
      type: "int",
    },
    created_at: {
      type: "timestamp",
    },
  },
  relations: {
    packages: {
      type: EntitySchemaRelationTypes.one_to_many,
      target: "Package",
      joinColumn: {
        name: "id",
        referencedColumnName: "id_agency",
      },
      inverseSide: "agencies",
    },
  },
});
