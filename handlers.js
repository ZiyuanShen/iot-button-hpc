const AWS = require('aws-sdk');

module.exports.invoke = function(event, context, callback) {

  const cloudformation = new AWS.CloudFormation();

  var params = {
    StackName: 'MYHPC', /* required */
    Capabilities: [
      'CAPABILITY_IAM'
    ],
    DisableRollback: false,
    NotificationARNs: [
      process.env.NOTIFICATION_ARN
    ],
    OnFailure: 'DELETE',
    Parameters: [
      {
        ParameterKey: 'AccessUsername',
        ParameterValue: 'alces',
        UsePreviousValue: false
      },
      {
        ParameterKey: 'AccessKeyName',
        ParameterValue: process.env.ACCESS_KEY_NAME,
        UsePreviousValue: false
      },
      {
        ParameterKey: ''
      }
    ],
    RoleARN: 'arn:aws:iam::'+process.env.AWS_ACCOUNT_ID+':role/startHPC',
    Tags: [
      {
        Key: 'client',
        Value: 'testing'
      }
    ],
    TemplateURL: process.env.TEMPLATE_URL,
    TimeoutInMinutes: 30
  };
  cloudformation.createStack(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

  callback(null, "HPC started");

   // Use callback() and return information to the caller.
};

module.exports.delete = function(event, context, callback) {
  const cloudformation = new AWS.CloudFormation();
  var params = {
    StackName: 'MY_HPC',
    RoleARN: 'arn:aws:iam::'+process.env.AWS_ACCOUNT_ID+':role/startHPC'
  };
  cloudformation.deleteStack(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
};