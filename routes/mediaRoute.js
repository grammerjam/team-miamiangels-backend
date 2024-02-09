import express from 'express';
import { getAllMedia, getAllMovies, getAllTVSeries } from "../controllers/mediaController.js";
const router = express.Router()

router
    .route("/")
    .get(getAllMedia)
// .post(emotionController.addEmotion);

router
    .route("/movies")
    .get(getAllMovies);

router
    .route("/tv-series")
    .get(getAllTVSeries);

export { router }