import { Router } from "express";
import bookings from "./bookings.routes.js";
const router = Router();

router.use("/bookings", bookings);
router.get("/health", (_req, res) => res.json({ ok: true }));

export default router;
