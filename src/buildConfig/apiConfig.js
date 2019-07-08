import { apiConfig as apiConfigDev } from "./apiConfig.dev";
import { apiConfig as apiConfigQa } from "./apiConfig.qa";
import { apiConfig as apiConfigStag } from "./apiConfig.stag";
import { apiConfig as apiConfigProd } from "./apiConfig.prod";
let apiConfig = apiConfigDev;
console.log("env=",process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  apiConfig = apiConfigDev;
}
if (process.env.NODE_ENV === "test") {
  apiConfig = apiConfigQa;
}
if (process.env.NODE_ENV === "staging") {
  apiConfig = apiConfigStag;
}

if (process.env.NODE_ENV === "production") {
  apiConfig = apiConfigProd;
}

export default apiConfig;
