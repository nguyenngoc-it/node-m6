import { bagService } from "../modules/Bag";
import { apiHandler, apiService } from "../modules/App";
import { ApiHandler } from "../modules/App/contract";
import {PaginateInput, ResponseSchema, StatusTypes} from "../modules/Base/contract";
import {BagFilter} from "../modules/Bag/contract";

export const handler = apiHandler(async (event, context) => {
    switch (event.routeKey) {
        case 'GET /bags':
            return listBags(event, context)

        case 'GET /bags/{bagId}':
            return bagDetail(event, context)

        default:
            return apiService.error(404, null, 404)
    }
})

export const listBags: ApiHandler = async (event) => {

    const paginateInput:PaginateInput<BagFilter> = apiService.getPaginateInput(event);

    const validateCreatedAtTime:ResponseSchema  = apiService.validateCreatedAtTime(event.queryStringParameters);
    if(validateCreatedAtTime.status === StatusTypes.error) {
        return apiService.error(validateCreatedAtTime.status, validateCreatedAtTime.message)
    }

    const res = await bagService.paginate({...paginateInput});

    return apiService.success(res)
};

export const bagDetail: ApiHandler = async (event) => {
    const agencyId = apiService.getAgencyId(event)
    const id = Number(event.pathParameters?.bagId)
    if (!id) {
        return apiService.error(404, null, 404)
    }
    const bag = await bagService.find(agencyId, id);

    if (!bag) {
        return apiService.error(404, null, 404)
    }

    return apiService.success({bag})
};

