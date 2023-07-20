import { Repository, SelectQueryBuilder } from "typeorm";
import { Package } from "../../entities/Package";
import {
  PackageServiceInterface,
  PackageFillAble,
  PackageFilterJoinTable,
  PackageFilter,
} from "./contract";
import { paginateConfig } from "../../config";
import { PaginateInput } from "../Base/contract";
import { BaseService } from "../Base/BaseService";

const PackageListRelation: object = {
  order: {
    order_freight_bills: true,
  },
  customer: true,
  shipping_partners: true,
  bag: true,
  agency: true,
};

const PackageDetailRelation: object = {
  ...PackageListRelation,
  package_items: true,
};

export class PackageService
  extends BaseService<Package, PackageFilter>
  implements PackageServiceInterface
{
  constructor(readonly repo: Repository<Package>) {
    super();
  }

  getTableName(): string {
    return this.repo.metadata.tableName;
  }

  getRepository(): Repository<Package> {
    return this.repo;
  }

  getFillAble(): string[] {
    return PackageFillAble;
  }

  getFilterJoinTable(): object {
    return PackageFilterJoinTable;
  }

  async paginate({
    agencyId,
    page,
    filter,
    perPage = Number(paginateConfig.defaultPerPage),
  }: PaginateInput<PackageFilter>): Promise<{
    packages: Package[];
    total: number;
  }> {
    page = this.getPage(page);
    perPage = this.getPerPage(perPage);

    let query: SelectQueryBuilder<Package> =
      this.createQueryBuilderFromAgency(agencyId);

    query = this.makeFilterFillAble(query, filter);
    query = this.makeFilterJoinTable(query, filter);
    query = this.makeFilterCreatedAt(query, filter);
    query = this.makeFilter(query, filter);

    const [packages, total] = await query
      .setFindOptions({
        relations: PackageListRelation,
        relationLoadStrategy: "query",
      })
      .skip((page - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    return { packages, total };
  }

  makeFilter(query: SelectQueryBuilder<any>, filter?: PackageFilter) {
    let order_code = filter?.order_code ?? null;

    let freight_bill_code = filter?.freight_bill_code ?? null;
    if (freight_bill_code && order_code) {
      query.innerJoin(
        "order_freight_bills",
        "order_freight_bills",
        "order_freight_bills.id_order = orders.id"
      );
      query.andWhere("order_freight_bills.freight_bill = :freight_bill_code", {
        freight_bill_code,
      });
    } else if (freight_bill_code) {
      query.innerJoin("orders", "orders", "packages.id_order = orders.id");
      query.innerJoin(
        "order_freight_bills",
        "order_freight_bills",
        "order_freight_bills.id_order = orders.id"
      );
      query.andWhere("order_freight_bills.freight_bill = :freight_bill_code", {
        freight_bill_code,
      });
    }

    let id_order_service = filter?.id_order_service ?? null;
    if (id_order_service && !order_code && !freight_bill_code) {
      query.innerJoin("orders", "orders", "packages.id_order = orders.id");
      query.innerJoin(
        "order_services",
        "order_services",
        "order_services.id_order = orders.id"
      );
      query.andWhere("order_services.id = :id_order_service", {
        id_order_service,
      });
    } else if (id_order_service && (order_code || freight_bill_code)) {
      query.innerJoin(
        "order_services",
        "order_services",
        "order_services.id_order = orders.id"
      );
      query.andWhere("order_services.id = :id_order_service", {
        id_order_service,
      });
    }

    let id_propertie = filter?.id_propertie ?? null;
    if (id_propertie) {
      query.innerJoin(
        "package_properties",
        "package_properties",
        "package_properties.id_package = packages.id"
      );
      query.innerJoin(
        "properties",
        "properties",
        "properties.id = package_properties.id_property"
      );
      query.andWhere("properties.id = :id_propertie", { id_propertie });
    }
    return query;
  }

  async find(agencyId: number, id: number): Promise<Package | null> {
    return this.repo.findOne({
      where: { id, id_agency: agencyId },
      relations: PackageDetailRelation,
      relationLoadStrategy: "query",
    });
  }
}
