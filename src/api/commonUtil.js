import apiConfig from "../buildConfig/apiConfig";
//Temp
const url = "https://demo8782246.mockable.io";
const url1 = "https://demo4705881.mockable.io";

const serverUrl = apiConfig.protocol + "://" + apiConfig.host;

class CommonUtil {
  static createUrl(endPoints) {
    //Temp
    // return endPoints == '/program1' || endPoints == '/data-sets' || endPoints == '/sdgList' || endPoints == '/spiList' || endPoints == '/notes' ? (url1 + endPoints):(url + endPoints);
    return serverUrl + endPoints;
  }

  static createAuthUrl(endPoints, accessToken) {
    return serverUrl + endPoints + accessToken;
  }

  static getHeaders() {
    return {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers":
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      Accept: "application/json"
    };
  }

  static getToken() {
    let token = localStorage.getItem("_auth")
      ? localStorage.getItem("_auth").accessToken
      : null;
    return {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    };
  }

  static getAuthId() {
    let authId = localStorage.getItem("_auth")
      ? JSON.parse(localStorage.getItem("_auth")).accessToken
      : null;
    return {
      "user-auth-id": authId,
      "Content-Type": "application/json",
      Accept: "application/json"
    };
  }
}

export default CommonUtil;
