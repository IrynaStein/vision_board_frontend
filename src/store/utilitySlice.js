import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isLoading: false,
    status: "",
    errors: []
}

const utilitySlice = createSlice({
    name: 'utility',
    state: initialState,
    reducers: {
        setUser (state, action){
            state.user = action.payload
        }
    }
})

export const utilityActions = utilitySlice.actions;

export default utilitySlice.reducer