import AppConfig from "@/config/AppConfig";
import ApiAdapter from "./apiAdapter";

export const networkApiAdapter = ApiAdapter(AppConfig.NETWORK_BASE_URL);
