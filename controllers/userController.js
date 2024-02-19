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
                    genreInterest: [
                        { genre: "Horror", count: 0 },
                        { genre: "Comedy", count: 0 },
                        { genre: "Action", count: 0 },
                        { genre: "Romance", count: 0 },
                        { genre: "SciFi", count: 0 },
                        { genre: "Thriller", count: 0 },
                        { genre: "Crime", count: 0 },
                        { genre: "War", count: 0 },
                    ]
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
        
        const mediaGenre = media.genre
        mediaGenre.forEach(async (genre) => {
            await prisma.user.update({
                where: {
                    genreInterest:{
                        equals:{
                            genre: genre
                        }
                    } 
                },
                data: {
                    count: {
                        increment: 1
                    }
                }
            })
        })

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