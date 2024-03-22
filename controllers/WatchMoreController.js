import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function scoreMedia(genreInterest, genres) {
    let score = 0
    const n = genres.length
    const scoreMod = 3 / n // If a movie has 3 genres, it will have a modifier of 3, if 1 it will have a modifier of 1 
    for (let i = 0; i < n; i++) {
        score += genreInterest[genres[i]] * scoreMod
    }
    return score
}

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

        const trendingMedia = media.map((media) => {
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

        function scoreWatchMoreMedia(videoGenres, genres) {
            let score = 0
            const n = genres.length
            const scoreMod = 3
            for (let i = 0; i < n; i++) {
                let genreIndex = videoGenres.indexOf(genres[i])
                if (genreIndex === -1) {
                    score += -1 * scoreMod
                } else {
                    score += 1 * scoreMod
                }
            }
            return score
        }

        const watchMoreMedia = media.map((media) => {
            if (media.id === video.id) {
                return {
                    score: -3,
                    ...media
                }
            }
            return {
                score: scoreWatchMoreMedia(video.genre, media.genre),
                ...media,
            }
        })

        function sortByScore(a, b) {
            return b.score - a.score
        }
        // trendingMedia.sort(sortByScore)
        watchMoreMedia.sort(sortByScore)
        trendingMedia.sort(sortByScore)

        let topFourWatchMoreMedia = watchMoreMedia.slice(0, 4)
        let topTrendingMedia = trendingMedia[0]
        let top2TrendingMedia = trendingMedia[1]
        let nextFourWatchMedia = watchMoreMedia.slice(4, 8)
        let combinedMedia = [...topFourWatchMoreMedia, topTrendingMedia, ...nextFourWatchMedia, top2TrendingMedia]

        // Return Top 10
        res.json(combinedMedia)
    } catch (e) {
        console.error(e);
        res.status(500).json('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}