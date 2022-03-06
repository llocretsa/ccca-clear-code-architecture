import GetOrders from '../../src/application/useCase/get_orders/GetOrders'
import PlaceOrder from '../../src/application/useCase/place_order/PlaceOrder'
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter'
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory'
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase'

describe('Fazer Pedidos', () => {
  let placeOrders: PlaceOrder
  let getOrders: GetOrders
  let ordersRepository: OrderRepositoryDatabase
  beforeEach(() => {
    const connection = PgPromiseConnectionAdapter.getInstance()
    ordersRepository = new OrderRepositoryDatabase(connection)
    const repositoryFactory = new DatabaseRepositoryFactory()
    placeOrders = new PlaceOrder(repositoryFactory)
    getOrders = new GetOrders(repositoryFactory)
  })

  afterEach(async () => {
    await ordersRepository.clear()
  })

  test('Deve obter todos os pedidos pelo código', async () => {
    const input = {
      cpf: '839.435.452-10',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 }
      ],
      date: new Date('2022-03-02'),
      coupon: 'VALE20'
    }
    await placeOrders.execute(input)
    const getOrdersOutput = await getOrders.execute()
    expect(getOrdersOutput.orders).toHaveLength(1)
  })
})
