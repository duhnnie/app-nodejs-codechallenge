import path from 'path'
import {
  SchemaRegistry,
  SchemaType as KafkaSchemaType,
  readAVSCAsync
} from '@kafkajs/confluent-schema-registry'
import SchemaType from '../types/SchemaType'

export default class SchemaStore {

  private static _repo: Map<SchemaType, number> = new Map()
  public static instance: SchemaStore = new SchemaStore("")

  private _registry: SchemaRegistry

  public static async init(host: string): Promise<void> {
    SchemaStore.instance._registry = new SchemaRegistry({ host })
    await SchemaStore.instance._registerTypes()
  }

  private constructor(host: string) {
    this._registry = new SchemaRegistry({ host })
  }

  private async _registerSchemaType(type: SchemaType): Promise<number> {
    const schemaPath = path.join(__dirname, `./schema/${type}.avsc`)
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
      SchemaStore._repo.set(type, typeId)
    }))
  }

  public async encode(type: SchemaType, payload: Record<string, any>): Promise<Buffer> {
    const schemaId = SchemaStore._repo.get(type)

    if (!schemaId) {
      return Promise.reject()
    }

    return await this._registry.encode(schemaId, payload)
  }

  public async decode(payload: Buffer): Promise<any> {
    return await this._registry.decode(payload)
  }

}