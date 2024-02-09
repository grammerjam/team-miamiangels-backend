import express from 'express';
// import { getAllMedia, getAllMovies, getAllTVSeries } from "../controllers/mediaController.js";
import { getUserInfo, createUser } from '../controllers/userController.js';
const router = express.Router()

router
    .route("/")
    .get(getUserInfo)
    .post(createUser)

export { router }