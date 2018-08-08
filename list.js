import * as dynamoDbLib from "./libs/dynamo-lib";
import {
  success,
  failure
} from "./libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "banditposts",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    callback(null, success(result.Items));
  } catch (e) {
    callback(null, failure({
      status: false
    }));
  }
}