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
        toogleStickers(state){
            state.showSticker = !state.showSticker
            state.showPicture = false
            state.showPost = false
        },
        tooglePictures(state){
            state.showPicture = !state.showPicture
            state.showPost = false
            state.showSticker = false
        },
        tooglePosts(state){
            state.showPost = !state.showPost
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