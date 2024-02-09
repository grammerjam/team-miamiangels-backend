const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const beyondEarth = await prisma.media.create({
        where: {},
        update: {},
        create: {
            title: 'Beyond Earth',
            tpath: '/assets/thumbnails/beyond-earth/regular/large.jpg',
            tpathTrending: '/assets/thumbnails/beyond-earth/trending/large.jpg',
            year: 2019,
            category: 'Movie',
            rating: 'PG',
            genre: ["Comedy", "Thriller"]

        }
    })
    const bottomGear = await prisma.media.create({
        where: {},
        update: {},
        create: {
            title: 'Bottom Gear',
            tpath: '/assets/thumbnails/bottom-gear/regular/large.jpg',
            tpathTrending: '/assets/thumbnails/bottom-gear/trending/large.jpg',
            year: 2021,
            category: 'TV Show',
            rating: 'PG',
            genre: ["Romance", "SciFi", "Action"]

        }
    })

    console.log({ beyondEarth, bottomGear })
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
