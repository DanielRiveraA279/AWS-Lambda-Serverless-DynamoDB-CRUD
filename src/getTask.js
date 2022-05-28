const AWS = require('aws-sdk');

const getTask = async (event) => {

    try {

        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters; //aqui recibimos el path de los parametros donde viene el id que le envia el frontend

        const result = await dynamodb.get({
            TableName: 'TaskTable',
            Key: {
                id
            }
        }).promise();

        const task = result.Item //en singular porque devuelve un solo registro

        return {
            status: 200,
            body: task
        }

    } catch (error) {

        console.log(error);

    }
}

module.exports = {
    getTask
}