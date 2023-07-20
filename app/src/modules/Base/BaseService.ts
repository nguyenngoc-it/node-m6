import {SelectQueryBuilder} from "typeorm";
import { Repository} from "typeorm";
import {paginateConfig} from "../../config";
import {FilterJoinTableSchema} from "./contract";
import {ObjectLiteral} from "typeorm/common/ObjectLiteral";
import moment from "moment";

export abstract class BaseService<Entity extends ObjectLiteral, Filter extends ObjectLiteral> {

  abstract  getTableName(): string;

  abstract  getRepository(): Repository<Entity>;

  getFillAble(): string[] {
    return [];
  }

  getFilterJoinTable():object {
    return {};
  }

  createQueryBuilderFromAgency(agencyId:number): SelectQueryBuilder<Entity> {
    return this.getRepository().createQueryBuilder(this.getTableName())
        .where(this.getTableName() + '.id_agency = :agencyId', {agencyId});
  }

  makeFilterFillAble(query: SelectQueryBuilder<Entity>, filter?: Filter): SelectQueryBuilder<Entity> {
    this.getFillAble().map((key:string):void => {
      const filter_value = !filter ? null : filter[key];
      if(filter_value) {
        const parameter:string = 'filter_key_' + key;
        if(Array.isArray(filter_value)) {
           query.andWhere(this.getTableName() + "." + key + " IN (:..." + parameter +") ");
        } else {
          query.andWhere(this.getTableName() + "." + key + " = :" + parameter);
        }
        query.setParameter(parameter, filter_value);
      }

    });
    return query;
  }

  makeFilterJoinTable(query: SelectQueryBuilder<Entity>, filter?: Filter): SelectQueryBuilder<Entity> {
    let joinTableNames:any[string] = [];
    Object.entries(this.getFilterJoinTable()).forEach(([key, filterJoinTable]):void => {
      const joinTable:FilterJoinTableSchema = filterJoinTable;

      const filter_value = !filter ? null : filter[key];
      if(filter_value) {
        if(!joinTableNames[joinTable.joinTableName]) {
          joinTableNames[joinTable.joinTableName] = true;
          query.innerJoin(joinTable.joinTableName, joinTable.joinTableName, this.getTableName() + '.'+ joinTable.joinKey +' = ' + joinTable.joinTableName +'.id');
        }

        const parameter:string = 'filter_key_' + key;
        if(Array.isArray(filter_value)) {
          query.andWhere(joinTable.joinTableName + '.' + joinTable.filterKey + " IN (:..." + parameter +") ");
        } else {
          query.andWhere(joinTable.joinTableName + '.' + joinTable.filterKey + ' = :' + parameter);
        }

        query.setParameter(parameter, filter_value);
      }
    });

    return query;
  }

  getPage(page:number|undefined) :number {
    return Math.max(1, page || 1)
  }

  getPerPage(perPage:number|null): number {
    perPage = Math.max(Number(paginateConfig.minPerPage), perPage || Number(paginateConfig.defaultPerPage));
    return  Math.min(Number(paginateConfig.maxPerPage), perPage);
  }

  makeFilterCreatedAt(query: SelectQueryBuilder<Entity>, filter?: Filter):SelectQueryBuilder<Entity> {
    let createdAtFrom = filter?.created_at_from ?? null;
    let createdAtTo = filter?.created_at_to ?? null;


    if(!createdAtTo) {
      createdAtTo = moment().format('YY-MM-DD');
    }

    if(!createdAtFrom) {
      createdAtFrom = moment().subtract(Number(paginateConfig.maxFilterTime), 'days').format('YY-MM-DD');
    }

    if (createdAtFrom) {
      createdAtFrom = createdAtFrom + " 00:00:00";
      query.andWhere(this.getTableName() + ".created_at >= :createdAtFrom", { createdAtFrom });
    }

    if (createdAtTo) {
      createdAtTo = createdAtTo + " 23:59:59";
      query.andWhere(this.getTableName() + ".created_at <= :createdAtTo", { createdAtTo });
    }

    return query;
  }

}