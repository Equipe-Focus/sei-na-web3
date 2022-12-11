/* eslint-disable no-shadow */
/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const dao = require('../dao');
const blockchain = require('../blockchains');

exports.write_document = async (req, res) => {
    const {
        contract, idProcess, codEtapa, idModel, value, cid, chainId,
    } = req.body;
    const idBlockchain = `${contract.dataValues.blockchain}`;
    const parameters = {
        idBlockchain,
        idProcess,
        codEtapa,
        idModel,
        chainId,
        contract,
        value,
        cid,
    };

    result = await blockchain.write_document(parameters);
    return res
        .status(result.status)
        .send(result.message);
};

exports.read_document = async (req, res) => {
    const {
        idProcess, codEtapa, position, document, contract,
    } = req.body;

    const model = await dao.modelDAO.find_model(document.dataValues.idModel);
    const attributes = model.dataValues.attr.split(';');
    const idBlockchain = `${contract.dataValues.blockchain}`;
    const date = document.updated_at;
    const { address } = contract.dataValues;
    const parameters = {
        idBlockchain,
        idProcess,
        codEtapa,
        position,
        attributes,
        address,
        date,
    };
    result = await blockchain.read_document(parameters);
    return res
        .status(result.status)
        .send(result.message);
};

exports.read_documents = async (req, res) => {
    const {
        idProcess, codEtapa, document, contract,
    } = req.body;

    const idBlockchain = `${contract.dataValues.blockchain}`;
    const { address } = contract.dataValues;
    const parameters = {
        idBlockchain,
        idProcess,
        codEtapa,
        address,
    };
    result = await blockchain.read_documents(parameters);
    return res
        .status(result.status)
        .send(result.message);
};
