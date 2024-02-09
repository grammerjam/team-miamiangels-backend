import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import { router as mediaRoute } from "./routes/mediaRoute.js"
import { router as userRoute } from './routes/userRoute.js'

const app = express()
const PORT = process.env.PORT || 10000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    console.log('root file reached')
    res.send('Hello World!')
})

app.use("/api/media", mediaRoute)
app.use("/api/users", userRoute)

app.listen(PORT, () => {
    console.log(`This server is running in port ${PORT}`)
})