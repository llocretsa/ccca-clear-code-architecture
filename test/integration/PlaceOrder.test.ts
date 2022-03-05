import PlaceOrder from '../../src/application/useCase/place_order/PlaceOrder'
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter'
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase'
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase'
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase'

describe('Fazer Pedido', () => {
  let placeOrder: PlaceOrder
  let orderRepository: OrderRepositoryDatabase
  beforeEach(() => {
    const connection = new PgPromiseConnectionAdapter()
    const itemRepository = new ItemRepositoryDatabase(connection)
    orderRepository = new OrderRepositoryDatabase(connection)
    const couponRepository = new CouponRepositoryDatabase(connection)
    placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
  })

  afterEach(async () => {
    await orderRepository.clear()
  })

  test('Deve fazer um pedido', async () => {
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
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(138)
  })

  test('Deve fazer um pedido com calculo de frete', async () => {
    const input = {
      cpf: '839.435.452-10',
      orderItems: [
        { idItem: 4, quantity: 1 },
        { idItem: 5, quantity: 1 },
        { idItem: 6, quantity: 3 }
      ],
      date: new Date('2022-03-02')
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(6350)
  })

  test('Deve fazer um pedido com código', async () => {
    const input = {
      cpf: '839.435.452-10',
      orderItems: [
        { idItem: 4, quantity: 1 },
        { idItem: 5, quantity: 1 },
        { idItem: 6, quantity: 3 }
      ],
      date: new Date('2022-03-02')
    }
    const output = await placeOrder.execute(input)
    expect(output.code).toBe('202200000001')
  })
})
