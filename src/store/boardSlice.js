import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createBoard = createAsyncThunk('boards/createBoard', async (category) => {
    const resp = await fetch('/boards', {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(category)
    })
    const data = await resp.json()
    return data
})
const initialState ={
    layout: "",
    stickers: [],
    frames: [],
    posts: [],
    quotes: [],
    status: "",
    errors: []
}

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setLayout(state, action){
            state.layout = action.payload
        },
        addAffirmation(state, action){
            state.posts = state.posts.push(action.payload)
        },
        removeAffirmation(state, action){
            state.posts = state.posts.filter((post) => post.id !== action.payload)
        },
    },
    extraReducers: {
        [createBoard.pending](state){
            state.status = "pending"
        },
        [createBoard.fulfilled](state, action){
            // debugger;
            state.status = "completed"
            if (action.payload.errors){
                state.errors = action.payload.errors
            }else{
                state.stickers = action.payload.assets.stickers
                state.quotes = action.payload.assets.quote
                state.posts = action.payload.assets.posts
                state.frames = action.payload.assets.frames
                state.errors = []
            }
        },
        [createBoard.rejected](state, action){
            if (action.payload) {
                state.errors = action.payload.errorMessage;
              } else {
                state.errors = action.error.message;
              }
        }
    }
})

export const boardActions = boardSlice.actions

export default boardSlice.reducer