module.exports = async (server, controller) => {
    server
        .route('/models')
        .get(
            controller.model.get_models,
        );
};
