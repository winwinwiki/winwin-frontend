import CommonUtil from './commonUtil';
import HandleError from './handleError';
export function api(url, method, body, isAuth) {
    let baseUrl = CommonUtil.createUrl(url);
    return new Promise((resolve, reject) => {
        //Temp
        // if (method == "GET") {
        //     fetch(baseUrl).then((response) => response.json())
        //     .then((responseJson) => resolve(HandleError.checkResponse(responseJson)))
        //     .catch((error) => reject(error));
        // } else{
        //     fetch(baseUrl, {
        //         method: method,
        //         body: body
        //     }).then((response) => response.json())
        //     .then((responseJson) => resolve(HandleError.checkResponse(responseJson)))
        //     .catch((error) => reject(error));
        // }
            
        if (method == "GET") {
            fetch(baseUrl, {
                method: method,
                headers: isAuth ? CommonUtil.getAuthId() : CommonUtil.getHeaders()
            })
                .then((response) => response.json())
                .then((responseJson) => resolve(HandleError.checkResponse(responseJson)))
                .catch((error) => reject(error));
        } else {
            fetch(baseUrl, {
                method: method,
                headers: isAuth ? CommonUtil.getAuthId() : CommonUtil.getHeaders(),
                body: body
            })
                .then((response) => response.json())
                .then((responseJson) => resolve(HandleError.checkResponse(responseJson)))
                .catch((error) => reject(error));
        }
    });
}