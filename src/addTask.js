const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const middy = require('@middy/core');
const jsonBodyPraser = require('@middy/http-json-body-parser');

const addTask = async (event) => {

    try {

        const dynamodb = new AWS.DynamoDB.DocumentClient(); //configuramos conexion

        const { title, description } = event.body; //lo que recibimos del frontend, y convertimos a json
        const createdAt = new Date(); //fecha creaciónuy
        const id = v4(); //traemos un id que venga de la version 4

        const newTask = {
            id,
            title,
            description,
            createdAt,
            done: false
        }

        // //guardamos en la bd de aws
        await dynamodb.put({
            TableName: 'TaskTable', //tabla
            Item: newTask //lo que voy a guardar en la bd
        }).promise()

        return {
            status: 200,
            body: newTask,
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addTask: middy(addTask).use(jsonBodyPraser()) //analiza el addTask y lo parsea a event.body
}