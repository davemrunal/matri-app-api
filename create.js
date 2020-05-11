import * as dynamoDbLib from './libs/dynamodb-lib';
import { failure, success } from './libs/response-lib';

export async function main(event, context) {
    const data = JSON.parse(event.body);
    console.log(data);
    console.log('now printing name');
    console.log(data.name);
    console.log(data.dob);


    const params = {
        TableName: process.env.tableName,
        Item: {
            name: data.name,
            dob: data.dob,
            caste: data.caste,
            gender: data.gender,
            country: data.country,
            region: data.region,
            city: data.city,
            phoneNumberCountry: data.phoneNumberCountry,
            phoneNumber: data.phoneNumber,
            userId: data.emailId,
            profileDetailsAdded: true,
            isPhotoUploaded: false,
            //userId: event.requestContext.identity.cognitoIdentityId,
            //profileId: uuid.v1(),
            //content: data.content,
            //attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call('put', params);
        return success(params.Item);
    } catch (e) {
        console.log(e);
        return failure({status: false});
    }
}