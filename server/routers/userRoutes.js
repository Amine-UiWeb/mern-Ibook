import { Router } from "express";
const router = Router()

import { toggleFavoriteBook } from "../controllers/userController.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";


router.post('/favorites/toggle', verifyJwt, toggleFavoriteBook)


export default router
