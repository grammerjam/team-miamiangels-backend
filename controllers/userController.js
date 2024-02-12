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
        const user = await prisma.user.findFirst({
            where: {
                email: userEmail
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
                bookmarkIds: userBookmarks
            }
        })
        res.status(200).json("Bookmarks updated successfully")
    } catch (e) {
        console.error(e);
        res.status(500).json('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}

export async function updateUserBookmarks2(req, res) {
    /*json looks like
    body :{
        email: email@gmail.com
        bookmarks: {
            movies: String[]
            tv-shows: String[]
        }
    }
    */
    const userEmail = req.body.email
    const userBookmarks = req.body.bookmarks
    try {
        const user = await prisma.user.update({
            where: {
                email: userEmail
            },
            data: {
                bookmarks: userBookmarks
            }
        })
        if (!user) {
            res.status(404).json("No user found")
        }
        res.status(200).json("Bookmarks updated successfully")
    } catch (e) {
        console.error(e);
        res.status(500).json('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}

export async function getUserBookmarks(req, res) {
    const userEmail = req.query.email
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: userEmail
            },
        })
        if (!user) {
            return res.status(404).json("Could not find user")
        }
        const userBookmarks = user.bookmarkIds
        const bookmarkedMediaListPromises = userBookmarks.map(async (mediaId) => {
            let foundMedia = await prisma.media.findFirst({
                where: {
                    id: mediaId
                }
            })
            // console.log(foundMedia)
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