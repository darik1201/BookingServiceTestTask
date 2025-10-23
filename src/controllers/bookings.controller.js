import { reserveSeat } from "../services/bookings.services.js";

export async function reserve(req, res, next) {
  try {
    const booking = await reserveSeat(req.body);
    res.status(201).json({ booking });
  } catch (e) {
    next(e);
  }
}
