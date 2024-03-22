import express from 'express';
import { getAllMedia, getAllMovies, getAllTVSeries, getMediaInfo } from "../controllers/mediaController.js";
const router = express.Router()

router
    .route("/")
    .get(getAllMedia)

router
    .route("/movies")
    .get(getAllMovies);

router
    .route("/tv-series")
    .get(getAllTVSeries);

router
    .route("/:mediaId")
    .get(getMediaInfo)

export { router }