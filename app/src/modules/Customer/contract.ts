import { Customer } from "../../entities/Customer";
export enum CustomerColumn  {
  "id" = "id",
  "code" = "code",
  "name" = "name",
  "username" = "username"
}

export interface CustomerServiceInterface {
  find(id: number): Promise<Customer | null>
  findByCode(agencyId: number, code: string): Promise<Customer | null>
}