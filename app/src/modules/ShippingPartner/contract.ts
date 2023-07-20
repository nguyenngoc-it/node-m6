import { ShippingPartner } from "../../entities/ShippingPartner";

export interface ShippingPartnerServiceInterface {
  find(id: number): Promise<ShippingPartner | null>
}