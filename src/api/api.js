import { toast } from "react-toastify";
import CommonUtil from "./commonUtil";
import { store } from "../index";
import { showNotification } from "../actions/common/showNotificationAction";
import { titleCase } from "../util/util";

export function api(url, method, body, isAuth, contentType, timeout = 7000) {
  let baseUrl = CommonUtil.createUrl(url);
  return Promise.race([
    new Promise((resolve, reject) => {
      function handleErrors(response) {
        if (!response.ok) {
          response
            .clone()
            .json()
            .then(json => {
              const errMsg = json.response || "Oops! Something went wrong.";
              store.dispatch(
                showNotification({
                  type: toast.TYPE.ERROR,
                  message: titleCase(errMsg)
                })
              );
              reject(errMsg);
            });
        }
        else {
          handleNotifications(method);
          resolve(response.json());
        }
      }

      if (method.toUpperCase() === "GET") {
        fetch(baseUrl, {
          method: method,
          headers: isAuth
            ? CommonUtil.getAuthId(contentType)
            : CommonUtil.getHeaders(contentType)
        })
          .then(handleErrors)
          .catch(error => reject(error))
          //.then(responseJson => resolve(responseJson));
      } else {
        fetch(baseUrl, {
          method: method,
          headers: isAuth
            ? CommonUtil.getAuthId(contentType)
            : CommonUtil.getHeaders(contentType),
          body: body
        })
          .then(handleErrors) //return a promise
          .catch(error => reject(error))
          //.then(responseJson => resolve(responseJson));
      }
    })
    // new Promise((_, reject) =>
    //   setTimeout(() => reject(new Error("Connection Timeout!!")), timeout)
    // )
  ]);
}

function handleNotifications(method) {
  switch (method) {
    case "DELETE":
      store.dispatch(
        showNotification({
          type: toast.TYPE.SUCCESS,
          message: `Deleted successfully!`
        })
      );
      break;
    case "POST":
      store.dispatch(
        showNotification({
          type: toast.TYPE.SUCCESS,
          message: `Created successfully!`
        })
      );
      break;
    case "PUT":
      store.dispatch(
        showNotification({
          type: toast.TYPE.SUCCESS,
          message: `Updated successfully!`
        })
      );
      break;
    default:
      break;
  }
}
