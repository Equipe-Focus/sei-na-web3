module.exports = async (server, controller, middleware, schemas) => {
    server
        .route('/contracts')
        .post(
            schemas
                .general_validation(schemas.contractDeploySchema),
            middleware.blockchain.check_blockchain(),
            middleware.blockchain.verify_active_write(),
            controller.contract.deploy_contract,
        );
};
