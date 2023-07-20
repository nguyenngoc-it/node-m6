import { Property } from "../../entities/Property";

export type PropertyPaginateInput = {
  page?: number;
  perPage?: number;
};

export interface PropertyServiceInterface {
  paginate(
    input: PropertyPaginateInput
  ): Promise<{ properties: Property[]; total: number }>;
}
