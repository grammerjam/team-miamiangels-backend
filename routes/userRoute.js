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
    .patch(updateUserBookmarks)
    .get(getUserBookmarks)

export { router }