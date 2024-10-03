/* eslint-disable max-len */
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const dao = require('../../../dao');

const blockchainWeb = async (network) => {
    /*const blockchain = await dao.blockchainDAO.find_blockchain_by_id(network);
    privateKey = blockchain.dataValues.privateKey;
    endpoint = blockchain.dataValues.endpoint;

    const provider = new HDWalletProvider(privateKey, endpoint);
    const web3 = new Web3(provider);
    return web3;*/
    const blockchain = await dao.blockchainDAO.find_blockchain_by_id(network);
    
    const mnemonic = 'cliff carbon make all fox hybrid loan enroll they doll law axis';
    console.log(`Endpoint: ${blockchain.dataValues.endpoint}`);
    const provider = new HDWalletProvider({
        mnemonic: {
            phrase: mnemonic,
        },
        providerOrUrl: blockchain.dataValues.endpoint,
        chainId: blockchain.dataValues.chainId, // 44787 Chain ID da rede Alfajores
        numberOfAddresses: 5, // Número de contas a serem geradas
    }); 

    const web3 = new Web3(provider);
    return web3;
};

module.exports = {
    blockchainWeb,
};
