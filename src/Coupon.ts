export default class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expiredDate?: Date
  ) { }

  isValid(today: Date = new Date()) {
    if (!this.expiredDate) return true
    return this.expiredDate.getTime() >= today.getTime()
  }

  isExpired(today: Date = new Date()) {
    return !this.isValid(today)
  }

  calculateDiscount(amount: number, today: Date = new Date()) {
    if (this.isExpired(today)) return 0
    return (amount * this.percentage) / 100
  }
}
