import app from "./api"
import SchemaRegistry from "./messageSchema/SchemaRegistry"
import SchemaType from "./types/SchemaType"

const port = process.env.PORT || 3000

const startApplication = async () => {
  // TODO: use env vars for schema registry url
  await SchemaRegistry.init("http://localhost:8081", () => {
    console.log("Schema registry initialized!")
  })

  app.listen(port, () => {
    console.log(`Transaction API listening at port ${port}`)
  })

  process.on("uncaughtException", async(err) => {
    console.log("Transaction service error:", err)
    process.exit(1)
  })
}

startApplication().then(() => {
  console.log("Transaction service is up and running!")
})
