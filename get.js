import * as dynamoDbLib from "./libs/dynamo-lib";
import {
  success,
  failure
} from "./libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "banditposts",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      postId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      callback(null, success(result.Item));
    } else {
      callback(null, failure({
        status: false,
        error: "post not found"
      }));
    }
  } catch (e) {
    callback(null, failure({
      status: false
    }));
  }
}