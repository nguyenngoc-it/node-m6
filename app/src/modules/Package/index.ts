import { Package } from "../../entities/Package";
import { db } from "../App/db";
import { PackageService } from "./PackageService";
import { PackageServiceInterface } from "./contract";

export const packageRepository = db.getRepository<Package>('Package')

export const packageService: PackageServiceInterface = new PackageService(packageRepository)