import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const req = await fetch("https://www.fruityvice.com/api/fruit/all"),
        res = await req.json();

    res.forEach(async (fruit: any) => {
        const { nutritions } = fruit
        delete fruit.nutritions

        return await prisma.fruit.create({

            data: {
                ...fruit,
                nutritions: {
                    create: nutritions
                }
            },

        })
    })

    console.log("Fruits table seeded")
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
