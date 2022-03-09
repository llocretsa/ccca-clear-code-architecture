import DomainEvent from './DomainEvens'

export default interface Handler {
  name: string
  handle(event: DomainEvent): void
}
