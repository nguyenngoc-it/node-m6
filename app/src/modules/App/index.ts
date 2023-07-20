import { ApiHandler as SSTApiHandler } from "sst/node/api";
import { ApiService } from "./ApiService";
import { bootstrap } from "../../bootstrap";
import { ApiHandler, ApiEvent } from "./contract";

export const apiService = new ApiService

export const apiHandler = (handler: ApiHandler) => {
  return SSTApiHandler(async (event, context) => {
    await bootstrap()
    return handler(event as ApiEvent, context)
  })
}