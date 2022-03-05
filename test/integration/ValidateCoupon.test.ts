import ValidateCoupon from '../../src/application/useCase/validate_coupon/ValidateCoupon'
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter'
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase'

describe('Validar Cupom de Desconto', () => {
	test('Deve validar um cupom de desconto', async function () {
		const connection = new PgPromiseConnectionAdapter()
		const couponRepository = new CouponRepositoryDatabase(connection)
		const validateCoupon = new ValidateCoupon(couponRepository)
		const isValid = await validateCoupon.execute('VALE20')
		expect(isValid).toBeTruthy()
	})
})
