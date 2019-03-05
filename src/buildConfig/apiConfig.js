import { apiConfig as apiConfigDev } from "./apiConfig.dev";
import { apiConfig as apiConfigQa } from "./apiConfig.qa";
import { apiConfig as apiConfigProd } from "./apiConfig.prod";
let apiConfig = apiConfigProd;
if (process.env.NODE_ENV === "development") {
  apiConfig = apiConfigDev;
}
if (process.env.NODE_ENV === "test") {
  apiConfig = apiConfigQa;
}
if (process.env.NODE_ENV === "production") {
  apiConfig = apiConfigProd;
}

export default apiConfig;
