import { Order } from "../../entities/Order";

export type OrderPaginateInput = {
  agencyId: number;
  page?: number;
  perPage?: number;
};

export interface OrderServiceInterface {
  paginate(
    input: OrderPaginateInput
  ): Promise<{ orders: Order[]; total: number }>;
  find(agencyId: number, id: number): Promise<Order | null>;
}
