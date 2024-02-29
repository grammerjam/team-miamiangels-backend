import express from 'express';
import { getUserTrending} from '../controllers/trendingController.js';
const router = express.Router()


router
    .route('/')
    .get(getUserTrending)

export { router }