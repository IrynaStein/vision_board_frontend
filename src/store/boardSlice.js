import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    layout: "",
    stickers: [],
    frames: [],
    posts: [],
    quotes: [
        {cat:"water",
        text: "Lifes' roughset storms prove the strength of our anchors"},
        {cat:"air",text: "Happiness comes the way the wind blows"},
        {cat:"earth",text: "Climb mountains not so the world can see you, but so you can see the world"},
        {cat:"fire",text: "The finest steel has to go through the hottest fire"}
    ],
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
        //getLayouts => asyncThunk that gets all the stickers and qoutes for that specific layout
    }
})

export const boardActions = boardSlice.actions

export default boardSlice.reducer