export function success(body) {
    console.log('Building response now');
    return buildResponse(200, body);
}

export function failure(body) {
    return buildResponse(500, body);
}

function buildResponse(statusCode, body) {
    console.log('biildingresponse');
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(body)
    };
}