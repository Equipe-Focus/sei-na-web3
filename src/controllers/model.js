/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const dao = require('../dao');
const services = require('../services');

exports.get_models = async (req, res) => {
    await dao.modelDAO.find_all_Model()
        .then(contract => {
            const vector = [];
            contract.forEach(element => {
                vector.push({
                    modelCode: element.id,
                    description: element.description,
                    attributes: element.attr,
                    modelName: element.modelName,
                    timestamp: element.created_at,
                });
            });

            if (vector.length == 0) {
                res.status(services.http.httpStatus.BAD_REQUEST).send(
                    services.http.httpMessage('SEM_MODELOS'),
                );
            } else {
                const result = {
                    returnCode: 'success',
                    models: vector,
                };

                return res.send({
                    ...result,
                });
            }
        });
};
