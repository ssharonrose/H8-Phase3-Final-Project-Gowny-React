import { FAVORITE_FETCH_SUCCESS, ADD_FAVORITE_SUCCESS, DELETE_FAVORITE_SUCCESS } from "../actions/actionType";

const initialState = {
    favorite: []
}

const favoriteReducer = (state = initialState, action) => {
    if (action.type === FAVORITE_FETCH_SUCCESS) {
        console.log(action.payload, "favs");
        return {
            ...state,
            favorite: action.payload
        }
    }

    return state
}

export default favoriteReducer