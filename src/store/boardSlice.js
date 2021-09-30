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
    //   debugger;
      const board = state.userBoards.find((b) => b.id === payload.id);
      const newId = "temp-" + payload.paragraph.match(/\w/g).length + payload.paragraph.match(/\w/g).slice(0,2) + payload.paragraph.match(/\w/g).slice(-1) + Math.random(1-2)
      const newPostconstructed = {
          id: newId,
          paragraph: payload.paragraph,
          category: payload.category,
          coordinates: "x: 0, y: 0"
      }
    //   debugger
      board.posts.push(newPostconstructed);
    },
    removeAffirmation(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setUserBoards(state, action) {
        // debugger
        // const boards = action.payload.map((b) => {
        //     if(!b.images){
        //         debugger
        //        return b.posts = {}
        //     }else {
        //        return b
        //     }
        // }) 
      state.userBoards = action.payload
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
      // debugger
      const board = state.userBoards.find((b) => b.id === payload.boardId);
      const sticker = board.stickers.find((s) => s.id === payload.stickerId);
      sticker.coordinates = JSON.stringify(payload.coordinates)
        .replace(/[{"'}]/g, "")
        .replace(/[,]/g, ", ");
    },
    setQuoteCoordinates(state, {payload}){
        const board = state.userBoards.find((b) => b.id === payload.boardId);
        board.quote.coordinates = JSON.stringify(payload.coordinates)
        .replace(/[{"'}]/g, "")
        .replace(/[,]/g, ", "); 
    },
    setPostCoordinates(state, {payload}){
        const board = state.userBoards.find((b) => b.id === payload.boardId);
        const post = board.posts.find((p) => p.id === payload.postId);
        post.coordinates = JSON.stringify(payload.coordinates)
        .replace(/[{"'}]/g, "")
        .replace(/[,]/g, ", ");
    },
    setImageCoordinates(state, {payload}){
        const board = state.userBoards.find((b) => b.id === payload.boardId);
        const image = board.images.find((i) => i.id === payload.pictureId);
        image.coordinates = JSON.stringify(payload.coordinates)
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
    setNewQuote(state, { payload }) {
      const board = state.userBoards.find(
        (b) => b.category === payload.category
      );
      board.quote = {
        id: payload.quoteId,
        paragraph: payload.quote,
        category: payload.category,
      };
    },
  },
  extraReducers: {
    [createBoard.pending](state) {
      state.status = "pending";
    },
    [createBoard.fulfilled](state, action) {
      state.status = "completed";
        // debugger
      state.isLoadingBoards = false;
      if (action.payload.errors) {
        state.errors = action.payload.errors;
      } else {
        const board = action.payload;
        board.images = []
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
        // debugger;
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
        const board = action.payload;
        if (!board.images){
            board.images = []
            // debugger
            state.userBoards = state.userBoards.map((b) => {
                if (b.id === action.payload.id) {
                  return board;
                } else {
                  return b;
                }
              });
        } else {
            state.userBoards = state.userBoards.map((b) => {
                if (b.id === action.payload.id) {
                  return board;
                } else {
                  return b;
                }
              });
        }
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
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
