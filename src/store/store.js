import { configureStore } from '@reduxjs/toolkit'
import utilityReducer from './utilitySlice'

const store = configureStore({
    reducer: {
        utilities: utilityReducer
    }
})

export default store