import express from 'express';
// import { getAllMedia, getAllMovies, getAllTVSeries } from "../controllers/mediaController.js";
import { getUserInfo, createUser, updateUserBookmarks, getUserBookmarks } from '../controllers/userController.js';
const router = express.Router()

router
    .route("/")
    .get(getUserInfo)
    .post(createUser)

router
    .route("/bookmarks")
    .get(getUserBookmarks)
    .post(updateUserBookmarks)

export { router }