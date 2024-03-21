import express from 'express';
import 'dotenv/config'
import cors from 'cors';
// import fs from "fs";
import { router as mediaRoute } from "./routes/mediaRoute.js"
import { router as userRoute } from './routes/userRoute.js'
import { router as trendingRoute } from './routes/trendingRoute.js'
import { router as videosRoute } from './routes/videosRoute.js'
import { router as watchMoreRoute } from './routes/videosRoute.js'
import AWS from 'aws-sdk';

const app = express()
const PORT = process.env.PORT || 10000

// s3.createBucket({
//     Bucket: process.env.BUCKET_NAME
// }, (err, success) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log("this is a success msg: " + success)
// })

// s3.listBuckets(function (err, data) {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data.Buckets);
//     }
// });



// s3.listObjects(bucketParams, function (err, data) {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data);
//     }
// });

const videoFileMap = {
    "alone": "videos/alone.mp4",
    "airport": "videos/airport.mp4",
    "forest": "videos/forest.mp4",
    "winterDriving": "videos/winterDriving.mp4",
    "butterflies": "videos/butterflies.mp4",
    "fireBurning": "videos/fireBurning.mp4",
    "zombie": "videos/zombie.mp4",
}

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    console.log('root file reached')
    res.send('Hello World!')
})

app.use("/api/media", mediaRoute)
app.use("/api/users", userRoute)
app.use("/api/trending", trendingRoute)
app.use("/api/watchMore", watchMoreRoute)
app.use("/videos", videosRoute)

app.listen(PORT, () => {
    console.log(`This server is running in port ${PORT}`)
})