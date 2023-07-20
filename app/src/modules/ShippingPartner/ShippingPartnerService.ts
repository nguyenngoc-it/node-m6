import { Repository} from "typeorm";
import { ShippingPartner } from "../../entities/ShippingPartner";
import {ShippingPartnerServiceInterface} from "../ShippingPartner/contract";

export class ShippingPartnerService implements ShippingPartnerServiceInterface{
  constructor(readonly repo: Repository<ShippingPartner>) {}

  async find(id: number): Promise<ShippingPartner | null> {
    return this.repo.findOneBy({id})
  }
}