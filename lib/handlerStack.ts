import * as cdk from 'aws-cdk-lib'
import { Function as Lambda , Runtime, Code } from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'


export class HandlerStack extends cdk.Stack{
    constructor(scope: Construct, id: string, props? : cdk.StackProps){
        super(scope, id, props)
        const targetBucket = cdk.Fn.importValue('bucket-to-import')
        new Lambda(this, 'handler-lambda', {
            runtime: Runtime.NODEJS_22_X,
            handler: 'index.handler',
            code: Code.fromInline(`
                    exports.handler = async (e) => {
                        consonle.log("hi! " + process.env.TARGET_BUCKET)
                    }
                `),
            environment: {
                TARGET_BUCKET : targetBucket
            }
        })
    }
}