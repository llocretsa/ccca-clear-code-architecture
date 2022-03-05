import Item from './Item'

export default class FreightCalculator {
  static calculate(item: Item) {
    const freight = (1000 * item.getVolume() * (item.getDensity() / 100))
    const minFreight = 10
    return Math.max(minFreight, freight)
  }
}
