import { Repository } from "typeorm";
import { Property } from "../../entities/Property";
import { PropertyPaginateInput, PropertyServiceInterface } from "./contract";

export class PropertyService implements PropertyServiceInterface {
  constructor(readonly repo: Repository<Property>) {}

  async paginate({ page, perPage = 5 }: PropertyPaginateInput): Promise<{
    properties: Property[];
    total: number;
  }> {
    page = Math.max(1, page || 1);

    const [properties, total] = await this.repo
      .createQueryBuilder("properties")
      .skip((page - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    return { properties, total };
  }
}
