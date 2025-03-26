import * as cdk from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs'

export class FromScratch extends cdk.Stack {

    private stackSuffix : string; 
    public readonly bucketArn : string 

    constructor(scope : Construct, id: string, props? : cdk.StackProps){
        super(scope, id, props)
        this.initializeSuffix()

        const z = new Bucket(this, 'scratchBucket', {
            bucketName: `scratch-bucket-${this.stackSuffix}`,
            blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
            lifecycleRules: [{
                expiration: cdk.Duration.days(2)
            }]
        })

        this.bucketArn = z.bucketArn;

        new cdk.CfnOutput(this, 'bucketToExport', {
            value: z.bucketArn!,
            exportName: 'bucket-to-import'
        })

    }

    private initializeSuffix(){
        //const shortStackId = cdk.Fn.select(2, cdk.Fn.split('/', this.stackId))
        this.stackSuffix = cdk.Fn.select(4, cdk.Fn.split('-', this.stackId))
    }
}