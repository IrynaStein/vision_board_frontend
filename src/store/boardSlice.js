import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    layout: "",
    stickers: [],
    frames: [],
    posts: [],
    quote: "",
    status: "",
    errors: []
}

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: { 
        addAffirmation(state, action){
            state.posts = state.posts.push(action.payload)
        },
        removeAffirmation(state, action){
            state.posts = state.posts.filter((post) => post.id !== action.payload)
        },
    }
})