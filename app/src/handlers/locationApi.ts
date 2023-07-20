import { apiHandler, apiService } from "../modules/App";
import { appConfig } from "../config";
import { ApiHandler } from "../modules/App/contract";
import { locationService } from "../modules/Location";

export const handler = apiHandler(async (event, context) => {
  switch (event.routeKey) {
    case "GET /":
      return apiService.success({ service: appConfig.name });

    case "GET /locations":
      return listLocations(event, context);

    default:
      return apiService.error(404, null, 404);
  }
});

export const listLocations: ApiHandler = async (event) => {
  const paginateInput = apiService.getPaginateInput(event);
  const res = await locationService.paginate({ ...paginateInput });

  return apiService.success(res);
};
