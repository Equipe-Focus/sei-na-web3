const db = require('../models')();

const create_contract = (
    id,
    blockchain,
    address,
) => {
    const { Contracts } = db.models;
    return Contracts.create({
        id,
        blockchain,
        address,
    });
};

const find_contract_by_key = (idContract) => {
    const { Contracts } = db.models;
    return Contracts.findOne({
        where: {
            id: idContract,
        },
    });
};

module.exports = {
    create_contract,
    find_contract_by_key,
};
