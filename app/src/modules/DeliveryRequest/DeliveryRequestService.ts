import { Repository, SelectQueryBuilder } from "typeorm";
import { DeliveryRequest } from "../../entities/DeliveryRequest";
import {
    DeliveryRequestFillAble, DeliveryRequestFilter, DeliveryRequestFilterJoinTable,
    DeliveryRequestServiceInterface
} from "./contract";
import { paginateConfig } from "../../config";
import { BaseService } from "../Base/BaseService";
import { PaginateInput } from "../Base/contract";

const DeliveryRequestListRelations: object = {
    agency: true,
    warehouse: true,
    customer: true,
}

export class DeliveryRequestService extends BaseService<DeliveryRequest, DeliveryRequestFilter> implements DeliveryRequestServiceInterface {
    constructor(readonly repo: Repository<DeliveryRequest>) {
        super();
    }

    getTableName(): string {
        return this.repo.metadata.tableName;
    }

    getRepository(): Repository<DeliveryRequest> {
        return this.repo;
    }

    getFillAble(): string[] {
        return DeliveryRequestFillAble;
    }

    getFilterJoinTable(): object {
        return DeliveryRequestFilterJoinTable;
    }

    async find(id: number): Promise<DeliveryRequest | null> {
        return this.repo.findOneBy({ id })
    }

    async findByCode(agencyId: number, code: string): Promise<DeliveryRequest | null> {
        return this.repo.findOneBy({ id_agency: agencyId, code })
    }

    async paginate({
        agencyId,
        page,
        filter,
        perPage = Number(paginateConfig.defaultPerPage),
    }: PaginateInput<DeliveryRequestFilter>): Promise<{ deliveryRequests: DeliveryRequest[], total: number }> {
        page = Math.max(1, page || 1)
        perPage = this.getPerPage(perPage);

        let query: SelectQueryBuilder<DeliveryRequest> = this.createQueryBuilderFromAgency(agencyId);

        query = this.makeFilterFillAble(query, filter);
        query = this.makeFilterJoinTable(query, filter);
        query = this.makeFilterCreatedAt(query, filter);

        const [deliveryRequests, total] = await query.setFindOptions({
            relations: DeliveryRequestListRelations,
            relationLoadStrategy: 'query',
        })
            .skip((page - 1) * perPage)
            .take(perPage)
            .getManyAndCount();

        return { deliveryRequests, total }
    }
}