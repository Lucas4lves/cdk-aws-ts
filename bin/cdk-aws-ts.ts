#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkAwsTsStack } from '../lib/cdk-aws-ts-stack';
import { SecondStack } from '../lib/second-stack';
import { FromScratch } from '../lib/from-scratch';
import { HandlerStack } from '../lib/handlerStack'
import { BucketTagger } from './tagger';

const app = new cdk.App();
// new CdkAwsTsStack(app, 'CdkAwsTsStack', {
//   stackName: "cdk-test-stack",
//   tags: {
//     "iac": "true",
//     "squad": "devops"
//   }
//   /* If you don't specify 'env', this stack will be environment-agnostic.
//    * Account/Region-dependent features and context lookups will not work,
//    * but a single synthesized template can be deployed anywhere. */

//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */
//   // env: { account: '123456789012', region: 'us-east-1' },

//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });

// new SecondStack(app, 'SecondStack', {
//   stackName: "second-stack",
//   tags: {
//     "iac": "true",
//     "squad": "devops"
//   }
// });

const fc = new FromScratch(app, 'FromScratch', {
  stackName: 'from-scratch',
  tags: {
    "iac": "true",
    "squad": "devops"
  }
})

new HandlerStack(app, 'HandlerStack', {
  stackName: 'handler-stack',
  targetBucketArn: fc.bucketArn,
  tags: {
    "iac": "true",
    "squad": "devops"
  }
})

const enforceTags = new BucketTagger('level', 'test')
cdk.Aspects.of(app).add(enforceTags)