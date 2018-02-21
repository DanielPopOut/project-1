"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const assert = require("assert");
class BdImplementation {
    constructor() {
        this.MongoClient = mongodb.MongoClient;
        // private url = 'mongodb://localhost:27017';
        this.url = 'mongodb://popout:popout@ds243768.mlab.com:43768/heroku_bn1503xf';
        this.dbName = 'myproject';
        this.insertDocuments = function (db, callback) {
            // Get the documents collection
            const collection = db.collection('documents');
            // Insert some documents
            collection.insertMany([
                { a: 1 }, { a: 2 }, { a: 3 }
            ], function (err, result) {
                assert.equal(err, null);
                assert.equal(3, result.result.n);
                assert.equal(3, result.ops.length);
                console.log("Inserted 3 documents into the collection");
                callback(result);
            });
        };
    }
    connect() {
        this.MongoClient.connect(this.url, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            // const db = client.db("loup");
            // cas mongodb en ligne, je n'ai qu'une base de données
            const db = client.db('heroku_bn1503xf');
            const myobj = { name: "Company Inc", address: "Highway 37" };
            db.collection('test').insertOne(myobj, function (err, result) {
                console.log(err);
            });
            // this.insertDocuments();
            // client.close();
        });
    }
    insertDocument(collectionName, req, res) {
        this.MongoClient.connect(this.url, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            // const db = client.db("loup");
            // cas mongodb en ligne, je n'ai qu'une base de données
            const db = client.db('heroku_bn1503xf');
            const objectToInsert = req.body;
            objectToInsert["creation"] = new Date();
            db.collection(collectionName).insertOne(req.body, function (err, result) {
                if (err) {
                    res.status(500).send();
                }
                else {
                    res.status(200).send("yeah c'est bon");
                }
            });
            // this.insertDocuments();
            // client.close();
        });
    }
    getDocument(collectionName, req, res) {
        this.MongoClient.connect(this.url, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            // const db = client.db("loup");
            // cas mongodb en ligne, je n'ai qu'une base de données
            const db = client.db('heroku_bn1503xf');
            db.collection(collectionName).find({}).toArray(function (err, result) {
                if (err)
                    throw err;
                console.log(result);
                res.status(200).send(result);
            });
            // this.insertDocuments();
            // client.close();
        });
    }
}
exports.BdImplementation = BdImplementation;
//# sourceMappingURL=bdImplementation.js.map