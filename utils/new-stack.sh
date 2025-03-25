#!/bin/bash

echo NEW STACK! 

read -p "Enter the name for a new stack:" stackName

cd ../lib

cat <<EOF >./$stackName.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class $stackName extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
 }
}
EOF
