import { Location } from "../../entities/Location";
import { db } from "../App/db";
import { LocationService } from "./LocatitonService";
import { LocationServiceInterface } from "./contract";

export const locationRepository = db.getRepository<Location>("Location");

export const locationService: LocationServiceInterface = new LocationService(
  locationRepository
);
