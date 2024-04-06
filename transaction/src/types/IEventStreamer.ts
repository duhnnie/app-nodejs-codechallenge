import IEventConsumer from "./IEventConsumer"
import IEventProducer from "./IEventProducer"

export default interface IEventStreamer {

    createProducer<K, V>(): IEventProducer<K, V>

    createConsumer<K, V>(groupId: string): IEventConsumer<K, V>

}
