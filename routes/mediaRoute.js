import express from 'express';
import getAllMedia from "../controllers/mediaController.js";
const router = express.Router()

router
    .route("/")
    .get(getAllMedia)
// .post(emotionController.addEmotion);

// router
//     .route("/:id")
//     .get(emotionController.getEmotion);

export { router }