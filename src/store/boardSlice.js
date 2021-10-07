import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//need to send a quote along with the category
export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (params) => {
    const resp = await fetch("/boards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await resp.json();
    return data;
  }
);

export const updateBoard = createAsyncThunk(
  "boards/updateBoard",
  async (dataToUpdate) => {
    const resp = await fetch(`/boards/${dataToUpdate.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToUpdate.load),
    });
    const data = await resp.json();
    return data;
  }
);

export const boardDelete = createAsyncThunk(
    "board/boardDelete",
    async (id) => {
      const resp = await fetch(`/boards/${id}`, {
          method: "DELETE"
      });
      const data = await resp.json();
      return data;
    }
  );

export const getStickers = createAsyncThunk(
  "stickers/getStickers",
  async () => {
    const resp = await fetch("/stickers");
    const data = await resp.json();
    return data;
  }
);

const initialState = {
  layout: "",
  userBoards: [],
  stickers: [],
  status: "",
  errors: [],
  isLoadingBoards: false,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    toogleBoardsLoading(state) {
      state.isLoadingBoards = !state.isLoadingBoards;
    },
    setLayout(state, action) {
      state.layout = action.payload;
    },
    addAffirmation(state, { payload }) {
      const board = state.userBoards.find((b) => b.id === payload.id);
      const newId = "temp-" + payload.paragraph.match(/\w/g).length + payload.paragraph.match(/\w/g).slice(0,2) + payload.paragraph.match(/\w/g).slice(-1) + Math.random(1-2)
      const newPostconstructed = {
          id: newId,
          paragraph: payload.paragraph,
          category: payload.category,
          coordinates: "x: 244, y: 473"
      }
      board.posts.push(newPostconstructed);
    },
    removeAffirmation(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setUserBoards(state, action) { 
      // debugger
      state.userBoards = action.payload
    },
    addToFrames(state, {payload}){
        const board = state.userBoards.find((b) => b.id === payload.boardId);
        const frame = board.frames.find((f) => {
          if (f.old_id && f.old_id === payload.frame.id){
            return f
          } else if (!f.old && f.id === payload.frame.id){
            return f
          } else{
            return 0
          }
        })
        if (!frame){
            board.frames.push(payload.frame) 
        }else {
            return 
        } 
    },
    updateCurrentBoardImages(state, { payload }) {
      const board = payload;
      state.userBoards = state.userBoards.map((b) => {
        if (b.id === payload.id) {
          return board;
        } else {
          return b;
        }
      });
    },
    reset: () => initialState,

    //doesnt reset stickers. Do not change, this might break sticker loading
    partialReset(state) {
      state.layout = "";
      state.userBoards = [];
      state.status = "";
      state.errors = [];
      state.isLoadingBoards = false;
    },
    addStickers(state, { payload }) {
      const board = state.userBoards.find((b) => b.category === payload);
      board.stickers = state.stickers.filter((s) => s.category === payload);
    },
    //A BLOCK OF ACTIONS THAT SET COORDINATES FOR ELEMENTS
    setStickerCoordinates(state, { payload }) {
      const board = state.userBoards.find((b) => b.id === payload.boardId);
      const sticker = board.stickers.find((s) => s.id === payload.stickerId);
      const x = payload.coordinates.x + parseFloat(sticker.coordinates.split(', ')[0].split(':')[1])
      const y = payload.coordinates.y + parseFloat(sticker.coordinates.split(', ')[1].split(':')[1])
      const newCoordinates = { x, y }
      sticker.coordinates = JSON.stringify(newCoordinates)
        .replace(/[{"'}]/g, "")
        .replace(/[,]/g, ", ");
    },
    setQuoteCoordinates(state, {payload}){
        const board = state.userBoards.find((b) => b.id === payload.boardId);
        const x = payload.coordinates.x + parseFloat(board.quote.coordinates.split(', ')[0].split(':')[1])
      const y = payload.coordinates.y + parseFloat(board.quote.coordinates.split(', ')[1].split(':')[1])
      const newCoordinates = { x, y }
        board.quote.coordinates = JSON.stringify(newCoordinates)
        .replace(/[{"'}]/g, "")
        .replace(/[,]/g, ", "); 
    },
    setPostCoordinates(state, {payload}){
        const board = state.userBoards.find((b) => b.id === payload.boardId);
        const post = board.posts.find((p) => p.id === payload.postId);
        const x = payload.coordinates.x + parseFloat(post.coordinates.split(', ')[0].split(':')[1])
      const y = payload.coordinates.y + parseFloat(post.coordinates.split(', ')[1].split(':')[1])
      const newCoordinates = { x, y }
        post.coordinates = JSON.stringify(newCoordinates)
        .replace(/[{"'}]/g, "")
        .replace(/[,]/g, ", ");
    },
    setImageCoordinates(state, {payload}){
        const board = state.userBoards.find((b) => b.id === payload.boardId);
        const frame = board.frames.find((i) => i.id === payload.frameId);
        const x = payload.coordinates.x + parseFloat(frame.coordinates.split(', ')[0].split(':')[1])
        const y = payload.coordinates.y + parseFloat(frame.coordinates.split(', ')[1].split(':')[1])
        const newCoordinates = { x, y }
        frame.coordinates = JSON.stringify(newCoordinates)
          .replace(/[{"'}]/g, "")
          .replace(/[,]/g, ", ");
    },
    clearBoard(state, { payload }) {
      const board = state.userBoards.find((b) => b.category === payload);
      board.stickers = [];
      board.posts = [];
      board.frames = [];
      board.quote = [];
      board.image =[]
    },
    updateBoard(state, {payload}){
      state.userBoards = state.userBoards.map((b) => {
        if (b.id === payload.id) {
          return payload;
        } else {
          return b;
        }
      });
    },
    removeBoardElement(state, {payload}){
const board = state.userBoards.find((b) => b.id === payload.board);
if (payload.type === "stickers"){
    const sticker = board.stickers.find(s => s.id === payload.typeId)
    board.stickers = board.stickers.filter(s => s.id !== sticker.id)
}
else if(payload.type === "frames"){
  const frame = board.frames.find(f => f.id === payload.typeId)
  board.frames = board.frames.filter(f => f.id !== frame.id)
}
else if (payload.type === "quote"){
 board.quote= ""
}
else {
  const post = board.posts.find(p => p.id === payload.typeId)
  board.posts = board.posts.filter(p => p.id !== post.id)
}
    },
    setNewQuote(state, { payload }) {
      const board = state.userBoards.find(
        (b) => b.category === payload.category
      );
      // debugger
      board.quote = {
        id: payload.quoteId,
        paragraph: payload.quote,
        category: payload.category,
        author: payload.author,
        coordinates: payload.coordinates
      };
    },
  },
  extraReducers: {
    [createBoard.pending](state) {
      state.status = "pending";
    },
    [createBoard.fulfilled](state, action) {
      state.status = "completed";
      state.isLoadingBoards = false;
      if (action.payload.errors) {
        state.errors = action.payload.errors;
      } else {
        const board = action.payload;
        state.userBoards = [...state.userBoards, board];
        state.errors = [];
      }
    },
    [createBoard.rejected](state, action) {
      if (action.payload) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = action.error.message;
      }
    },
    [getStickers.pending](state) {
      state.status = "pending";
    },
    [getStickers.fulfilled](state, action) {
      state.status = "completed";
      if (action.payload.errors) {
        state.errors = action.payload.errors;
      } else {
        state.stickers = action.payload;
        state.errors = [];
        // state.isLoading = false
      }
    },
    [getStickers.rejected](state, action) {
      state.status = "rejected";
      if (action.payload) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = action.error.message;
      }
    },
    [updateBoard.pending](state) {
      state.status = "pending";
    },
    [updateBoard.fulfilled](state, action) {
      state.status = "completed";
      if (action.payload.errors) {
        state.errors = action.payload.errors;
      } else {
            state.userBoards = state.userBoards.map((b) => {
                if (b.id === action.payload.id) {
                  return action.payload;
                } else {
                  return b;
                }
              });
        state.errors = [];
      }
    },
    [updateBoard.rejected](state, action) {
      state.status = "rejected";
      if (action.payload) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = action.error.message;
      }
    },
    [boardDelete.pending](state){
        state.status = "pending"
    },
    [boardDelete.fulfilled](state, action){
        state.status = "completed"
        if (action.payload.errors){
            state.errors = action.payload.errors
        }else{
            state.userBoards = state.userBoards.filter(b => b.id !== action.payload.board.id)
            state.errors = action.payload.message
        }
    },
    [boardDelete.rejected](state, action){
        state.status = "rejected";
      if (action.payload) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = action.error.message;
      }
    }
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
