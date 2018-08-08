import * as dynamoDbLib from "./libs/dynamo-lib";
import {
  success,
  failure
} from "./libs/response-lib";

export async function main(event, context, callback) {
  //http request parameters as JSON in event.body
  const data = JSON.parse(event.body);
  const params = {
    TableName: "banditposts",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId, //federated ID
      postId: JSON.parse(JSON.stringify(new Date())), //a.k.a. created at
      // subject: data.subject,
      content: data.content,
      attachment: data.attachment,
      edited: false,
      updatedAt: JSON.parse(JSON.stringify(new Date())),
      // category: data.category,
      // tags: data.tags
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({
      status: false
    }));
  }
}