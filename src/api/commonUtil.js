import {REACT_APP_API_SERVER} from "../buildConfig/apiConfig";
import {getFromLocalStorage} from '../util/util';
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
          "Accept": "application/json"
        }
      : {
          "Content-Type": "application/json",
          "Accept": "application/json"
        };
  }

  static getToken(contentType) {
    let token = getFromLocalStorage("_auth", 'accessToken');
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
    let authId = getFromLocalStorage("_auth", 'accessToken');
    return contentType
      ? {
          "user-auth-id": authId
        }
      : {
          "user-auth-id": authId,
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Cache-Control":"private, must-revalidate, max-age=300"
        };
  }
}

export default CommonUtil;
