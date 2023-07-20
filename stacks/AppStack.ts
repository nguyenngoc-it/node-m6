import { StackContext, Api, Function } from "sst/constructs";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export function AppStack({ stack, app }: StackContext) {
  const domain = process.env.APP_DOMAIN;
  const certArn = process.env.APP_CERT_ARN as string;
  const oidIssuer = process.env.OIDC_ISSUER as string;
  const oidAudience = process.env.OIDC_AUDIENCE as string;
  const vpcId = process.env.VPC_ID;
  const securityGroup = process.env.SECURITY_GROUP || "default";
  const writeApiUrl = process.env.WRITE_API_URL;

  const vpc = vpcId ? ec2.Vpc.fromLookup(stack, "vpc", { vpcId }) : undefined;

  stack.setDefaultFunctionProps({
    environment: {
      APP_DEBUG: process.env.APP_DEBUG || "",
      DB_HOST: process.env.DB_HOST as string,
      DB_PORT: process.env.DB_PORT as string,
      DB_USERNAME: process.env.DB_USERNAME as string,
      DB_PASSWORD: process.env.DB_PASSWORD as string,
      DB_DATABASE: process.env.DB_DATABASE as string,
    },
    vpc: vpc,
    securityGroups: vpc
      ? [
          ec2.SecurityGroup.fromLookupByName(
            stack,
            "securityGroup",
            securityGroup,
            vpc
          ),
        ]
      : undefined,
    allowPublicSubnet: true,
  });

  const orderApi = new Function(stack, "orderApi", {
    handler: "app/src/handlers/orderApi.handler",
  });
  const warehouseApi = new Function(stack, "warehouseApi", {
    handler: "app/src/handlers/warehouseApi.handler",
  });
  const locationApi = new Function(stack, "locationApi", {
    handler: "app/src/handlers/locationApi.handler",
  });
  const propertyApi = new Function(stack, "propertyApi", {
    handler: "app/src/handlers/propertyApi.handler",
  });

  const packageApi = new Function(stack, "packageApi", {
    handler: "app/src/handlers/packageApi.handler",
  });

  const bagApi = new Function(stack, "bagApi", {
    handler: "app/src/handlers/bagApi.handler",
  });

  const deliveryRequestApi = new Function(stack, "deliveryRequestApi", {
    handler: "app/src/handlers/deliveryRequestApi.handler",
  });

  const api = new Api(stack, "api", {
    customDomain: domain
      ? {
          domainName: domain.replace("*", `${app.stage}-${app.name}`),
          cdk: {
            certificate: acm.Certificate.fromCertificateArn(
              stack,
              "certificate",
              certArn
            ),
          },
        }
      : undefined,
    authorizers: {
      oidc: {
        type: "jwt",
        jwt: {
          issuer: oidIssuer,
          audience: oidAudience.split(","),
        },
      },
    },
    defaults: {
      authorizer: "oidc",
    },
    routes: {
      "GET /": {
        function: orderApi,
        authorizer: "none",
      },
      "GET /orders": orderApi,
      "GET /warehouses": warehouseApi,
      "GET /locations": locationApi,
      "GET /properties": propertyApi,
      "GET /orders/{orderId}": orderApi,
      "GET /packages": packageApi,
      "GET /packages/{packageId}": packageApi,
      "GET /bags": bagApi,
      "GET /bags/{bagId}": bagApi,
      "GET /delivery-requests": deliveryRequestApi,
      "GET /delivery-requests/{deliveryRequestId}": deliveryRequestApi,
    },
  });

  if (writeApiUrl) {
    api.addRoutes(stack, {
      "POST /orders": { type: "url", url: `${writeApiUrl}/orders` },
      "PUT /orders/{orderId}": {
        type: "url",
        url: `${writeApiUrl}/orders/{orderId}`,
      },
      "POST /delivery-requests": {
        type: "url",
        url: `${writeApiUrl}/delivery-requests`,
      },
    });
  }

  stack.addOutputs({
    api: api.customDomainUrl || api.url,
  });
}
