import { Repository, SelectQueryBuilder} from "typeorm";
import { Bag } from "../../entities/Bag";
import {
  BagServiceInterface,
  BagFillAble,
  BagFilterJoinTable, BagFilter
} from "../Bag/contract";
import {paginateConfig} from '../../config';
import {BaseService} from "../Base/BaseService";
import {PaginateInput} from "../Base/contract";
import {packageRepository} from "../Package";
import {EntityNamePackage, Package} from "../../entities/Package";

const BagListRelations :object = {
  shipping_partner: true,
  warehouse_current: true,
  warehouse_input: true,
  warehouse_destination: true,
}

const BagDetailRelations: object = {
  ...BagListRelations,
  packages: true,
  customer: true
}


export class BagService extends BaseService<Bag, BagFilter> implements BagServiceInterface{
  constructor(readonly repo: Repository<Bag>) {
    super();
  }

  getTableName():string {
    return this.repo.metadata.tableName;
  }

  getRepository():Repository<Bag> {
    return this.repo;
  }

  getFillAble(): string[] {
    return BagFillAble;
  }

  getFilterJoinTable():object
  {
    return BagFilterJoinTable;
  }

  async paginate({
    agencyId, 
    page,
    filter,
    perPage = Number(paginateConfig.defaultPerPage),
  }: PaginateInput<BagFilter>): Promise<{ bags: Bag[], total: number }> {
    page    = this.getPage(page);
    perPage = this.getPerPage(perPage);

    let query:SelectQueryBuilder<Bag> =  this.createQueryBuilderFromAgency(agencyId);

    query = this.makeFilterFillAble(query, filter);
    query = this.makeFilterJoinTable(query, filter);
    query = this.makeFilterCreatedAt(query, filter);
    query = await this.makeFilterCustom(query, agencyId, filter);

    const [bags, total] = await query.setFindOptions({
          relations: BagListRelations,
          relationLoadStrategy: 'query',
        })
        .skip((page - 1) * perPage)
        .take(perPage)
        .getManyAndCount();

    return { bags, total }
  }

  getPackageFromOrderCode(agencyId: number, orderCode:string):Promise<Package[]> {
    return packageRepository.createQueryBuilder()
        .select(EntityNamePackage + ".id_bag")
        .innerJoin("orders", "orders", EntityNamePackage + ".id_order = orders.id")
        .where("orders.id_agency = :agencyId", {agencyId})
        .andWhere("orders.code = :orderCode", {orderCode})
        .getMany();
  }

  getPackageFromFreightBillCode(agencyId: number, freightBillCode:string):Promise<Package[]> {
    return packageRepository.createQueryBuilder()
        .select(EntityNamePackage + '.id_bag')
        .innerJoin("orders", "orders", EntityNamePackage + ".id_order = orders.id")
        .innerJoin("order_freight_bills", "order_freight_bills", "order_freight_bills.id_order = orders.id")
        .where("orders.id_agency = :agencyId", {agencyId})
        .andWhere("order_freight_bills.freight_bill = :freightBillCode", {freightBillCode,})
        .getMany();
  }

   async makeFilterCustom(query: SelectQueryBuilder<Bag>,
                          agencyId: number,
                          filter?: BagFilter): Promise<SelectQueryBuilder<Bag>> {
     const orderCode:string|null = filter?.order_code ?? null;
     if (orderCode) {
       const packages:Package[] = await this.getPackageFromOrderCode(agencyId, orderCode);
       let bagIds:number[] = packages.map((raw:Package) => {
         return raw.id_bag;
       });
       if(!bagIds.length) {
         bagIds = [0];
       }
       query.andWhere(this.getTableName() + ".id IN (:...bagIds)", {bagIds});
     }

     const packageCode:string|null = filter?.package_code ?? null;
     if (packageCode) {
       const packageData:Package|null = await packageRepository.findOneBy({code: packageCode, id_agency: agencyId});
       const bagId:number = packageData?.id_bag ?? 0;
       query.andWhere(this.getTableName() + ".id = :bagId", {bagId});
     }

     const freightBillCode:string|null = filter?.freight_bill_code ?? null;
     if (freightBillCode) {
       const packages:Package[]  = await this.getPackageFromFreightBillCode(agencyId, freightBillCode);
       let ids:number[] = packages.map((raw:Package) => {
         return raw.id_bag;
       });
       if(!ids.length) {
         ids = [0];
       }
       query.andWhere(this.getTableName() + ".id IN (:...ids)", {ids});
     }

     return query;
   }

  async find(agencyId: number, id: number): Promise<Bag|null> {
    return this.repo.findOne({
      where: { id, id_agency: agencyId },
      relations: BagDetailRelations,
      relationLoadStrategy: 'query',
    })
  }
}