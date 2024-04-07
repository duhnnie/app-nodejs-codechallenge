import IEventConsumer from "./IEventConsumer"
import IEventProducer from "./IEventProducer"

export default interface IEventStreamer {

    createProducer(): IEventProducer
    createConsumer(groupId: string): IEventConsumer

}
