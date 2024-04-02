import app from "./api"

const port = process.env.PORT || 3000

const startApplication = async () => {
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
