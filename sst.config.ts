import { SSTConfig } from "sst";
import { AppStack } from "./stacks/AppStack";
import { RemovalPolicy } from "aws-cdk-lib/core";

export default {
  config(_input) {
    return {
      name: "m6-agency-api",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "nodejs18.x",
      memorySize: '512 MB',
    })

    if (app.local) {
      app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY);
    }

    app.stack(AppStack, {id: 'app'});
  }
} satisfies SSTConfig;
