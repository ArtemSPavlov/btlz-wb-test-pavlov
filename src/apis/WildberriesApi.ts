import axios, { Axios, AxiosResponse } from "axios";

import env from "#config/env/env.js";
import { GetTariffsResponse } from "#interfaces.js";

export class WildberriesApi {
  private readonly wb_api_token: string;
  private readonly axiosInstance: Axios;

  constructor(){
    this.wb_api_token = env.WB_API_TOKEN;
    this.axiosInstance = axios.create({
      baseURL: "https://common-api.wildberries.ru/api",
      headers: {
        Authorization: `Bearer ${this.wb_api_token}`,
      },
    });
  }

  public async getBoxesTarriffs(params: { date: string }): Promise<GetTariffsResponse> {
    const { date } = params;

    const { data } = await this.axiosInstance.get<GetTariffsResponse>(`/v1/tariffs/box`, {
      params: {
        date
      }
    });

    return data;
  }
}