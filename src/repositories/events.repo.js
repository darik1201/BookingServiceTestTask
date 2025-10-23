export async function lockEventByID(client, eventID) {
    const q = `
        SELECT id, total_seats 
        FROM events
        WHERE id = $1 FOR UPDATE
    `;
    const res = await client.query(q, [eventID]);
    return res.rows[0] || null;
}