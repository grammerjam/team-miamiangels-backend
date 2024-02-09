import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserInfo(req, res) {
    // console.log(req)
    console.log("these are the params: " + req.query.userEmail)
    const userEmail = req.query.userEmail
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })
        if (!user) {
            await prisma.user.create({
                data: {
                    email: userEmail,
                }
            })
        }
        res.json(user);
    } catch (e) {
        console.error(e);
        res.status(500).send('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}