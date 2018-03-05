const DocumentDBClient = require('documentdb').DocumentClient;
const config = require('../config');
const documentBuilder = require('./document-builder');
const argumentValidator = require('./argument-validator');

let param;

if (process.argv[2] === undefined) {
    console.log('Failure');
    process.exit(1);
} else {
    param = JSON.parse(process.argv[2]);
    argumentValidator.argumentValidator(param);
}

const collLink = `dbs/${config.databaseId}/colls/${config.collectionId}`;
const client = new DocumentDBClient(config.connection.endpoint, {
    masterKey: config.connection.authKey,
});

let transaction = documentBuilder.createTransactionDocument(param);
console.log(`The following transaction was included ${JSON.stringify(transaction)}`);
client.createDocument(collLink, transaction, (err, created) => {
    if (err) console.log(err);
});
