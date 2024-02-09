import { PrismaClient } from "@prisma/client";
import mediaData from '../data.json' assert { type: 'json' };
const prisma = new PrismaClient()

async function main() {
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
