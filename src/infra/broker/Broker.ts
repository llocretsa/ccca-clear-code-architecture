import DomainEvent from './DomainEvens'
import Handler from './Handler'

export default class Broker {
  handlers: Handler[]

  constructor() {
    this.handlers = []
  }

  register(handler: Handler) {
    this.handlers.push(handler)
  }

  publish(event: DomainEvent) {
    for (const handler of this.handlers) {
      handler.handle(event)
    }
  }
}
