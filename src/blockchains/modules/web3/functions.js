const { libs, utils, http } = require('../../../services');
const dao = require('../../../dao');
const web3Block = require('./config');
const compilation = require('./compile');
const { interface, bytecode } = compilation.compiler(
    'contracts',
    'focus.sol',
);

const deploy_contract = async (parameters) => {
    const {
        idBlockchain, chainId
    } = parameters;

    //Deploy do contrato.
    var deployedInstance = ''
    var address = ''
    try {
        var web3 = await web3Block.blockchainWeb(idBlockchain);
        var numberTransactions = await web3.eth.getTransactionCount(web3._provider.addresses[0]);
        var gas = await web3.eth.estimateGas({
            from: web3._provider.addresses[0],
            nonce: numberTransactions,
            data: bytecode
        });
        console.log(gas);
        gas += 0, 2 * gas
        gasPrice = await web3.eth.getGasPrice()
        const amount = await web3.eth.getBalance(web3._provider.addresses[0]);
        if (20 * gas * gasPrice > amount) {
            console.log('low gas')
            return result = {
                status: http.httpStatus.INTERNAL_SERVER_ERROR,
                message: http.httpMessage('ERRO_INTERNO_SERVIDOR')
            }
        }
        deployedInstance = await web3.eth.sendTransaction({
            from: web3._provider.addresses[0],
            gas: parseInt(gas),
            chainId,
            data: bytecode
        });
        getBlockHash = deployedInstance.blockHash;
        transaction = deployedInstance.transactionHash;
        address = deployedInstance.contractAddress;
    } catch (e) {
        console.log(e)
        return result = {
            status: http.httpStatus.INTERNAL_SERVER_ERROR,
            message: http.httpMessage('ERRO_INTERNO_SERVIDOR')
        }
    }

    //Inserção do contrato no BD.
    const key = libs.uniqid();
    await dao.contractDAO.create_contract(
        key,
        idBlockchain,
        address);
    console.log('Requisição de deploy concluída com sucesso');

    return result = {
        status: http.httpStatus.SUCCESS,
        message: {
            returnCode: 'success',
            contractDeployed: {
                idContract: key,
                address: address,
                ABI: JSON.parse(interface),
                bytecode: bytecode,
            },
        }
    }

};
const write_document = async (parameters) => {
    const {
        idBlockchain, idProcess, codEtapa, chainId, value, contract, idModel, cid
    } = parameters;

    //Instanciando o contrato a ser utilizado.
    address = contract.dataValues.address;
    var web3 = await web3Block.blockchainWeb(idBlockchain);
    const instance = new web3.eth.Contract(
        JSON.parse(interface),
        address,
    );
    const from = web3._provider.addresses[0];
    //Garante que somente o detentor do contrato chame a função.
    const proprietario = await instance.methods.proprietario().call();
    if (proprietario.toUpperCase() != from.toUpperCase()) {
        console.log('Apenas o proprietário do contrato pode executar essa função');
        return result = {
            status: http.httpStatus.UNAUTHORIZED,
            message: http.httpMessage('FALSO_PROPRIETARIO')
        }
    }

    //Realiza a escrita no contrato.
    let response = "";
    try {
        response = await instance.methods
            .insertDocument(idProcess, codEtapa, value, cid)
            .send({
                from,
                chainId,
                gas: 200000,
            });

    } catch (e) {
        console.log(e.message)
        return result = {
            status: http.httpStatus.INTERNAL_SERVER_ERROR,
            message: http.httpMessage('ERRO_INTERNO_SERVIDOR')
        }
    }

    //Inserção do documento no BD.
    await dao.documentDAO.create_document(
        idProcess,
        codEtapa,
        contract.dataValues.id,
        idModel,
        value,
        cid,
        idBlockchain,
    );
    var blockExplorer = await utils.get_block_explorer(idBlockchain, response.transactionHash);
    var ipfs = (cid != '')
        ? `https://ipfs.io/ipfs/${cid}`
        : 'no files added'
    var result = {
        status: http.httpStatus.SUCCESS,
        message: {
            returnCode: 'success',
            blockchain: `${idBlockchain}`,
            idProcess: idProcess,
            cid: cid,
            blockNumber: response.blockNumber,
            txId: response.transactionHash,
            blockExplorer,
            ipfs
        }
    }
    console.log('Requisição de escrita concluída com sucesso');

    return result;
};
const read_document = async (parameters) => {

    const {
        idBlockchain, idProcess, codEtapa, position, address, attributes, date
    } = parameters;

    //Instanciando o contrato a ser utilizado.
    var web3 = await web3Block.blockchainWeb(idBlockchain)
    const instance = await new web3.eth.Contract(
        JSON.parse(interface),
        address,
    );
    //Realizando a leitura das informações do contrato.
    var response = null;
    try {
        response = await instance.methods.readDocument(idProcess, codEtapa, position).call();
    } catch (error) {
        console.log('Falha na requisição de readDocument!', error);
        return result = {
            status: http.httpStatus.BAD_REQUEST,
            message: http.httpMessage('ERRO_INTERNO_SERVIDOR')
        }
    }
    result_values = response[0];
    result_cid = response[1];

    //Se o documento conter informações, prosseguir com a leitura.
    console.log('Requisição readDocument concluída com sucesso!');

    const object = {};
    attributes.forEach(function (k, i) {
        object[k] = result_values[i];
    });

    var ipfs = (result_cid != '')
        ? `https://ipfs.io/ipfs/${result_cid}`
        : 'no files added'
    return result = {
        status: http.httpStatus.SUCCESS,
        message: {
            returnCode: 'success',
            blockchain: `${idBlockchain}`,
            document: object,
            ipfs,
            timestamp: date,
        }
    }

};

const read_documents = async (parameters) => {

    const {
        idBlockchain, idProcess, codEtapa, address
    } = parameters;

    //Instanciando o contrato a ser utilizado.
    var web3 = await web3Block.blockchainWeb(idBlockchain)
    const instance = await new web3.eth.Contract(
        JSON.parse(interface),
        address,
    );
    //Realizando a leitura das informações do contrato.
    var response = null;
    try {
        response = await instance.methods.readDocuments(idProcess, codEtapa).call();
    } catch (error) {
        console.log('Falha na requisição de readDocument!', error);
        return result = {
            status: http.httpStatus.BAD_REQUEST,
            message: http.httpMessage('ERRO_INTERNO_SERVIDOR')
        }
    }
    
    console.log('Requisição readDocument concluída com sucesso!');
    objects = [];
    response.forEach(async doc => {
        result_values = doc[0];
        result_cid = doc[1];

        var ipfs = (result_cid != '')
            ? `https://ipfs.io/ipfs/${result_cid}`
            : 'no files added'
        objects.push({
            document: result_values,
            ipfs
        });
    });
    return result = {
        status: http.httpStatus.SUCCESS,
        message: {
            returnCode: 'success',
            blockchain: `${idBlockchain}`,
            documents: objects
        }
    }

};
module.exports = {
    deploy_contract,
    read_document,
    read_documents,
    write_document,
};








