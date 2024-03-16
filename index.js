import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

import { router as mediaRoute } from "./routes/mediaRoute.js"
import { router as userRoute } from './routes/userRoute.js'
import { router as trendingRoute } from './routes/trendingRoute.js'

const app = express()
const PORT = process.env.PORT || 10000

app.use(cors())
app.use(express.json())
app.use(ClerkExpressRequireAuth())

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(401).send('Unauthenticated!');
});

app.get('/', (req, res) => {
    console.log('root file reached')
    res.send('Hello World!')
})

app.use("/api/media", mediaRoute)
app.use("/api/users", userRoute)
app.use("/api/trending", trendingRoute)

app.listen(PORT, () => {
    console.log(`This server is running in port ${PORT}`)
})