import IEventMessage from "./IEventMessage"

export type OnMessage = (message :IEventMessage ) => Promise<boolean>

export default interface IEventConsumer {

  connect(): Promise<void>
  subscribe(topic: string, fromBeginning: boolean): Promise<void>
  consume(onMessage: OnMessage): Promise<void>
  close(): Promise<void>

}
