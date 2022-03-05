import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter'

describe('Conexão com o Banco de Dados', () => {
  test('Deve criar uma conexão com o banco de dados', async () => {
    const connection = new PgPromiseConnectionAdapter()
    const itemsData = await connection.query('select * from ccca.item', [])
    expect(itemsData).toHaveLength(6)
  })
})
