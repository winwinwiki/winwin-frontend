import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from "../../constants/dispatch";

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return { ...state, ...{ [action.payload.id]: action.payload.data } };
    case REMOVE_NOTIFICATION:
      let newState = Object.assign({}, state);
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
