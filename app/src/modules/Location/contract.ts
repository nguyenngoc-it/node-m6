import { Location } from "../../entities/Location";
import { PaginateInput } from "../Base/contract";

export enum LocationColumn {
  "code" = "code",
  "type" = "type",
}

export const LocationFillAble: string[] = Object.values(LocationColumn);

export interface LocationServiceInterface {
  paginate(
    input: PaginateInput<LocationFilter>
  ): Promise<{ locations: Location[]; total: number }>;
}

export type LocationFilter = {
  code?: string;
  type?: string;
};
