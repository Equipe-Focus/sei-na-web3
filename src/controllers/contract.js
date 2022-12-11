/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const blockchain = require('../blockchains');
// validado
exports.deploy_contract = async (req, res) => {
    const { idBlockchain, chainId } = req.body;
    const parameters = {
        idBlockchain,
        chainId,
    };
    result = await blockchain.deploy_contract(parameters);
    return res
        .status(result.status)
        .send(result.message);
};
