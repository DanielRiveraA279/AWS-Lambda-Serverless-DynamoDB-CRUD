const AWS = require('aws-sdk');

const updateTask = async (event) => {

    try {

        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters; //capturamos id por parametro
        const { done, title, description } = JSON.parse(event.body); //capturamos los datos que nos envia el frontend por body

        await dynamodb.update({
            TableName: 'TaskTable',
            Key: { id },
            UpdateExpression: 'set done = :done, title = :title, description = :description', //si done vienve true, la expresion quiere decir vas a setear el valor done a true
            ExpressionAttributeValues: {
                ':done': done,
                ':title': title,
                ':description': description
            },
            ReturnValues: 'ALL_NEW',
        }).promise();

        return {
            status: 200,
            body: JSON.stringify(
                {
                    message: 'Task updated successfully'
                }
            )
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    updateTask
}