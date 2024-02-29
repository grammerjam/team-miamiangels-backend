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

export async function getUserTrending(req, res) {
    const userEmail = req.query.email
    try {
        // Get all media
        const media = await prisma.media.findMany()

        // Get user bookmarks and user interest
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })
        // If there's no user, or if the user has no bookmarks, return 10 random media
        if (!user || user.bookmarkIds.length === 0) {
            let trending = []
            let indexes = new Set()
            for (let i = 0; i < 10; i++) {
                let index = Math.floor(Math.random() * media.length)
                indexes.add(index)
                while (indexes.has(index)) {
                    index = Math.floor(Math.random() * media.length)
                }

                trending.push(media[index])
            }

            return res.json(trending.slice(0, 10))
        }

        // Content Filtering Matrix Algo
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

        // Sort by score
        function sortByScore(a, b) {
            return b.score - a.score
        }
        trendingMedia.sort(sortByScore)

        // Return Top 10
        res.json(trendingMedia.slice(0, 10))
    } catch (e) {
        console.error(e);
        res.status(500).json('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}
