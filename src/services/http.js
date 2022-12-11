exports.httpStatus = Object.freeze({
    SUCCESS: 200,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
});

exports.httpMessage = function httpFactory(code, message) {
    switch (code) {
    case 'SEM_MODELOS':
        return {
            returnCode: 'success',
            code: 'SEM_MODELOS',
            message: 'Organização não possui modelos cadastrados!',
        };
    case 'FALSO_PROPRIETARIO':
        return {
            returnCode: 'failure',
            code: 'FALSO_PROPRIETARIO',
            message: 'Apenas o proprietario do contrato pode executar essa função.',
        };
    case 'BLOCKCHAIN_INEXISTENTE':
        return {
            returnCode: 'failure',
            code: 'BLOCKCHAIN_INEXISTENTE',
            message:
                    message || 'Uma blockchain com esse código não foi encontrada.',
        };
    case 'CONTRATO_INEXISTENTE':
        return {
            returnCode: 'failure',
            code: 'CONTRATO_INEXISTENTE',
            message:
                    message || 'Contrato com esta chave não foi encontrado.',
        };
    case 'MODELO_INEXISTENTE':
        return {
            returnCode: 'failure',
            code: 'MODELO_INEXISTENTE',
            message: message || 'O model requisitado é inexistente!',
        };
    case 'DOCUMENTO_INEXISTENTE':
        return {
            returnCode: 'failure',
            code: 'DOCUMENTO_INEXISTENTE',
            message:
                    message || 'Processo com esta chave não foi encontrado.',
        };
    case 'ATRIBUTOS_INVALIDOS':
        return {
            returnCode: 'failure',
            code: 'ATRIBUTOS_INVALIDOS',
            message:
                    message
                    || 'O vetor value possui uma quantidade inconsistente de atributos',
        };
    case 'BLOCKCHAIN_DESABILITADA':
        return {
            returnCode: 'failure',
            code: 'BLOCKCHAIN_DESABILITADA',
            message: 'Esta blockchain no momento está desabilitada',
        };
    case 'SINTAXE_INCONSISTENTE':
        return {
            returnCode: 'failure',
            code: 'SINTAXE_INCONSISTENTE',
            message: message || 'Sintaxe de requisição mal formada.',
        };
    default:
        return {
            returnCode: 'failure',
            code: 'ERRO_INTERNO_SERVIDOR',
            message:
                    'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',
        };
    }
};
