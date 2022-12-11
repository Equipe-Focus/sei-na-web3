const middleware = require('../middlewares');
const schema = require('../schemas');
const controller = require('../controllers');

const contractRouter = require('./contract');
const documentRouter = require('./document');
const modelRouter = require('./model');

module.exports = async (server) => {
    contractRouter(server, controller, middleware, schema);
    modelRouter(server, controller);
    documentRouter(server, controller, middleware, schema);
};
