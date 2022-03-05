import RepositoryFactory from '../../domain/factory/RepositoryFactory'
import CouponRepository from '../../domain/repository/CouponRepository'
import ItemRepository from '../../domain/repository/ItemRepository'
import OrderRepository from '../../domain/repository/OrderRepository'
import PgPromiseConnectionAdapter from '../database/PgPromiseConnectionAdapter'
import CouponRepositoryDatabase from '../repository/database/CouponRepositoryDatabase'
import ItemRepositoryDatabase from '../repository/database/ItemRepositoryDatabase'
import OrderRepositoryDatabase from '../repository/database/OrderRepositoryDatabase'

export default class DatabaseRepositoryFactory implements RepositoryFactory {

  constructor() { }
  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
  }
  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
  }
  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
  }
}
