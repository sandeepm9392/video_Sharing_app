import express from "express"
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js"
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

//creating /updating /searching a video from database

router.post("/",verifyToken,addVideo)

//update
router.put("/:id",verifyToken,updateVideo)
//delete
router.delete("/:id",verifyToken,deleteVideo)
//finding video
router.get("/find/:id",getVideo)
//trend
router.get("/trend",trend)
//explore
router.get("/random", random)
//subscribe
router.get("/sub",verifyToken,sub)
//recommended
router.get("/tags",getByTag)
//seach by query
router.get("/search",search)
//view count
router.put("/view/:id",addView)

export default router;