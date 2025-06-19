import {TOGGLE_SIDE_BAR , SET_USER, SET_VIEW} from './actions';

const initialState = {
    toggle: true,
    user: null,
    currentView: 'feed',
}

const reducer = (state = initialState,action) => {
    switch (action.type){
        case TOGGLE_SIDE_BAR:
            return {
                ...state,toggle: !state.toggle
            }
        case SET_USER:
            return {
                ...state,user:action.payload
            }
        case SET_VIEW:
            return {
                ...state,
                currentView: action.payload,
            };
        default :
            return state
    }
}

export default reducer;