const express = require('express'),
    cors = require('cors'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    bodyParser= require('body-parser');

const app = express();
const url = 'mongodb://localhost:27017/cats';
app.use(cors());
app.use(bodyParser.json())


MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to db");

    app.get('/cats', function (req, res) {
        db.collection('cats').find({}).toArray(function (err, results) {
            assert.equal(err, null);
            res.json({cats: results})
        })
    });

    app.post('/cats', function (req, res) {
        if (!req.body.url || !req.body.tags){
            res.status(400).send('Tags or url is not valid!');
            return
        }
        db.collection('cats').insert(req.body, function(err, result) {
            assert.equal(err, null);
            res.json("Ok!")
        });
    });
    app.listen(7000);
});
