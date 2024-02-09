import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getAllMedia(req, res) {
    try {
        const allMedia = await prisma.media.findMany();
        res.json(allMedia); // Send the retrieved records as a JSON response
    } catch (e) {
        console.error(e);
        res.status(500).send('An error occurred while fetching media records.');
    } finally {
        await prisma.$disconnect();
    }
}