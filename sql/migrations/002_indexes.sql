CREATE UNIQUE INDEX IF NOT EXISTS ux_bookings_event_user
  ON bookings (event_id, user_id);

CREATE INDEX IF NOT EXISTS ix_bookings_event_id
  ON bookings (event_id);
