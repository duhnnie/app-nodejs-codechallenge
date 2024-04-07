export default interface IEventMessage {

  get key(): Buffer | null
  get value(): Buffer | null
  get offset(): number

}