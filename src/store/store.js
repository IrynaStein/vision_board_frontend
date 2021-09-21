import { configureStore } from '@reduxjs/toolkit'
import utilityReducer from './utilitySlice'
import boardReducer from './boardSlice'

const store = configureStore({
    reducer: {
        utilities: utilityReducer,
        boards: boardReducer
    }
})

export default store