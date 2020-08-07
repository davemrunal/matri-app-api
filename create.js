import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
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

        await dynamoDb.put(params);

        return params.Item;
    }
);