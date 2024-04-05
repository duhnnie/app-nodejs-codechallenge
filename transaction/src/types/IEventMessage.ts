export default interface IEventMessage<K, V> {

  get key(): K
  get value(): V
  get offset(): number
  get partition(): number

}