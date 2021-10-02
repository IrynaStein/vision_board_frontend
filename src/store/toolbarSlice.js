import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showSticker: false,
    showPicture: false,
    showPost: false,
    showPictureCollection: false,
    buttonsDisplay: "none"
}

const toolbarSlice = createSlice({
    name: 'toolbar',
    initialState,
    reducers: {
        toogleStickers(state, {payload}){
            state.showSticker = payload
            state.showPicture = false
            state.showPost = false
        },
        tooglePictureCollection(state){
            state.showPictureCollection = !state.showPictureCollection
            state.showPicture = false
            state.showPost = false
        },
        tooglePictures(state){
            state.showPicture = !state.showPicture
            state.showPost = false
            state.showPictureCollection = false

            // state.showSticker = false
        },
        tooglePosts(state){
            state.showPost = !state.showPost
            // state.showSticker = false
            state.showPicture = false
            state.showPictureCollection = false
        },
        resetLayoutShow(state){
            state.showSticker = false
            state.showPicture = false
            state.showPost = false
            state.showPictureCollection = false
        },
        setButtonsDisplay(state, {payload}){
            // debugger
            state.buttonsDisplay = payload
        },
    }
})

export const toolbarActions = toolbarSlice.actions

export default toolbarSlice.reducer