import StockEntry from '../../../src/domain/entity/StockEntry'

describe('Entrada no Estoque', () => {

  test('Deve criar uma entrada no estoque', () => {
    const stockEntry = new StockEntry(1, 'in', 10, new Date('2022-03-07T10:00:00'))
    expect(stockEntry.idItem).toBe(1)
    expect(stockEntry.operation).toBe('in')
    expect(stockEntry.quantity).toBe(10)
    expect(stockEntry.date).toEqual(new Date('2022-03-07T10:00:00'))
  })
})
