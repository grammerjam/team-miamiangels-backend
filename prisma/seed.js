import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import mediaData from '../data.json' assert { type: 'json' };

async function main() {
  console.log(mediaData)
  mediaData.map(async (media) => {
    await prisma.media.create({
      data: {
        title: media.title,
        year: media.year,
        category: media.category,
        rating: media.rating,
        tpath: media.thumbnail.regular.large,
        tpathTrending: media.thumbnail.regular.large,
        genre: media.genre
      }
    })
  })
  // for (let i = 0; i < mediaData.length; i++) {

  // }
  // const beyondEarth = await prisma.media.create({
  //   data: {
  //     title: 'Beyond Earth',
  //     year: 2019,
  //     category: 'Movie',
  //     rating: 'PG',
  //     tpath: '/assets/thumbnails/beyond-earth/regular/large.jpg',
  //     tpathTrending: '/assets/thumbnails/beyond-earth/trending/large.jpg',
  //     genre: ["Comedy", "Thriller"]
  //   }
  // })
  // const bottomGear = await prisma.media.create({
  //   data: {
  //     title: 'Bottom Gear',
  //     year: 2021,
  //     category: 'TV Show',
  //     rating: 'PG',
  //     tpath: '/assets/thumbnails/bottom-gear/regular/large.jpg',
  //     tpathTrending: '/assets/thumbnails/bottom-gear/trending/large.jpg',
  //     genre: ["Romance", "SciFi", "Action"]
  //   }
  // })

  // console.log({ beyondEarth, bottomGear })
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
