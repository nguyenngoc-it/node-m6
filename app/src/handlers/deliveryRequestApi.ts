import {deliveryRequestService} from "../modules/DeliveryRequest";
import {apiHandler, apiService} from "../modules/App";
import {ApiHandler} from "../modules/App/contract";
import {ResponseSchema, StatusTypes} from "../modules/Base/contract";

export const handler = apiHandler(async (event, context) => {
    switch (event.routeKey) {
        case 'GET /delivery-requests':
            return listDeliveryRequests(event, context)
        default:
            return apiService.error(404, null, 404)
    }
})

export const listDeliveryRequests: ApiHandler = async (event) => {

    const paginateInput = apiService.getPaginateInput(event);

    const validateCreatedAtTime:ResponseSchema  = apiService.validateCreatedAtTime(event.queryStringParameters);
    if(validateCreatedAtTime.status === StatusTypes.error) {
        return apiService.error(validateCreatedAtTime.status, validateCreatedAtTime.message)
    }
    const {deliveryRequests, total} = await deliveryRequestService.paginate({...paginateInput})

    return apiService.success({delivery_requests: deliveryRequests, total})
};