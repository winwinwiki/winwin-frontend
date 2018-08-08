import { ADD_APP_NAVIGATION, REMOVE_APP_NAVIGATION} from '../../constants/dispatch';

export const addToAppNavigation = (newLocation) => {
    return dispatch => {
        dispatch(addAppNavigation(newLocation))
    }
}

export const removeFromAppNavigation = (newLocation) => {
    return dispatch => {
        dispatch(removeAppNavigation(newLocation))
    }
}

function addAppNavigation(newLocation) {
    return {
        type: ADD_APP_NAVIGATION,
        newLocation
    };
}

function removeAppNavigation(newLocation){
    return {
        type: REMOVE_APP_NAVIGATION,
        newLocation
    }
}
