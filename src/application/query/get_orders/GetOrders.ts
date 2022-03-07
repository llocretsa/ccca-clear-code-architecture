import Connection from '../../../infra/database/Connection'
import GetOrdersOutput from './GetOrdersOutput'

export default class GetOrders {

  constructor(
    readonly connection: Connection
  ) { }

  async execute(): Promise<GetOrdersOutput> {
    const ordersData = await this.connection.query('select code, total::float from ccca.order', [])
    const getOrdersOutput = new GetOrdersOutput()
    for (const orderData of ordersData) {
      getOrdersOutput.addOrder(orderData.code, orderData.total)
    }
    return getOrdersOutput
  }
}
