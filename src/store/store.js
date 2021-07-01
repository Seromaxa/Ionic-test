import { configureStore, combineReducers } from "@reduxjs/toolkit"
import personsReducer from "./reducers/persons"
import calendarReducer from "./reducers/calendar"

const rootReducer = combineReducers({
  persons: personsReducer,
  calendar: calendarReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
