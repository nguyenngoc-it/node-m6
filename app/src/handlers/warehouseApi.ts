import { appConfig } from "../config";
import { apiHandler, apiService } from "../modules/App";
import { ApiHandler } from "../modules/App/contract";
import { warehouseService } from "../modules/Warehouse";

export const handler = apiHandler(async (event, context) => {
  switch (event.routeKey) {
    case "GET /":
      return apiService.success({ service: appConfig.name });

    case "GET /warehouses":
      return listWarehouses(event, context);

    default:
      return apiService.error(404, null, 404);
  }
});

export const listWarehouses: ApiHandler = async (event) => {
  const page = Number(event.queryStringParameters?.page);
  const res = await warehouseService.paginate({ page });

  return apiService.success(res);
};
