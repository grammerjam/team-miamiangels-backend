import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserInfo(req, res) {
    const userEmail = req.query.userEmail
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })
        if (!user) {
            res.status(404).json("No such user found")
        }
        console.log(user)
        res.json(user);
    } catch (e) {
        console.error(e);
        res.status(500).json('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}

export async function createUser(req, res) {
    const newUserEmail = req.body.email
    try {
        const newUser = await prisma.user.findUnique({
            where: {
                email: newUserEmail
            }
        })
        if (!newUser) {
            await prisma.user.create({
                data: {
                    email: newUserEmail,
                    genreInterest: {
                        Horror: 0,
                        Comedy: 0,
                        Action: 0,
                        Romance: 0,
                        SciFi: 0,
                        Thriller: 0,
                        Crime: 0,
                        War: 0,
                    }
                }
            })
            res.status(201).json("User successfully created");
        } else {
            res.status(202).json("User already exists")
        }
    } catch (e) {
        console.error(e);
        res.status(500).json('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}

export async function updateUserBookmarks(req, res) {
    const userEmail = req.body.email
    const mediaId = req.body.mediaId
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            },
        })
        const media = await prisma.media.findUnique({
            where: {
                id: mediaId
            },
        })
        const userBookmarks = user.bookmarkIds
        let indexOfBookmark = userBookmarks.indexOf(mediaId)
        if (indexOfBookmark !== -1) {
            userBookmarks.splice(indexOfBookmark, 1)
        } else {
            userBookmarks.push(mediaId)
        }
        await prisma.user.update({
            where: {
                email: userEmail
            },
            data: {
                bookmarkIds: userBookmarks,
            }
        })

        // Update Genre Interest
        const mediaGenre = media.genre
        const userGenreInterest = user.genreInterest
        const updateGenreInterest = mediaGenre.map(async (genre) => {
            console.log(genre)
            console.log(userEmail)
            await prisma.user.update({
                where: {
                    email: userEmail
                },
                data: {
                    genreInterest: {
                        set: {
                            genre: genre,
                            count: userGenreInterest[genre] ? userGenreInterest[genre] + 1 : 1
                        }
                    }
                }
            })
        })
        await Promise.all(updateGenreInterest)

        console.log(media)
        console.log(user)
        res.status(200).json("Bookmarks updated successfully")
    } catch (e) {
        console.error(e);
        res.status(500).json('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}


// export async function updateUserBookmarks2(req, res) {
//     const userEmail = req.body.email
//     const userBookmarks = req.body.bookmarks
//     try {
//         const user = await prisma.user.update({
//             where: {
//                 email: userEmail
//             },
//             data: {
//                 bookmarks: userBookmarks
//             }
//         })
//         if (!user) {
//             res.status(404).json("No user found")
//         }
//         res.status(200).json("Bookmarks updated successfully")
//     } catch (e) {
//         console.error(e);
//         res.status(500).json('An error occurred while fetching media records.');
//     } finally {
//         await prisma.$disconnect();
//     }
// }

export async function getUserBookmarks(req, res) {
    const userEmail = req.query.email
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            },
        })
        // console.log(user)
        if (!user) {
            return res.status(404).json("Could not find user")
        }
        const userBookmarks = user.bookmarkIds
        const bookmarkedMediaListPromises = userBookmarks.map(async (mediaId) => {
            let foundMedia = await prisma.media.findUnique({
                where: {
                    id: mediaId
                }
            })
            foundMedia.isBookmarked = true;
            return foundMedia
        })
        const bookmarkedMediaList = await Promise.all(bookmarkedMediaListPromises);
        res.json(bookmarkedMediaList);
    } catch (e) {
        console.error(e);
        res.status(500).json('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}


export async function getUserTrending(req, res) {
    return -1
    // Get all media
    // Get user bookmarks
    // Content Filtering Matrix Algo
    // Heapify Based Content Filtering
    // Return Top 10

}