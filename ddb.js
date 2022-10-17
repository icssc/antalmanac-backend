var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLENAME = 'test-user-data-store-ddb'; // until I make changes to the AWS stack

function callback(err, data){
    if (err) {
        console.error("Error", err);
    } else {
        console.log('Success');
    }
}

async function getById(id) {
    var params = {
        TableName: TABLENAME,
        Key: {
            id: id
        }
    };

    const data = await documentClient.get(params, callback).promise();
    return data.Item
}

async function insertById(id, userData) {
    var params = {
        TableName: TABLENAME,
        Item: {
            id: id,
            userData: userData
        }
    };

    await documentClient.put(params, callback).promise();
}

module.exports = { getById, insertById }