import { db } from "../App/db";
import { DeliveryRequestService } from "./DeliveryRequestService";
import { DeliveryRequest } from "../../entities/DeliveryRequest";
import { DeliveryRequestServiceInterface } from "./contract";

export const deliveryRequestRepository = db.getRepository<DeliveryRequest>('DeliveryRequest')

export const deliveryRequestService: DeliveryRequestServiceInterface = new DeliveryRequestService(deliveryRequestRepository)