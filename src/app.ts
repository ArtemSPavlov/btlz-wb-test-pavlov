import cron from 'node-cron';

import { migrate } from "#postgres/knex.js";
import env from "#config/env/env.js";
import { wbApiFetchTariffs } from '#jobs/wbApiFetchTariffs.js';
import { dailyTariffsToGoogleSheet } from '#jobs/dailyTariffsToGoogleSheet.js';

await migrate.latest();

console.log("All migrations have been run");

cron.schedule(env.WB_TARIFF_JOB_CRONTAB, wbApiFetchTariffs);
cron.schedule(env.GOOGLE_SHEETS_TARIFF_JOB_CRONTAB, dailyTariffsToGoogleSheet);

console.log("All jobs have been scheduled");
