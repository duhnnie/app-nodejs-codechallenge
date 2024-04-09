import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const transactionTypes = ['type A', 'type B', 'type C']

  transactionTypes.forEach(async (transactionType, index) => {
    await prisma.transactionType.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: transactionType
      }
    })
  })

  console.log(`database was seeded with transaction types: ${transactionTypes}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(`Error at seeding database: ${error}`, error)
    await prisma.$connect()
    process.exit(0)
  })