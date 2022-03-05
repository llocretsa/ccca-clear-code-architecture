import PlaceOrder from './application/useCase/place_order/PlaceOrder'
import SimulateFreight from './application/useCase/simulate_freight/SimulateFreight'
import DefaultFreightCalculator from './domain/entity/DefaultFreightCalculator'
import PgPromiseConnectionAdapter from './infra/database/PgPromiseConnectionAdapter'
import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory'
import ExpressAdapter from './infra/http/ExpressAdapter'
import ItemRepositoryDatabase from './infra/repository/database/ItemRepositoryDatabase'

const HOST = 'http://localhost'
const PORT = 3000

const repositoryFactory = new DatabaseRepositoryFactory()

const expressAdapter = new ExpressAdapter()

expressAdapter.on('/orders', 'post', async (params: any, body: any) => {
  const placeOrder = new PlaceOrder(repositoryFactory)
  const input = body
  input.date = new Date(input.date)
  return await placeOrder.execute(input)
})

expressAdapter.on('/simulateFreight', 'post', async (params: any, body: any) => {
  const simulateFreight = new SimulateFreight(new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()), new DefaultFreightCalculator())
  const input = body
  return await simulateFreight.execute(input)
})

expressAdapter.listen(PORT)
console.log(`Aplicação iniciadda em: ${HOST}:${PORT}`)
