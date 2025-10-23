import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: Number(process.env.PORT || 3000),
    dbUrl: process.env.DATABASE_URL
};

if (!config.dbUrl) {
    throw new Error("DATABASE_URL is required");
}