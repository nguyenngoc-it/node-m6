import { apiHandler, apiService } from "../modules/App";
import { appConfig } from "../config";
import { packageService } from "../modules/Package";
import { ApiHandler } from "../modules/App/contract";
import { ResponseSchema, StatusTypes } from "../modules/Base/contract";

export const handler = apiHandler(async (event, context) => {
  switch (event.routeKey) {
    case "GET /":
      return apiService.success({ service: appConfig.name });

    case "GET /packages":
      return listPackages(event, context);

    case "GET /packages/{packageId}":
      return packageDetail(event, context);

    default:
      return apiService.error(404, { message: "Package not found" }, 404);
  }
});

export const listPackages: ApiHandler = async (event) => {
  const paginateInput = apiService.getPaginateInput(event);

  const validateCreatedAtTime: ResponseSchema =
    apiService.validateCreatedAtTime(event.queryStringParameters);
  if (validateCreatedAtTime.status === StatusTypes.error) {
    return apiService.error(
      validateCreatedAtTime.status,
      validateCreatedAtTime.message
    );
  }

  const res = await packageService.paginate({ ...paginateInput });

  return apiService.success(res);
};

export const packageDetail: ApiHandler = async (event) => {
  const agencyId = apiService.getAgencyId(event);
  const id = Number(event.pathParameters?.packageId);
  if (!id) {
    return apiService.error(404, { message: "Package not found" }, 404);
  }
  const res = await packageService.find(agencyId, id);

  if (!res) {
    return apiService.error(404, { message: "Package not found" }, 404);
  }

  return apiService.success({ res });
};
