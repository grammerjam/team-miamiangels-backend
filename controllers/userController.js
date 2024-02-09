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
    const userEmail = req.query.userEmail
    try {
            await prisma.user.create({
                data: {
                    email: userEmail,
                }
            })
        res.status(201).send("User successfully created");
    } catch (e) {
        console.error(e);
        res.status(500).send('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}