import CommonUtil from "./commonUtil";
import { store } from "../index";
import { showNotification } from "../actions/common/showNotificationAction";
import { titleCase } from "../util/util";

export function api(url, method, body, isAuth, contentType) {
  let baseUrl = CommonUtil.createUrl(url);
  return new Promise((resolve, reject) => {
    function handleErrors(response) {
      if (!response.ok) {
        response
          .clone()
          .json()
          .then(json => {
            store.dispatch(
              showNotification({
                type: "ERROR",
                message: titleCase(
                  json.response || "Oops! Something went wrong."
                )
              })
            );
            reject(Error(json.response));
          });
      } else {
        handleNotifications(method);
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
        .then(responseJson => {
          resolve(responseJson);
        }) //resolve the above promise
        .catch(error => reject(error));
    }
  });
}

function handleNotifications(method) {
  switch (method) {
    case "DELETE":
      store.dispatch(
        showNotification({
          type: "SUCCESS",
          message: `Deleted successfully!`
        })
      );
      break;
    case "POST":
      store.dispatch(
        showNotification({
          type: "SUCCESS",
          message: `Created successfully!`
        })
      );
      break;
    case "PUT":
      store.dispatch(
        showNotification({
          type: "SUCCESS",
          message: `Updated successfully!`
        })
      );
      break;
    default:
      break;
  }
}
