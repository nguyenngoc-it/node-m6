import { Bag } from "../../entities/Bag";
import { db } from "../App/db";
import { BagService } from "./BagService";
import { Repository } from "typeorm";
import { BagServiceInterface } from "./contract";

export const bagRepository: Repository<Bag> = db.getRepository<Bag>('Bag')

export const bagService: BagServiceInterface = new BagService(bagRepository)