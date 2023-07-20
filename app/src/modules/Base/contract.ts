import {ObjectLiteral} from "typeorm/common/ObjectLiteral";

export interface FilterJoinTableSchema  {
  joinTableName: string,
  joinKey: string,
  filterKey: string,
}
export type FilterJoinTable = Record<string, FilterJoinTableSchema>

export enum EntitySchemaRelationTypes  {
  one_to_one   = "one-to-one" ,
  one_to_many  = "one-to-many",
  many_to_one  = "many-to-one",
  many_to_many = "many-to-many"
}

export enum StatusTypes {
  success = 'success',
  error = 'error'
}

export type StatusType = keyof typeof StatusTypes;
export interface ResponseSchema  {
  status: StatusType,
  key?: string,
  message: string,
}

export type PaginateInput<Filter extends ObjectLiteral> = {
  agencyId: number,
  page?: number,
  filter?: Filter,
  perPage?: number
}
