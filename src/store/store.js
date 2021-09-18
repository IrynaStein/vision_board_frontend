import { configureStore } from '@reduxjs/toolkit'
import utilityReducer from './utilitySlice'

export const store = configureStore({
    reducer: {
        utilities: utilityReducer
    }
})