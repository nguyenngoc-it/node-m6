import { Customer } from "../../entities/Customer";
import { db } from "../App/db";
import { CustomerService } from "./CustomerService";
import { Repository } from "typeorm";
import { CustomerServiceInterface } from "./contract";

export const customerRepository: Repository<Customer> = db.getRepository<Customer>('Customer')

export const customerService: CustomerServiceInterface = new CustomerService(customerRepository)