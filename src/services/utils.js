/* eslint-disable radix */
/* eslint-disable no-plusplus */
const dao = require('../dao');

const get_block_explorer = async (network, address) => {
    const blockchainbd = await dao.blockchainDAO
        .find_blockchain_by_id(network);
    if (blockchainbd == null) {
        return 'not found';
    }
    const { linkExplorer } = blockchainbd.dataValues;
    return `${linkExplorer}/tx/${address}`;
};

function transform_to_standard(keys, values) {
    const attributes = [];
    for (let i = 0; i < keys.length; i++) {
        const object = {
            trait_type: keys[i],
            value: values[i],
        };
        attributes.push(object);
    }

    return attributes;
}

module.exports = {
    get_block_explorer,
    transform_to_standard,
};
