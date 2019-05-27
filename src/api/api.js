import CommonUtil from "./commonUtil";
export function api(url, method, body, isAuth, contentType) {
  let baseUrl = CommonUtil.createUrl(url);
  return new Promise((resolve, reject) => {
    function handleErrors(response) {
      if (!response.ok) {
        response
          .clone()
          .json()
          .then(json => {
            reject(Error(json.response));
          });
      }
      return response.json();
    }

    if (method.toUpperCase() === "GET") {
      fetch(baseUrl, {
        method: method,
        headers: isAuth
          ? CommonUtil.getAuthId(contentType)
          : CommonUtil.getHeaders(contentType)
      })
        .then(handleErrors)
        .then(responseJson => resolve(responseJson))
        .catch(error => reject(error));
    } else {
      fetch(baseUrl, {
        method: method,
        headers: isAuth
          ? CommonUtil.getAuthId(contentType)
          : CommonUtil.getHeaders(contentType),
        body: body
      })
        .then(handleErrors) //return a promise
        .then(responseJson => resolve(responseJson)) //resolve the above promise
        .catch(error => reject(error));
    }
  });
}
