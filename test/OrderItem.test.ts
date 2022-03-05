import OrderItem from '../src/OrderItem'

describe('Criar Item do Pedido', () => {
  test('Deve criar o item do pedido', () => {
    const orderItem = new OrderItem(1, 1000, 10)
    expect(orderItem.getTotal()).toBe(10000)
  })
})
