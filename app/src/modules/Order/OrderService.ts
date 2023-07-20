import { Repository } from "typeorm";
import { Order } from "../../entities/Order";
import { OrderPaginateInput, OrderServiceInterface } from "./contract";

export class OrderService implements OrderServiceInterface {
  constructor(readonly repo: Repository<Order>) {}

  async paginate({
    agencyId,
    page,
    perPage = 5,
  }: OrderPaginateInput): Promise<{ orders: Order[]; total: number }> {
    page = Math.max(1, page || 1);

    const [orders, total] = await this.repo
      .createQueryBuilder("orders")
      .andWhere("orders.id_agency = :agencyId", { agencyId })
      .setFindOptions({
        relations: {
          agency: false,
          order_items: true,
        },
        relationLoadStrategy: "query",
      })
      .skip((page - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    return { orders, total };
  }

  async find(agencyId: number, id: number) {
    return this.repo.findOne({
      where: { id, id_agency: agencyId },
      relations: {
        agency: true,
        order_items: true,
      },
      relationLoadStrategy: "query",
    });
  }
}
