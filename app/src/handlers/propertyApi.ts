import { appConfig } from "../config";
import { apiHandler, apiService } from "../modules/App";
import { ApiHandler } from "../modules/App/contract";
import { propertyService } from "../modules/Property";

export const handler = apiHandler(async (event, context) => {
  switch (event.routeKey) {
    case "GET /":
      return apiService.success({ service: appConfig.name });

    case "GET /properties":
      return listProperties(event, context);

    default:
      return apiService.error(404, null, 404);
  }
});

export const listProperties: ApiHandler = async (event) => {
  const page = Number(event.queryStringParameters?.page);
  const res = await propertyService.paginate({ page });

  return apiService.success(res);
};
