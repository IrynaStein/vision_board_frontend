import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//need to send a quote along with the category
export const createBoard = createAsyncThunk('boards/createBoard', async (params) => {
    const resp = await fetch('/boards', {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(params)
    })
    const data = await resp.json()
    return data
})

export const updateBoard = createAsyncThunk('boards/updateBoard', async(dataToUpdate) => {
    // debugger;
    const resp = await fetch(`/boards/${dataToUpdate.id}`, {
        method: "PATCH",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(dataToUpdate.load)
    })
    const data = await resp.json()
    return data
})

export const getStickers = createAsyncThunk("stickers/getStickers", async () => {
    const resp = await fetch("/stickers")
    const data = await resp.json()
    return data
})

const initialState ={
    layout: "",
    userBoards: [],
    currentBoard: {},
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
        setLayout(state, action){
            state.layout = action.payload
        },
        addAffirmation(state, action){
            state.posts = state.posts.push(action.payload)
        },
        removeAffirmation(state, action){
            state.posts = state.posts.filter((post) => post.id !== action.payload)
        },
        setCurrentBoard(state, {payload}){
            state.currentBoard = payload
        },
        setUserBoards(state, action){
            state.userBoards = action.payload
        }
    },
    extraReducers: {
        [createBoard.pending](state){
            state.status = "pending"
        },
        [createBoard.fulfilled](state, action){
            state.status = "completed"
            if (action.payload.errors){
                state.errors = action.payload.errors
            }else{
                state.stickers = action.payload.assets.stickers
                state.quotes = action.payload.assets.quote
                state.posts = action.payload.assets.posts
                state.frames = action.payload.assets.frames
                state.currentBoard = action.payload.board
                state.userBoards = [...state.userBoards, action.payload.board]
                state.errors = []
            }
        },
        [createBoard.rejected](state, action){
            if (action.payload) {
                state.errors = action.payload.errorMessage;
              } else {
                state.errors = action.error.message;
              }
        },
        [getStickers.pending](state){
            state.status = "pending"
        },
        [getStickers.fulfilled](state, action){
            state.status = "completed"
            if (action.payload.errors){
                state.errors = action.payload.errors
            }else {
                state.stickers = action.payload
                state.errors = []
            }
        },
        [getStickers.rejected](state, action){
            state.status = "rejected"
            if (action.payload) {
                state.errors = action.payload.errorMessage;
              } else {
                state.errors = action.error.message;
              }
        },
        [updateBoard.pending](state){
            state.status = "pending"
        },
        [updateBoard.fulfilled](state, action){
            state.status = "completed"
            if (action.payload.errors){
                state.errors = action.payload.errors
            }else {
                state.currentBoard = action.payload
                state.userBoards = state.userBoards.map((b) => 
                    b.id === action.payload.id ? action.payload : b)
                state.errors = []
                } 
        },
        [updateBoard.rejected](state, action){
            state.status = "rejected"
            if (action.payload) {
                state.errors = action.payload.errorMessage;
              } else {
                state.errors = action.error.message;
              }
        },
    }
})

export const boardActions = boardSlice.actions

export default boardSlice.reducer