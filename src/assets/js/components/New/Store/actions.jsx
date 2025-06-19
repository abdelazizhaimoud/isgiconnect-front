export const TOGGLE_SIDE_BAR = 'TOGGLE_SIDE_BAR';
export const SET_USER = 'SET_USER';
export const SET_VIEW = 'SET_VIEW';

export const toggle_side_bar = () => ({
    type: TOGGLE_SIDE_BAR,
})
export const set_user = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const set_view = (view) => {
    return {
        type: SET_VIEW,
        payload: view
    }
}