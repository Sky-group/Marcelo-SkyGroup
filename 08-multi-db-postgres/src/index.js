const MongoDB = require('./db/strategies/mongodb')
const Postrgres = require('./db/strategies/postegre')
const ContextStrategy = require('./db/strategies/base/contextStrategy')

const contexStrategyMongoDB = new ContextStrategy (new MongoDB());
contexStrategyMongoDB.create() 

const contexTrategyPostgres = new ContextStrategy(new Postrgres());
contexTrategyPostgres.create();