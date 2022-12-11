const modules = require('./modules');
const services = require('../services');

const deploy_contract = async (parameters) => modules.web3.deploy_contract(
    parameters,
);

const write_document = async (parameters) => modules.web3.write_document(
    parameters,
);

const read_document = async (parameters) => modules.web3.read_document(
    parameters,
);

const read_documents = async (parameters) => modules.web3.read_documents(
    parameters,
);

module.exports = {
    deploy_contract,
    write_document,
    read_document,
    read_documents,

};
