import path from 'path'
import {
  SchemaRegistry as KafkaSchemaRegistry,
  SchemaType as KafkaSchemaType,
  readAVSCAsync
} from '@kafkajs/confluent-schema-registry'
import SchemaType from '../types/SchemaType'

export default class SchemaRegistry {

  private static _repo: Map<SchemaType, number> = new Map()
  private _registry: KafkaSchemaRegistry
  public static instance: SchemaRegistry = new SchemaRegistry("")

  public static async init(host: string, callback: () => void): Promise<void> {
    SchemaRegistry.instance._registry = new KafkaSchemaRegistry({ host })
    await SchemaRegistry.instance._registerTypes()
    callback()
  }

  private constructor(host: string) {
    this._registry = new KafkaSchemaRegistry({ host })
  }

  private async _registerSchemaType(type: SchemaType): Promise<number> {
    const schemaPath = path.join(__dirname, `./avro/${type}.avsc`)
    const schema = await readAVSCAsync(schemaPath)

    const { id } =  await this._registry.register({
      type: KafkaSchemaType.AVRO,
      schema: JSON.stringify(schema)
    })

    return id
  }

  private async _registerTypes() {
    const types = Object.values(SchemaType)

    await Promise.all(types.map(async (type) => {
      const typeId = await this._registerSchemaType(type)
      SchemaRegistry._repo.set(type, typeId)
    }))
  }

  public async encode(type: SchemaType, payload: Record<string, any>): Promise<Buffer> {
    const schemaId = SchemaRegistry._repo.get(type)

    if (!schemaId) {
      return Promise.reject()
    }

    return await this._registry.encode(schemaId, payload)
  }

  public async decode(payload: Buffer): Promise<any> {
    return await this._registry.decode(payload)
  }

}