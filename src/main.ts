import ExpressAdapter from './infra/http/ExpressAdapter'
import RouteConfig from './infra/http/RouteConfig'

const HOST = 'http://localhost'
const PORT = 3000

const expressAdapter = new ExpressAdapter()

new RouteConfig(expressAdapter)

expressAdapter.listen(PORT)
console.log(`Aplicação iniciadda em: ${HOST}:${PORT}`)
