import { configureStore } from '@reduxjs/toolkit'
import contacts from './contacts'

export default configureStore({
  reducer: {
    contacts : contacts,
  },
})