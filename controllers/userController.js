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
    // console.log("this is the body" + req.body)
    const newUserEmail = req.body.email
    // console.log("this is the email" + newUserEmail)
    try {
        const newUser = await prisma.user.findUnique({
            where: {
                email: newUserEmail
            }
        })
        // console.log("user information" + newUser)
        if (!newUser) {
            await prisma.user.create({
                data: {
                    email: newUserEmail,
                }
            })
            res.status(201).send("User successfully created");
            // console.log(res)
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