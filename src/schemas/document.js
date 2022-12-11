const services = require('../services');
// eslint-disable-next-line consistent-return

const writeSchema = services.libs.yup.object().shape({
    idContract: services.libs.yup.string().strict().min(1).required(),
    idProcess: services.libs.yup.string().strict().min(1).required(),
    codEtapa: services.libs.yup.string().strict().min(1).required(),
    idModel: services.libs.yup.string().strict().min(1).required(),
    value: services.libs.yup.array().strict()
        .of(services.libs.yup.lazy(value => (typeof value === 'string' ?
            services.libs.yup.string()
            : services.libs.yup.string().required()
        )))
        .required(),
});

const readSchema = services.libs.yup.object().shape({
    idProcess: services.libs.yup.string().strict().min(1).required(),
    idContract: services.libs.yup.string().strict().min(1).required(),
    codEtapa: services.libs.yup.string().strict().min(1).required(),
    position: services.libs.yup.string().strict().min(1).required(),
});

const readocsSchema = services.libs.yup.object().shape({
    idProcess: services.libs.yup.string().strict().min(1).required(),
    idContract: services.libs.yup.string().strict().min(1).required(),
    codEtapa: services.libs.yup.string().strict().min(1).required(),
});

module.exports = {
    writeSchema,
    readSchema,
    readocsSchema,
};
