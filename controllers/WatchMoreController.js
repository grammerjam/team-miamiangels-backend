import { PrismaClient } from "@prisma/client";
import { scoreMedia } from "./trendingController";
const prisma = new PrismaClient();

export async function getWatchMoreVideos(req, res) {
    const userEmail = req.query.email
    const videoId = req.query.videoId

    try {
        const media = await prisma.media.findMany()

        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })
        const video = await prisma.media.findUnique({
            where: {
                id: videoId
            }
        })

        if (!user || !video) {
            let trending = []
            let indexes = new Set()
            for (let i = 0; i < 10; i++) {
                let index = Math.floor(Math.random() * media.length)
                while (indexes.has(index)) {
                    index = Math.floor(Math.random() * media.length)
                }
                trending.push(media[index])
            }
            return res.json(trending.slice(0, 10))
        }

        const userInterest = user.genreInterest
        const bookmarks = user.bookmarkIds

        const watchMoreMedia = media.map((media) => {
            if (bookmarks.includes(media.id)) {
                return {
                    score: -1,
                    ...media
                }
            }
            return {
                score: scoreMedia(userInterest, media.genre),
                ...media,
            }
        })

        function sortByScore(a, b) {
            return b.score - a.score
        }
        watchMoreMedia.sort(sortByScore)

        // Return Top 10
        res.json(watchMoreMedia.slice(0, 10))
    } catch (e) {
        console.error(e);
        res.status(500).json('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}