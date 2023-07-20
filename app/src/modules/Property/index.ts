import { Repository } from "typeorm";
import { Property } from "../../entities/Property";
import { db } from "../App/db";
import { PropertyServiceInterface } from "./contract";
import { PropertyService } from "./PropertyService";

export const propertyRepository: Repository<Property> =
  db.getRepository<Property>("properties");

export const propertyService: PropertyServiceInterface = new PropertyService(
  propertyRepository
);
