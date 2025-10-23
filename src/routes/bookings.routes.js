import { Router } from "express";
import { reserve } from "../controllers/bookings.controller.js";
import { validateReserve } from "../middleware/validate.js";

const router = Router();
router.post("/reserve", validateReserve, reserve);
export default router;
