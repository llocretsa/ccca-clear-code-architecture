import Broker from './infra/broker/Broker'
import OrderDAODatabase from './infra/dao/OrderDAODatabase'
import PgPromiseConnectionAdapter from './infra/database/PgPromiseConnectionAdapter'
import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory'
import ExpressAdapter from './infra/http/ExpressAdapter'
import RouteConfig from './infra/http/RouteConfig'

const HOST = 'http://localhost'
const PORT = 3000

const expressAdapter = new ExpressAdapter()
const connection = PgPromiseConnectionAdapter.getInstance()
const orderDAO = new OrderDAODatabase(connection)
const repositoryFactory = new DatabaseRepositoryFactory()
const broker = new Broker()
new RouteConfig(expressAdapter, repositoryFactory, orderDAO, broker)

expressAdapter.listen(PORT)
console.log(`Aplicação iniciadda em: ${HOST}:${PORT}`)
