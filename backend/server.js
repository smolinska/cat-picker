const express = require('express'),
    cors = require('cors'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const app = express();
const url = 'mongodb://localhost:27017/catsDb';
app.use(cors());

MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to db");

    // db.collection('cats').insertMany(cats, function(err, result) {
    //     assert.equal(err, null);
    //     console.log(`Inserted ${result.result.n} documents into the collection`);
    // });

    app.get('/cats', function (req, res) {
        db.collection('cats').find({}).toArray(function (err, results) {
            assert.equal(err, null);
            res.json({cats: results})
        })

    });

    app.listen(7000);

});


