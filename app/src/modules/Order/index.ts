import { Order } from "../../entities/Order";
import { db } from "../App/db";
import { OrderService } from "./OrderService";
import { OrderServiceInterface } from "./contract";

export const orderRepository = db.getRepository<Order>("Order");

export const orderService: OrderServiceInterface = new OrderService(
  orderRepository
);
