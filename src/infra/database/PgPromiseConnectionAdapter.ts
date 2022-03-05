import 'dotenv/config'
import pgp from 'pg-promise'
import Connection from './Connection'

export default class PgPromiseConnectionAdapter implements Connection {
  pgp: any
  static instance: PgPromiseConnectionAdapter

  private constructor() {
    const USER = String(process.env.DB_USER)
    const PASSWORD = String(process.env.DB_PASSWORD)
    const HOST = String(process.env.DB_HOST)
    const PORT = String(process.env.DB_PORT)
    const DATA_BASE = String(process.env.DB_DATA_BASE)

    this.pgp = pgp()(`postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATA_BASE}`)
  }

  static getInstance() {
    if (!PgPromiseConnectionAdapter.instance) {
      PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter()
    }
    return PgPromiseConnectionAdapter.instance
  }

  async query(statement: string, params: any[]): Promise<any> {
    return await this.pgp.query(statement, params)
  }
}
