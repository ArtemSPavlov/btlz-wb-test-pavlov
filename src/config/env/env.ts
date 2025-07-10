import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const cronregex = /^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/;

const envSchema = z.object({
    NODE_ENV: z.union([z.undefined(), z.enum(["development", "production"])]),
    POSTGRES_HOST: z.union([z.undefined(), z.string()]),
    POSTGRES_PORT: z
        .string()
        .regex(/^[0-9]+$/)
        .transform((value) => parseInt(value)),
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    APP_PORT: z.union([
        z.undefined(),
        z
            .string()
            .regex(/^[0-9]+$/)
            .transform((value) => parseInt(value)),
    ]),
    WB_API_TOKEN: z.string(),
    WB_TARIFF_JOB_CRONTAB: z
        .string()
        .regex(cronregex),
    GOOGLE_SHEETS_TARIFF_JOB_CRONTAB: z
        .string()
        .regex(cronregex),
    GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string(),
    GOOGLE_PRIVATE_KEY: z
        .string()
        .transform((value) => value.replace(/\\n/gm, "\n")),
    SPREAD_SHEETS_IDS: z.string(),
});

const env = envSchema.parse({
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
    APP_PORT: process.env.APP_PORT,
    WB_API_TOKEN: process.env.WB_API_TOKEN,
    WB_TARIFF_JOB_CRONTAB: process.env.WB_TARIFF_JOB_CRONTAB,
    GOOGLE_SHEETS_TARIFF_JOB_CRONTAB: process.env.GOOGLE_SHEETS_TARIFF_JOB_CRONTAB,
    GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    SPREAD_SHEETS_IDS: process.env.SPREAD_SHEETS_IDS,
});

export default env;
