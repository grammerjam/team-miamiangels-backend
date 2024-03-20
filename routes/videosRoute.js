import express from 'express';
import { getVideoData } from '../controllers/videosController.js';
const router = express.Router()

router
    .route("/:filename")
    .get(getVideoData)

export { router }