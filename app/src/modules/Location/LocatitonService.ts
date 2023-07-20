import { Repository, SelectQueryBuilder } from "typeorm";
import {
  LocationFillAble,
  LocationFilter,
  LocationServiceInterface,
} from "./contract";
import { Location } from "../../entities/Location";
import { BaseService } from "../Base/BaseService";
import { paginateConfig } from "../../config";
import { PaginateInput } from "../Base/contract";

export class LocationService
  extends BaseService<Location, LocationFilter>
  implements LocationServiceInterface
{
  constructor(readonly repo: Repository<Location>) {
    super();
  }

  getTableName(): string {
    return this.repo.metadata.tableName;
  }

  getRepository(): Repository<Location> {
    return this.repo;
  }

  getFillAble(): string[] {
    return LocationFillAble;
  }

  async paginate({
    agencyId,
    page,
    filter,
    perPage = Number(paginateConfig.defaultPerPage),
  }: PaginateInput<LocationFilter>): Promise<{
    locations: Location[];
    total: number;
  }> {
    page = this.getPage(page);
    perPage = this.getPerPage(perPage);

    let query: SelectQueryBuilder<Location> =
      this.repo.createQueryBuilder("locations");

    query = this.makeFilterFillAble(query, filter);

    const [locations, total] = await query
      .skip((page - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    return { locations, total };
  }
}
