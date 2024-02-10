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
            res.status(404).send("No such user found")
        }
        res.json(user);
    } catch (e) {
        console.error(e);
        res.status(500).send('An error occurred while fetching media records.');
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
            res.status(201).send("User successfully created");
        } else {
            res.status(202).send("User already exists")
        }
    } catch (e) {
        console.error(e);
        res.status(500).send('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}

export async function getUserBookmarks(req, res) {
    const userEmail = req.body.email
    const mediaId = req.body.mediaId
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: userEmail
            },
            // update: {
            //     bookmarkIds: {
            //         push: mediaId
            //     }
            // },
            // create: {
            //     book
            // }
        })
        const userBookmarks = user.bookmarkIds
        let indexOfBookmark = userBookmarks.indexOf(mediaId)
        if (indexOfBookmark !== -1) {
            // console.log('you already got that bookmark partner')
            userBookmarks.splice(indexOfBookmark, 1)
        } else {
            // console.log('that is a new bookmark, oh yeah! ')
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
        res.status(200).send(userBookmarks)
    } catch (e) {
        console.error(e);
        res.status(500).send('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}