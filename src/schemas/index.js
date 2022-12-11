const contract = require('./contract');
const document = require('./document');
const other = require('./other');

module.exports = {
    ...contract,
    ...document,
    ...other,
};
