export async function hasUserBooking(client, eventID, userID) {
    const r = await client.query(`
        SELECT 1
        FROM bookings
        WHERE event_id = $1 AND user_id = $2
        `,
        [eventID, userID]
    );
    return r.rowCount > 0;
}

export async function countTaken(client, eventID) {
    const r = await client.query(`
        SELECT COUNT(*)::int AS cnt
        FROM bookings
        WHERE event_id = $1
        `,
        [eventID]
    );
    return r.rows[0].cnt;
}

export async function insertBooking(client, eventId, userId) {
  const r = await client.query(
    `INSERT INTO bookings (event_id, user_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING
     RETURNING id, event_id, user_id, created_at`,
    [eventId, userId]
  );
  return r.rows[0] || null;
}
