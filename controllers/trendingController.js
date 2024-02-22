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

export async function updateInterest(req, res) {
    const userEmail = req.query.email
    const interestObj = req.body.interestObj

    // obj = {
    //    interest: 1,
    //   genres: ["Action", "Adventure"]
    //  }

    try {
        // Update Genre Interest
        interestObj.genres.map(async (genre) => {
            await prisma.user.update({
                where: {
                    email: userEmail
                },
                data: {
                    genreInterest: {
                        update: {
                            [genre]: {
                                // If interest is 1, increment by 1, else increment by 0
                                increment: interestObj.interest
                            }
                        }
                    }
                }
            })

            res.status(200).json('User interest records updated successfully.');
        })
    }
    catch (e) {
        console.error(e);
        res.status(500).json('An error occurred while updating user interest records.');
    } finally {
        await prisma.$disconnect();
    }
}