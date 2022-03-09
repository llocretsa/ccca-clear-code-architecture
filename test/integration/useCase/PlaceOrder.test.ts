import OrderPlacedStockHandler from '../../../src/application/handler/OrderPlacedStockHandler'
import GetStock from '../../../src/application/useCase/get_strock/GetStock'
import PlaceOrder from '../../../src/application/useCase/place_order/PlaceOrder'
import Broker from '../../../src/infra/broker/Broker'
import PgPromiseConnectionAdapter from '../../../src/infra/database/PgPromiseConnectionAdapter'
import DatabaseRepositoryFactory from '../../../src/infra/factory/DatabaseRepositoryFactory'
import OrderRepositoryDatabase from '../../../src/infra/repository/database/OrderRepositoryDatabase'
import StockEntryRepositoryDatabase from '../../../src/infra/repository/database/StockEntryRepositoryDatabase'

describe('Fazer Pedido', () => {
  let placeOrder: PlaceOrder
  let getStock: GetStock
  let orderRepository: OrderRepositoryDatabase
  let stockEntryRepository: StockEntryRepositoryDatabase

  beforeEach(() => {
    const connection = PgPromiseConnectionAdapter.getInstance()
    orderRepository = new OrderRepositoryDatabase(connection)
    stockEntryRepository = new StockEntryRepositoryDatabase(connection)
    const repositoryFactory = new DatabaseRepositoryFactory()
    const broker = new Broker()
    broker.register(new OrderPlacedStockHandler(repositoryFactory))
    placeOrder = new PlaceOrder(repositoryFactory, broker)
    getStock = new GetStock(repositoryFactory)
  })

  afterEach(async () => {
    await orderRepository.clear()
    await stockEntryRepository.clear()
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

  test('Deve fazer um pedido e retirar do estoque', async () => {
    const input = {
      cpf: '839.435.452-10',
      orderItems: [
        { idItem: 4, quantity: 1 },
        { idItem: 5, quantity: 1 },
        { idItem: 6, quantity: 3 }
      ],
      date: new Date('2022-03-02')
    }
    await placeOrder.execute(input)
    const totala = await getStock.execute(4)
    const totalb = await getStock.execute(5)
    const totalc = await getStock.execute(6)
    expect(totala).toBe(-1)
    expect(totalb).toBe(-1)
    expect(totalc).toBe(-3)
  })
})
