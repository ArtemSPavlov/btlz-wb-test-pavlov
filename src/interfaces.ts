export type Warehouse = {
  boxDeliveryAndStorageExpr: string,
  boxDeliveryBase: string,
  boxDeliveryLiter: string,
  boxStorageBase: string,
  boxStorageLiter: string,
  warehouseName: string
}

export type GetTariffsResponse = {
  response: {
    data: { warehouseList: Warehouse[] }
  }
}

export type TariffEntity = {
  id: number,
  validity_day: string,
  box_delivery_and_storage_expr: number,
  box_delivery_base: string,
  box_delivery_liter: string,
  box_storage_base: string,
  box_storage_liter: string,
  warehouse_name: string,
  created_at: string,
  updated_at: string
}

export type TariffToSheet = Omit<TariffEntity, 'id' | 'validity_day' | 'created_at' | 'updatet_at'>