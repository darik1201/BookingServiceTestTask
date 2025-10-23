export function errorHandler(err, _req, res, _next) {
    if (err?.status) {
        return res.status(err.status).json({"error": err.message, code: err.code});
    }
    if (err?.code == "23505") {
        return res.status(409).json({error: "Already booked this event", code: "ALREADY_BOOKED"});
    }
    console.error(err);
    return res.status(500).json({error: "Internal Server Error"});
}