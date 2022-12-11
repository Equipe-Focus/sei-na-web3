const db = require('../models')();

const create_document = (
    idProcess,
    codEtapa,
    idContract,
    idModel,
    values,
    cid,
    blockchain,
) => {
    const { Documents } = db.models;
    return Documents.create({
        idProcess,
        codEtapa,
        idContract,
        idModel,
        values,
        cid,
        blockchain,
    });
};

const find_document = (idProcess) => {
    const { Documents } = db.models;
    return Documents.findOne({
        where: {
            idProcess,
        },
    });
};

module.exports = {
    create_document,
    find_document,
};
