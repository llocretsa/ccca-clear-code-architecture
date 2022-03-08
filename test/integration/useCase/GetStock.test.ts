import GetStock from '../../../src/application/useCase/get_strock/GetStock'
import SaveStock from '../../../src/application/useCase/save_stock/SaveStock'
import DatabaseRepositoryFactory from '../../../src/infra/factory/DatabaseRepositoryFactory'

describe('Obter o Estoque', () => {

  test('Deve obter o estoque de um item', async () => {
    const repositoryFactory = new DatabaseRepositoryFactory()
    const stockEntryRepository = repositoryFactory.createStockEntryRepository()
    await stockEntryRepository.clear()
    const saveStock = new SaveStock(repositoryFactory)
    const saveStockInputa = {
      idItem: 1,
      operation: 'in',
      quantity: 10
    }
    await saveStock.execute(saveStockInputa)
    const saveStockInputb = {
      idItem: 1,
      operation: 'out',
      quantity: 5
    }
    await saveStock.execute(saveStockInputb)
    const getStock = new GetStock(repositoryFactory)
    const total = await getStock.execute(1)
    expect(total).toBe(5)
    stockEntryRepository.clear()
  })
})
