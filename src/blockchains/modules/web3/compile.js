const path = require('path');
const fs = require('fs');
const solc = require('solc');

exports.compiler = (local, document) => {
    const contractPath = path.resolve(__dirname, local, document);
    const source = fs.readFileSync(contractPath, 'utf8');
    /*let complierInput = {
        language: 'Solidity',
        sources:
        {
            'focus.sol':
            {
                content: source
            }
        },
        settings:
        {
            optimizer:
            {
                enabled: true
            },
            outputSelection:
            {
                '*': {
                    '*': ['*']
                }
            }
        }
    };*/

    let compilerInput = {
        language: 'Solidity',
        sources: {
            'focus.sol': {
                content: source,
            },
        },
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
            evmVersion: 'istanbul', // Especifica a versão da EVM
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode'],
                },
            },
        },
    };
    var bytecode = null
    var interface = null

    var output = JSON.parse(solc.compile(JSON.stringify(compilerInput)));
    interface = JSON.stringify(output.contracts["focus.sol"]["Focus"].abi);
    bytecode = output.contracts["focus.sol"]["Focus"].evm.bytecode.object;

    return {
        interface,
        bytecode
    };
};
