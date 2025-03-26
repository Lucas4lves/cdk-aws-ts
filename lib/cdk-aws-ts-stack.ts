import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration : number){
    super(scope, id);

    new Bucket(this, 'ThisIsaL3Bucket', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(expiration)
      }]
    })
  }
}

export class CdkAwsTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    /*
      PARAMETERS
    */

    const bucketName = new cdk.CfnParameter(this, 'bucketNameParam', {
      type: 'String',
      default: 'cdk-test-bucket'
    })

    const duration = new cdk.CfnParameter(this, 'duration', {
      type: 'Number',
      default: 1,
      maxValue: 10,
      minValue: 1
    })
    /**
     * ########################################################
     */
   const cfnBucket = new CfnBucket(this, 'cfnBucket', { 
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: duration.valueAsNumber,
          status: 'Enabled'
        }]
      }
    })
    
    // new cdk.CfnOutput(this, 'cfnBuckeName', {
    //   value: cfnBucket.bucketName!
    // })

    //scope/stack
    // new Bucket(this, 'ThisIsaL2Bucket', {
    //   lifecycleRules: [{
    //     expiration: cdk.Duration.days(2)
    //   }]
    // })

    // new L3Bucket(this, 'L3Bucket', 2)

  }
}