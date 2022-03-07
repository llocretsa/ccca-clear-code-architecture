import GetOrders from '../../application/query/get_orders/GetOrders'
import Connection from '../database/Connection'

export default class GetOrdersController {

  constructor(
    readonly connetion: Connection
  ) { }

  async execute(params: any, body: any) {
    const getOrders = new GetOrders(this.connetion)
    const getOrdersOutput = await getOrders.execute()
    return getOrdersOutput
  }
}
