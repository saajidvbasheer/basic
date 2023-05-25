const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var AWS = require("aws-sdk");

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
        "Name": { S: req.body.data.name},
        "rev_com": {S: req.body.data.age}

    };
    //define the table name and the PutItem command
    const tableName = "Review";
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

let awsConfig = {
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": "AKIARPG5VRWC53MRXO6M", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
let fetchOneByKey = function () {
    var params = {
        TableName: "Review",
        Key: {
            "user_id": 1
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("Review::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("Review::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
        }
    })
}


fetchOneByKey();