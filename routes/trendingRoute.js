import express from 'express';
import { getUserTrending, updateInterest } from '../controllers/trendingController.js';
const router = express.Router()


router
    .route('/')
    .get(getUserTrending)
    .patch(updateInterest)


export { router }