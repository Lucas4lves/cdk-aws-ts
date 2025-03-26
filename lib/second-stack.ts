import * as cdk from 'aws-cdk-lib';
import { CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class SecondStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    new CfnBucket(this, 'zBucket', {
      lifecycleConfiguration: {
        rules: [
          {expirationInDays: 2,
            status: 'Enabled'
           }
        ]
      }
    })

 }
}    
    