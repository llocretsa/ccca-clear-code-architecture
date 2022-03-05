import OrderCode from '../../src/domain/entity/OrderCode'

describe('Código de Pedigo', () => {
  test('Deve cria um código de pedido', () => {
    const date = new Date('2022-03-02')
    const sequence = 1
    const orderCode = new OrderCode(date, sequence)
    const value = orderCode.value
    expect(value).toBe('202200000001')
  })
})
