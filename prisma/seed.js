const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const beyondEarth = await prisma.media.create({
        where: {id: "1"},
        update: {},
        create: {
            title: 'Beyond Earth',
            thumbnail: '/assets/thumbnails/beyond-earth/regular/large.jpg',
            thumbnailTrending: '/assets/thumbnails/beyond-earth/trending/large.jpg',
            year: 2019,
            category: 'Movie',
            rating: 'PG',
            genre: ["Comedy", "Thriller"]

        }
    })
    const bottomGear = await prisma.media.create({
        where: { id: "2"},
        update: {},
        create: {
            title: 'Bottom Gear',
            thumbnail: '/assets/thumbnails/bottom-gear/regular/large.jpg',
            thumbnailTrending: '/assets/thumbnails/bottom-gear/trending/large.jpg',
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
