const dao = require('../dao');
const services = require('../services');

const check_blockchain = () => async (req, res, next) => {
    const { idBlockchain } = req.body;
    const blockchain = await dao.blockchainDAO
        .find_blockchain_by_id(idBlockchain);
    if (blockchain == null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('BLOCKCHAIN_INEXISTENTE'));
    }
    next();
};

const check_contract = () => async (req, res, next) => {
    const { idContract } = req.body;
    const contract = await dao.contractDAO
        .find_contract_by_key(idContract);
    if (contract == null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('CONTRATO_INEXISTENTE'));
    }
    req.body.contract = contract;
    next();
};

const check_model = () => async (req, res, next) => {
    const { idModel } = req.body;
    const model = await dao.modelDAO
        .find_model(idModel);
    if (model == null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('MODELO_INEXISTENTE'));
    }
    req.body.model = model;
    next();
};

const check_document = () => async (req, res, next) => {
    const { idProcess, idContract } = req.body;
    const document = await dao.documentDAO
        .find_document(idProcess);
    if (document == null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('DOCUMENTO_INEXISTENTE'));
    }
    const contractDB = await dao.contractDAO
        .find_contract_by_key(idContract);
    if (contractDB == null) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('CONTRATO_INEXISTENTE'));
    }
    req.body.contract = contractDB;
    if (document.dataValues.idContract !== contractDB.dataValues.id) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send({ message: 'O contrato não possui esse documento.' });
    }
    req.body.document = document;
    next();
};

const check_attributes = () => async (req, res, next) => {
    const { model, value } = req.body;
    const attr = model.dataValues.attr.split(';');
    let { attrNotNull } = model.dataValues;
    if (attrNotNull == null) {
        attrNotNull = '';
    } else {
        attrNotNull = model.dataValues.attrNotNull.split(';');
    }

    const indexRequired = [];
    attr.forEach(element => {
        indexRequired.push(!attrNotNull.includes(element));
    });
    indexRequired[0] = true;
    indexRequired[1] = true;
    if (attr.length !== value.length) {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('ATRIBUTOS_INVALIDOS'));
    }
    for (let i = 0; i < value.length; i++) {
        if (value[i] == '' && indexRequired[i] == true) {
            return res
                .status(services.http.httpStatus.BAD_REQUEST)
                .send(services.http.httpMessage('ATRIBUTOS_INVALIDOS'));
        }
    }
    next();
};

const verify_active_write = () => async (req, res, next) => {
    const { idBlockchain, contract } = req.body;
    let idBlockchain_ = null;
    if (idBlockchain) {
        idBlockchain_ = idBlockchain;
    } else {
        idBlockchain_ = `${contract.dataValues.blockchain}`;
    }

    const blockchain = await dao.blockchainDAO.find_blockchain_by_id(idBlockchain_);
    const active = `${blockchain.dataValues.enableWrite}`;
    if (active == 'false') {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('BLOCKCHAIN_DESABILITADA'));
    }
    req.body.chainId = blockchain.dataValues.chainId;
    next();
};

const verify_active_read = () => async (req, res, next) => {
    const { contract } = req.body;
    const idBlockchain = `${contract.dataValues.blockchain}`;
    const blockchainDB = await dao.blockchainDAO.find_blockchain_by_id(idBlockchain);
    const active = `${blockchainDB.dataValues.enableRead}`;
    if (active == 'false') {
        return res
            .status(services.http.httpStatus.BAD_REQUEST)
            .send(services.http.httpMessage('BLOCKCHAIN_DESABILITADA'));
    }
    next();
};

const send_pinata = () => async (req, res, next) => {
    const {
        model, value,
    } = req.body;

    let cid = '';
    if (req.files.document) {
        fileCid = await services.pinata.file_ipfs(
            req.files.document.path,
        );
        cid = await services.pinata.metadata_ipfs(
            fileCid,
            model,
            value,
        );
    }
    req.body.cid = cid;
    next();
};

module.exports = {
    check_blockchain,
    check_contract,
    check_model,
    check_document,
    check_attributes,
    verify_active_write,
    verify_active_read,
    send_pinata,
};
