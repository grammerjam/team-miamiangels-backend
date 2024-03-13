import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import fs from "fs";
import { router as mediaRoute } from "./routes/mediaRoute.js"
import { router as userRoute } from './routes/userRoute.js'
import { router as trendingRoute } from './routes/trendingRoute.js'

const app = express()
const PORT = process.env.PORT || 10000

const videoFileMap = {
    "alone": "videos/alone.mp4",
    "generate-pass": "videos/generate-pass.mp4",
    "get-post": "videos/get-post.mp4",
}

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    console.log('root file reached')
    res.send('Hello World!')
})

app.get("/videos/:filename", (req, res) => {
    console.log('root file reached')
    const fileName = req.params.filename;
    const filePath = videoFileMap[fileName]
    if (!filePath) {
        return res.status(404).send("File not found")
    }
    //fetch stats
    const stat = fs.statSync(filePath)
    //get size of file
    const fileSize = stat.size
    //get range
    const range = req.headers.range
    //make sure we have range header
    if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

        const chunksize = end - start + 1
        const file = fs.createReadStream(filePath, { start, end })
        const head = {
            'Content-Range': `bytes ${start} - ${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        }
        res.writeHead(206, head)
        file.pipe(res)
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        }
        res.writeHead(200, head)
        fs.createReadStream(filePath).pipe(res)
    }
})

app.use("/api/media", mediaRoute)
app.use("/api/users", userRoute)
app.use("/api/trending", trendingRoute)

app.listen(PORT, () => {
    console.log(`This server is running in port ${PORT}`)
})