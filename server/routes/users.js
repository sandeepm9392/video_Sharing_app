import express from "express"
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe,
     update } from "../controllers/user.js"
import verifyToken from "../middleware/verifyToken.js"
const router = express.Router();

//Updating a user
router.put("/:id",verifyToken, update);

//deleting a user
router.delete("/:id",verifyToken, deleteUser);

//get a user
router.get("/find/:id",getUser);

//subcribe a channel or user
router.put("/sub/:id",verifyToken, subscribe);

//unsubscribe a channel or user
router.put("/unsub/:id",verifyToken, unsubscribe);

//like a video
router.put("/like/:videoId",verifyToken, like);

//dislike a video
router.put("/dislike/:videoId",verifyToken, dislike);

export default router;

