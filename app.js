const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Elasticsearch
const { Client } = require('@elastic/elasticsearch');
const elasticClient = new Client({ node: 'http://localhost:9200' });

app.post('/user', (req, res) => {
  elasticClient.index({
    index: 'user',
    type: 'userType',
    body: req.body
  }, (err, response, status) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({
        message: 'OK POST'
      })
    }
  });
});

app.listen(3939, () => {
  console.log('up running on 3939');
});


