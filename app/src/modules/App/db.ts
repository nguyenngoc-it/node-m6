import "reflect-metadata";
import { DataSource } from "typeorm";
import { appConfig, dbConfig } from "../../config";
import { AgencyEntity } from "../../entities/Agency";
import { OrderEntity } from "../../entities/Order";
import { PackageEntity } from "../../entities/Package";
import { OrderItemEntity } from "../../entities/OrderItem";
import { CustomerEntity } from "../../entities/Customer";
import { PackageItemEntity } from "../../entities/PackageItem";
import { BagEntity } from "../../entities/Bag";
import { ShippingPartnerEntity } from "../../entities/ShippingPartner";
import { WarehouseEntity } from "../../entities/Warehouse";
import { DeliveryRequestEntity } from "../../entities/DeliveryRequest";
import { OrderFreightBillEntity } from "../../entities/OrderFreightBill";
import { PropertyEntity } from "../../entities/Property";
import { LocationEntity } from "../../entities/Location";

export const db = new DataSource({
  type: "mysql",
  host: dbConfig.host,
  port: dbConfig.port as number,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  logging: !!appConfig.debug,
  entities: [
    AgencyEntity,
    OrderEntity,
    OrderItemEntity,
    PackageEntity,
    CustomerEntity,
    PackageItemEntity,
    BagEntity,
    ShippingPartnerEntity,
    WarehouseEntity,
    DeliveryRequestEntity,
    OrderFreightBillEntity,
    PropertyEntity,
    LocationEntity,
  ],
  migrations: [],
  subscribers: [],
});
