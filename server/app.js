const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET','POST'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

const{ DynamoDBClient,PutItemCommand } = require("@aws-sdk/client-dynamodb");

//Set the AWS region and credentials
const REGION = 'ap-south-1';
const credentials = {
    secretAccessKey: '8EBLdTZX7eVi/wipdNIIeaEMf1odjGTMggZ+WZGh',
    accessKeyId: 'AKIARPG5VRWC53MRXO6M',
};
 //Create a DynamoDB client object
 const client = new DynamoDBClient({ region: REGION, credentials: credentials });

 app.post('/submit',(req,res) => {
    const timestamp =Date.now();
    const item = {
        "user_id" : { S: timestamp.toString()},
        "name": { S: req.body.data.name},
        "age": {S: req.body.data.age}

    };
    //define the table name and the PutItem command
    const tableName = "Details";
    const putItemCommand = new PutItemCommand({ TableName:tableName, Item: item});
    //Call theDynamoDB API to add the item to the table
    async function addItem() {
        try {
            const response = await client.send(putItemCommand);
            console.log("Item added successfully:",response);
        } catch(err) {
            console.error("Error adding item:",err);
        }
    }
    addItem();
})

app.listen(8080, () => {
        console.log('Server started on port 8080')
})