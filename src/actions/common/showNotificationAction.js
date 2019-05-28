import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from "../../constants/dispatch";

const addNotification = (id, requestStatus) => {
  return { type: ADD_NOTIFICATION, payload: { id: id, data: requestStatus } };
};

const removeNotification = id => {
  return { type: REMOVE_NOTIFICATION, payload: id };
};

let nextNotificationId = 0;
export const showNotification = requestStatus => {
  return function(dispatch) {
    const id = nextNotificationId++;
    dispatch(addNotification(id, requestStatus));
    dispatch(removeNotification(id));
  };
};
