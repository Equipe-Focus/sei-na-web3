const dotenv = require('dotenv');

dotenv.config();

const blockchain = require('./blockchain');
const model = require('./model');

const database = require('../models')();

const { models } = database;
const seed = process.argv[2];

switch (seed) {
case 'blockchain':
    blockchain(models);
    break;
case 'model':
    model(models);
    break;
default:
    console.log('seed não encontrado');
    break;
}
