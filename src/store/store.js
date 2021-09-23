import { configureStore } from '@reduxjs/toolkit'
import utilityReducer from './utilitySlice'
import boardReducer from './boardSlice'
import toolbarReducer from './toolbarSlice'

const store = configureStore({
    reducer: {
        utilities: utilityReducer,
        boards: boardReducer,
        toolbars: toolbarReducer
    }
})

export default store