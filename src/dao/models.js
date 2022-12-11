const db = require('../models')();

const find_all_Model = () => {
    const { Models } = db.models;
    return Models.findAll({});
};
const find_model = (id) => {
    const { Models } = db.models;
    return Models.findOne({
        where: {
            id,
        },
    });
};

module.exports = {
    find_all_Model,
    find_model,

};
