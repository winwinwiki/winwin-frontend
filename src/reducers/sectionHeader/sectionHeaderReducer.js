import { ADD_APP_NAVIGATION, REMOVE_APP_NAVIGATION } from '../../constants/dispatch';

const initialState = {
    appNavigation: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_APP_NAVIGATION:
            return Object.assign({}, state, {
                appNavigation: [
                    ...state.appNavigation,
                    action.newLocation
                ]
            });

        case REMOVE_APP_NAVIGATION:
            const index = state.appNavigation.map(item => item.title).indexOf(action.newLocation.title);
            let navArray = JSON.parse(JSON.stringify(state.appNavigation));
            if(index !== -1){
                navArray.splice(index)
                return Object.assign({}, state, {
                    appNavigation: navArray,
                });
            } 
            return state;

        default:
            return state;
    }
};