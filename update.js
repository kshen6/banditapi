import * as dynamoDbLib from "./libs/dynamo-lib";
import {
  success,
  failure
} from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "banditposts",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      postId: event.pathParameters.id
    },
    UpdateExpression: "SET edited = true, subject = :subject, content = :content, category = :category, tags = :tags, attachment = :attachment, updatedAt = :updatedAt", //attributes to change
    // UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment ? data.attachment : null,
      ":content": data.content ? data.content : null,
      ":subject": data.subject ? data.subject : null,
      ":updatedAt": JSON.parse(JSON.stringify(new Date())),
      ":category": data.category ? data.category : null,
      ":tags": data.tags ? data.tags : null
    },
    ReturnValues: "ALL_NEW" //what is this???
  };

  try {
    await dynamoDbLib.call("update", params);
    callback(null, success({
      status: true
    }));
  } catch (e) {
    callback(null, failure({
      status: false
    }));
  }
}