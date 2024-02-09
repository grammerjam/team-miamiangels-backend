import express from 'express';
// import { getAllMedia, getAllMovies, getAllTVSeries } from "../controllers/mediaController.js";
import { getUserInfo } from '../controllers/userController.js';
const router = express.Router()

router
    .route("/")
    .get(getUserInfo)

export { router }