import GetOrder from '../../application/query/get_order/GetOrder'
import Connection from '../database/Connection'

export default class GetOrderController {

  constructor(
    readonly connection: Connection
  ) { }

  async execute(params: any, body: any) {
    const getOrder = new GetOrder(this.connection)
    const getOrderOutput = await getOrder.execute(params.code)
    return getOrderOutput
  }
}
