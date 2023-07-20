import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { ApiEvent, ApiServiceInterface } from "./contract";
import { PaginateInput, ResponseSchema, StatusTypes } from "../Base/contract";
import { paginateConfig } from "../../config";
import { ObjectLiteral } from "typeorm/common/ObjectLiteral";
import moment from "moment/moment";
import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda/trigger/api-gateway-proxy";

export class ApiService implements ApiServiceInterface {
  success(data: any = null): APIGatewayProxyStructuredResultV2 {
    return this.response(data, 200);
  }

  error(
    code: number | string,
    data: any = null,
    statusCode: number = 400
  ): APIGatewayProxyStructuredResultV2 {
    return this.response({ code, data }, statusCode);
  }

  response(data: any, statusCode: number): APIGatewayProxyStructuredResultV2 {
    return {
      statusCode,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  validateCreatedAtTime(filter?: ObjectLiteral): ResponseSchema {
    let createdAtFrom: string | null = filter?.created_at_from ?? null;
    let createdAtTo: string | null = filter?.created_at_to ?? null;

    if (createdAtFrom && !createdAtTo) {
      return {
        status: StatusTypes.error,
        message: "created_at_to_required",
      };
    }

    if (!createdAtFrom && createdAtTo) {
      return {
        status: StatusTypes.error,
        message: "created_at_from_required",
      };
    }

    if (createdAtFrom && createdAtTo) {
      const maxTime: number = Number(paginateConfig.maxFilterTime);
      const timeFrom = moment(createdAtFrom);
      const timeTo = moment(createdAtTo).subtract(
        Number(paginateConfig.maxFilterTime),
        "days"
      );
      if (timeFrom < timeTo) {
        return {
          status: StatusTypes.error,
          message: "created_at_limit_" + maxTime + "_days",
        };
      }
    }

    return {
      status: StatusTypes.success,
      message: "success",
    };
  }

  getPaginateInput(event: ApiEvent): PaginateInput<ObjectLiteral> {
    const agencyId: number = this.getAgencyId(event);
    const page: number = Number(event.queryStringParameters?.page);
    const perPage: number = Number(event.queryStringParameters?.per_page);
    const filter = event.queryStringParameters;

    return {
      agencyId,
      page,
      filter,
      perPage,
    };
  }

  getAgencyId(event: ApiEvent): number {
    return Number(event.requestContext.authorizer.jwt.claims.sub);
  }
}
