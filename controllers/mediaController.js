import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllMedia(req, res) {
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

export async function getAllMovies(req, res) {
    try {
        const allMovies = await prisma.media.findMany({
            where: {
                category: "Movie"
            }
        });
        res.json(allMovies);
    } catch (e) {
        console.error(e);
        res.status(500).send('An error occurred while fetching movie records.');
    } finally {
        await prisma.$disconnect();
    }
}

export async function getAllTVSeries(req, res) {
    try {
        const allTVSeries = await prisma.media.findMany({
            where: {
                category: "TvSeries"
            }
        });
        res.json(allTVSeries);
    } catch (e) {
        console.error(e);
        res.status(500).send('An error occurred while fetching movie records.');
    } finally {
        await prisma.$disconnect();
    }
}

export async function getMediaInfo(req, res) {
    const mediaId = req.params.mediaId
    // console.log(mediaId)
    if (!mediaId) {
        res.status(404).send("Media ID is invalid")
    }
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;

    if (!objectIdPattern.test(mediaId)) {
        // If the id does not match the pattern, return an error response
        return res.status(400).send({ error: 'Malformed ObjectId' });
    }
    try {
        // console.log('im in the try!!!')
        const mediaItem = await prisma.media.findUnique({
            where: {
                id: mediaId
            }
        })
        if (!mediaItem) {
            res.status(404).send("Media not found")
        }
        res.json(mediaItem)
    } catch (e) {
        res.status(404).send(e)
    } finally {
        await prisma.$disconnect();
    }
}