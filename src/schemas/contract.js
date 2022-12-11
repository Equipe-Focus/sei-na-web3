const services = require('../services');
// eslint-disable-next-line consistent-return

const contractDeploySchema = services.libs.yup.object().shape({
    idBlockchain: services.libs.yup.string().strict().min(1).required(),
});

module.exports = {
    contractDeploySchema,
};
