import knex from "#postgres/knex.js";
import { WildberriesApi } from "#apis/WildberriesApi.js";
import { getCurrentDay } from "#helpers/getCurrentDate.js";
import { wbCoefToFloat } from "#helpers/wbCoefToFloat.js";

export async function wbApiFetchTariffs() {
  console.log(`${wbApiFetchTariffs.name} job started`);

  const currentDay = getCurrentDay();
  const wildberriesApi = new WildberriesApi();

  const { response: { data } } = await wildberriesApi.getBoxesTarriffs({ date: currentDay });

  const boxesTariffs = data.warehouseList.map(({
    boxDeliveryAndStorageExpr,
    boxDeliveryBase,
    boxDeliveryLiter,
    boxStorageBase,
    boxStorageLiter,
    warehouseName,
  }) => ({
    box_delivery_and_storage_expr: Number.parseInt(boxDeliveryAndStorageExpr),
    box_delivery_base: wbCoefToFloat(boxDeliveryBase),
    box_delivery_liter: wbCoefToFloat(boxDeliveryLiter),
    box_storage_base: wbCoefToFloat(boxStorageBase),
    box_storage_liter: wbCoefToFloat(boxStorageLiter),
    warehouse_name: warehouseName,
    validity_day: currentDay,
    updated_at: new Date().toISOString(),
  }));

  await knex("tariffs")
    .insert(boxesTariffs)
    .onConflict(["warehouse_name", "validity_day"])
    .merge();

    console.log(`${wbApiFetchTariffs.name} job completed`);
}
