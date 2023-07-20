import { ShippingPartner } from "../../entities/ShippingPartner";
import { db } from "../App/db";
import { ShippingPartnerService } from "./ShippingPartnerService";
import { Repository } from "typeorm";
import { ShippingPartnerServiceInterface } from "./contract";

export const shippingPartnerRepository: Repository<ShippingPartner> = db.getRepository<ShippingPartner>('ShippingPartner')

export const shippingPartnerService: ShippingPartnerServiceInterface = new ShippingPartnerService(shippingPartnerRepository)