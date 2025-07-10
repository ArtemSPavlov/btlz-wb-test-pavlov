import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from "google-spreadsheet";

import env from "#config/env/env.js";
import knex from "#postgres/knex.js";
import { getCurrentDay } from "#helpers/getCurrentDate.js";
import { TariffToSheet } from '#interfaces.js';

const SHEET_TITLE = "stocks_coefs";
const COLUMNS = [
  "box_delivery_and_storage_expr",
  "warehouse_name",
  "box_delivery_base",
  "box_delivery_liter",
  "box_storage_base",
  "box_storage_liter",
]


export async function dailyTariffsToGoogleSheet() {
  console.log(`${dailyTariffsToGoogleSheet.name} job started`);

  const spreadsheetIds = env.SPREAD_SHEETS_IDS.split(",");

  const rows = await knex<TariffToSheet>("tariffs")
    .where("validity_day", getCurrentDay())
    .select(...COLUMNS)
    .orderBy("box_delivery_and_storage_expr", "desc");

  const promises = spreadsheetIds.map((spreadsheetId) => updateSheet(spreadsheetId, rows));
  await Promise.all(promises);

  console.log(`${dailyTariffsToGoogleSheet.name} job completed`);
}

async function updateSheet(spreadsheetId: string, rows: TariffToSheet[]) {
  const serviceAccountAuth = new JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: env.GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);

  await doc.loadInfo();

  const sheet = doc.sheetsByTitle[SHEET_TITLE] ?? await doc.addSheet({
    title: SHEET_TITLE,
  });

  await sheet.clearRows();
  await sheet.setHeaderRow(COLUMNS);
  await sheet.addRows(rows);
}