import axios from 'axios'
import PlaceOrder from '../../src/application/useCase/place_order/PlaceOrder'
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter'
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory'
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase'

describe('API', () => {
  let placeOrders: PlaceOrder
  let ordersRepository: OrderRepositoryDatabase

  beforeEach(() => {
    const connection = PgPromiseConnectionAdapter.getInstance()
    ordersRepository = new OrderRepositoryDatabase(connection)
    const repositoryFactory = new DatabaseRepositoryFactory()
    placeOrders = new PlaceOrder(repositoryFactory)
  })

  afterEach(async () => {
    await ordersRepository.clear()
  })
  test('Deve testar a API /orders (POST)', async () => {
    const response = await axios({
      url: 'http://localhost:3000/orders',
      method: 'post',
      data: {
        cpf: '839.435.452-10',
        orderItems: [
          { idItem: 1, quantity: 1 },
          { idItem: 2, quantity: 1 },
          { idItem: 3, quantity: 3 }
        ],
        date: new Date('2022-03-02'),
        coupon: 'VALE20'
      }
    })
    const order = response.data
    expect(order.total).toBe(138)
  })

  test('Deve testar a API /simulateFreight (POST)', async () => {
    const response = await axios({
      url: 'http://localhost:3000/simulateFreight',
      method: 'post',
      data: {
        items: [
          {
            idItem: 4,
            quantity: 1
          },
          {
            idItem: 5,
            quantity: 1
          },
          {
            idItem: 6,
            quantity: 3
          }
        ]
      }
    })
    const output = response.data
    expect(output.amount).toBe(260)
  })

  test('Deve testar a API /orders (GET)', async () => {
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
    const response = await axios({
      url: 'http://localhost:3000/orders',
      method: 'get'
    })
    const orders = response.data
    expect(orders.orders).toHaveLength(1)
  })
})
