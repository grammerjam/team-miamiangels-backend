import express from 'express';
import { getWatchMoreVideos } from '../controllers/WatchMoreController.js';
const router = express.Router()


router
    .route('/')
    .get(getWatchMoreVideos)

export { router }