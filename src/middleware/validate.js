import {z} from "zod";

export const validateReserve = (req, res, next) => {
    const schema = z.object({
        event_id: z.number().int().nonnegative(),
        user_id: z.string().min(1)
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten()});
    }
    req.body = parsed.data;
    next();
};