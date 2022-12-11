const db = require('../models')();
const crypt = require('../services/crypt');

const find_blockchain_by_id = async (id) => {
    const { Blockchains } = db.models;
    const blockchain = await Blockchains.findOne({
        where: {
            id,
        },
    });

    if (blockchain != null) {
        blockchain.dataValues.endpoint
            = crypt.decrypt(blockchain.dataValues.endpoint);
        blockchain.dataValues.privateKey
            = crypt.decrypt(blockchain.dataValues.privateKey);
    }

    return blockchain;
};

module.exports = {
    find_blockchain_by_id,
};
