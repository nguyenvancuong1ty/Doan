// Import các hàm cần thiết
import { configureStore } from '@reduxjs/toolkit';

// Action types
const AVATAR = 'AVATAR';

// Action creators
const setAvatar = (value) => ({
    type: AVATAR,
    payload: value,
});



// Initial state
const initialState = {
    avatar: '',
};

// Reducer

const avatarReducer = (state = initialState, action) => {
    switch (action.type) {
        case AVATAR:
            return {
                ...state,
                avatar: action.payload,
            };
        default:
            return state;
    }
};
const store = configureStore({
    reducer: { avatarReducer },
});

export { setAvatar, store };
