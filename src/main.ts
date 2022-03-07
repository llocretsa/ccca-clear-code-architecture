import PgPromiseConnectionAdapter from './infra/database/PgPromiseConnectionAdapter'
import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory'
import ExpressAdapter from './infra/http/ExpressAdapter'
import RouteConfig from './infra/http/RouteConfig'

const HOST = 'http://localhost'
const PORT = 3000

const expressAdapter = new ExpressAdapter()
const connection = PgPromiseConnectionAdapter.getInstance()
const repositoryFactory = new DatabaseRepositoryFactory()
new RouteConfig(expressAdapter, repositoryFactory, connection)

expressAdapter.listen(PORT)
console.log(`Aplicação iniciadda em: ${HOST}:${PORT}`)
