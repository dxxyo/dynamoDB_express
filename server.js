const express = require('express');
const AWS = require('aws-sdk');
const app = express();

AWS.config.update({
    accessKeyId: 'ASIA6GGICQZMY4RW44UF',
    secretAccessKey: '7/pHH8gRdLWlG1vbbL35iwk3H5DE6Swnq6EnUFbO',
    region: 'us-east-1' // e.g., 'us-east-1'
  });

const client = new AWS.DynamoDB.DocumentClient();
const tableName = 'iniDataBase';


// port on which the server listens
const port = 3000;

app.get("/rows/all", (req, res) => {
    var params = {
        TableName: tableName
    };

    client.scan(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var items = [];
            for (var i in data.Items)
                items.push(data.Items[i]['Name']);

            res.contentType = 'application/json';
            res.send(items);
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


