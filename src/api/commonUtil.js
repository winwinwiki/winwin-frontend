import {REACT_APP_API_SERVER} from "../buildConfig/apiConfig";
//Temp
const url = "https://demo8782246.mockable.io";
const url1 = "https://demo4705881.mockable.io";

const serverUrl = REACT_APP_API_SERVER;

class CommonUtil {
  static createUrl(endPoints) {
    //Temp
    // return endPoints == '/program1' || endPoints == '/data-sets' || endPoints == '/sdgList' || endPoints == '/spiList' || endPoints == '/notes' ? (url1 + endPoints):(url + endPoints);
    return serverUrl + endPoints;
  }

  static createAuthUrl(endPoints, accessToken) {
    return serverUrl + endPoints + accessToken;
  }

  static getHeaders(contentType) {
    return contentType
      ? {
          Accept: "application/json"
        }
      : {
          "Content-Type": "application/json",
          Accept: "application/json"
        };
  }

  static getToken(contentType) {
    let token = localStorage.getItem("_auth")
      ? localStorage.getItem("_auth").accessToken
      : null;
    return contentType
      ? {
          Authorization: "Bearer " + token
        }
      : {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        };
  }

  static getAuthId(contentType) {
    let authId = localStorage.getItem("_auth")
      ? JSON.parse(localStorage.getItem("_auth")).accessToken
      : null;
    return contentType
      ? {
          "user-auth-id": authId
        }
      : {
          "user-auth-id": authId,
          "Content-Type": "application/json",
          Accept: "application/json"
        };
  }
}

export default CommonUtil;
