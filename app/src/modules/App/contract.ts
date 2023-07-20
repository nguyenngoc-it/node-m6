import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyStructuredResultV2, Context } from "aws-lambda";

export type ApiEvent = APIGatewayProxyEventV2WithJWTAuthorizer

export type ApiHandler = (event: ApiEvent, context: Context) => Promise<APIGatewayProxyStructuredResultV2>

export interface ApiServiceInterface {
  success(data: any): APIGatewayProxyStructuredResultV2
  error(code: number | string, data: any, statusCode: number): APIGatewayProxyStructuredResultV2
  response(data: any, statusCode: number): APIGatewayProxyStructuredResultV2
  getAgencyId(event: ApiEvent): number
}
