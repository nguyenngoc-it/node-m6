import { orderService } from "../modules/Order";
import { apiHandler, apiService } from "../modules/App";
import { appConfig } from "../config";
import { ApiHandler } from "../modules/App/contract";

export const handler = apiHandler(async (event, context) => {
  switch (event.routeKey) {
    case "GET /":
      return apiService.success({ service: appConfig.name });

    case "GET /orders":
      return listOrders(event, context);

    case "GET /orders/{orderId}":
      return orderDetail(event, context);

    default:
      return apiService.error(404, null, 404);
  }
});

export const listOrders: ApiHandler = async (event) => {
  const agencyId = apiService.getAgencyId(event);
  const page = Number(event.queryStringParameters?.page);
  const res = await orderService.paginate({ agencyId, page });

  return apiService.success(res);
};

export const orderDetail: ApiHandler = async (event) => {
  const agencyId = apiService.getAgencyId(event);
  const id = Number(event.pathParameters?.orderId);
  if (!id) {
    return apiService.error(404, null, 404);
  }
  const order = await orderService.find(agencyId, id);

  if (!order) {
    return apiService.error(404, null, 404);
  }

  return apiService.success({ order });
};
