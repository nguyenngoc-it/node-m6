import { Repository} from "typeorm";
import { Customer } from "../../entities/Customer";
import {CustomerServiceInterface} from "../Customer/contract";

export class CustomerService implements CustomerServiceInterface{
  constructor(readonly repo: Repository<Customer>) {}

  async find(id: number) {
    return this.repo.findOneBy({id})
  }

  async findByCode(agencyId: number, code: string): Promise<Customer | null> {
    return this.repo.findOneBy({id_agency: agencyId, code})
  }
}