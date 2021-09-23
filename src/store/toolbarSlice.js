import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    showSticker: false,
    showPicture: false,
    showPost: false
}

const toolbarSlice = createSlice({
    name: 'toolbar',
    initialState,
    reducers: {
        toogleStickers(state, action){
            state.showSticker = action.payload
            state.showPicture = false
            state.showPost = false
        },
        tooglePictures(state, action){
            state.showPicture = action.payload
            state.showPost = false
            state.showSticker = false
        },
        tooglePosts(state, action){
            state.showPost = action.payload
            state.showSticker = false
            state.showPicture = false
        },
        resetLayoutShow(state){
            state.showSticker = false
            state.showPicture = false
            state.showPost = false
        }
    }
})

export const toolbarActions = toolbarSlice.actions

export default toolbarSlice.reducer