import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";


/**
* Retrieves info if the user has completed profile and uploaded photos
* */

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    console.log(data);
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': Email
        Key: {
            userId: data.emailId,
        }
    };

    const result = await dynamoDb.get(params);
    if ( ! result.Item) {
        throw new Error("Item not found.");
    }

    // Return the retrieved item
    return result.Item;
});
