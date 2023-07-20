import { EntitySchema } from "typeorm";

export interface Property {
  id: number;
  id_partner: number;
  code: string;
  type: string;
  alias: string;
  sound: string;
  name: string;
  note: string;
  active: number;
}

export const EntityNameProperty: string = "Property";
export const TableNameProperty: string = "properties";

export const PropertyEntity = new EntitySchema<Property>({
  name: EntityNameProperty,
  tableName: TableNameProperty,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    id_partner: {
      type: "int",
    },
    code: {
      type: "varchar",
    },
    type: {
      type: "varchar",
    },
    alias: {
      type: "varchar",
    },
    sound: {
      type: "varchar",
    },
    name: {
      type: "varchar",
    },
    note: {
      type: "varchar",
    },
    active: {
      type: "int",
    },
  },
});
