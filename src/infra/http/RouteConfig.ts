import OrderDAO from '../../application/dao/OrderDAO'
import SimulateFreight from '../../application/useCase/simulate_freight/SimulateFreight'
import DefaultFreightCalculator from '../../domain/entity/DefaultFreightCalculator'
import RepositoryFactory from '../../domain/factory/RepositoryFactory'
import GetOrderController from '../controller/GetOrderController'
import GetOrdersController from '../controller/GetOrdersController'
import PlaceOrderController from '../controller/PlaceOrderController'
import PgPromiseConnectionAdapter from '../database/PgPromiseConnectionAdapter'
import ItemRepositoryDatabase from '../repository/database/ItemRepositoryDatabase'
import Http from './Http'

export default class RouteConfig {
  constructor(
    http: Http,
    repositoryFactory: RepositoryFactory,
    orderDAO: OrderDAO
  ) {

    http.on('/orders', 'post', async (params: any, body: any) => {
      const placeOrderController = new PlaceOrderController(repositoryFactory)
      return placeOrderController.execute(params, body)
    })

    http.on('/simulateFreight', 'post', async (params: any, body: any) => {
      const simulateFreight = new SimulateFreight(new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()), new DefaultFreightCalculator())
      const input = body
      return await simulateFreight.execute(input)
    })

    http.on('/orders', 'get', async (params: any, body: any) => {
      const getOrdersController = new GetOrdersController(orderDAO)
      return getOrdersController.execute(params, body)
    })

    http.on('/orders/:code', 'get', async (params: any, body: any) => {
      const getOrderController = new GetOrderController(orderDAO)
      return getOrderController.execute(params, body)
    })
  }
}
