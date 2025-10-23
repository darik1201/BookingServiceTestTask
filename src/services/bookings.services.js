import { pool } from "../db/pool.js";
import { lockEventByID } from "../repositories/events.repo.js";
import { hasUserBooking, countTaken, insertBooking } from "../repositories/bookings.repo.js";

class HttpError extends Error {
  constructor(status, message, code) { super(message); this.status = status; this.code = code; }
}

export async function reserveSeat({ event_id, user_id }) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const event = await lockEventByID(client, event_id);
    if (!event) throw new HttpError(404, "Event not found", "EVENT_NOT_FOUND");

    if (await hasUserBooking(client, event_id, user_id)) {
      throw new HttpError(409, "User already booked this event", "ALREADY_BOOKED");
    }

    const taken = await countTaken(client, event_id);
    if (taken >= event.total_seats) {
      throw new HttpError(409, "Event is sold out", "SOLD_OUT");
    }

    const booking = await insertBooking(client, event_id, user_id);
    if (!booking) {
      // редкая гонка, упали на уникальности
      throw new HttpError(409, "User already booked this event", "ALREADY_BOOKED");
    }

    await client.query("COMMIT");
    return booking;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
