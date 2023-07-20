import { EntitySchema, Timestamp } from "typeorm";

export interface Location {
  id: number;
  code: string;
  goship_code: string;
  type: string;
  area: string;
  code_parent: string;
  label: string;
  detail: string;
  active: number;
  created_at: Timestamp;
  updated_at: Timestamp;
  priority: number;
}

export const EntityNameLocation: string = "Location";

export const TableNameLocation: string = "locations";

export const LocationEntity = new EntitySchema<Location>({
  name: EntityNameLocation,
  tableName: TableNameLocation,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    code: {
      type: "varchar",
    },
    goship_code: {
      type: "varchar",
    },
    type: {
      type: "varchar",
    },
    area: {
      type: "varchar",
    },
    code_parent: {
      type: "varchar",
    },
    label: {
      type: "varchar",
    },
    detail: {
      type: "varchar",
    },
    active: {
      type: "int",
    },
    created_at: {
      type: "timestamp",
    },
    updated_at: {
      type: "timestamp",
    },
    priority: {
      type: "int",
    },
  },
});
