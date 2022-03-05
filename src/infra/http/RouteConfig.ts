import PlaceOrder from '../../application/useCase/place_order/PlaceOrder'
import SimulateFreight from '../../application/useCase/simulate_freight/SimulateFreight'
import DefaultFreightCalculator from '../../domain/entity/DefaultFreightCalculator'
import PgPromiseConnectionAdapter from '../database/PgPromiseConnectionAdapter'
import DatabaseRepositoryFactory from '../factory/DatabaseRepositoryFactory'
import ItemRepositoryDatabase from '../repository/database/ItemRepositoryDatabase'
import Http from './Http'

export default class RouteConfig {
  constructor(http: Http) {

    http.on('/orders', 'post', async (params: any, body: any) => {
      const repositoryFactory = new DatabaseRepositoryFactory()
      const placeOrder = new PlaceOrder(repositoryFactory)
      const input = body
      input.date = new Date(input.date)
      return await placeOrder.execute(input)
    })

    http.on('/simulateFreight', 'post', async (params: any, body: any) => {
      const simulateFreight = new SimulateFreight(new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()), new DefaultFreightCalculator())
      const input = body
      return await simulateFreight.execute(input)
    })
  }
}
