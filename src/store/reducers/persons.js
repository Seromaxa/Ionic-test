import { createSlice } from "@reduxjs/toolkit"
import Man from "../../assets/man.png"
import Female from "../../assets/female.png"

const personsReducer = createSlice({
  name: "persons",
  initialState: [
    {
      id: 1,
      toggle: false,
      active: false,
      name: "Name1",
      sername: "Sername",
      photo: Man,
      consult: { date: "", currentTime: "", long: 50 },
      timeZone: "1",
    },
    {
      id: 2,
      toggle: false,
      active: false,
      name: "Елена",
      sername: "Шимановская",
      photo: Female,
      consult: { date: "", currentTime: "", long: 50 },
      timeZone: "2",
    },
    {
      id: 3,
      toggle: false,
      active: false,
      name: "NAme3",
      sername: "Sername",
      photo: Man,
      consult: { date: "", currentTime: "", long: 50 },
      timeZone: "3",
    },
  ],
  reducers: {
    changePerson(state, action) {
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, toggle: true }
          : { ...item, toggle: false }
      )
    },
    initDate(state, action) {
      return state.map((item) =>
        item.timeZone === action.payload.date.active
          ? {
              ...item,
              active: true,
              consult: {
                ...item.consult,
                date: action.payload.date.id,
                currentTime: action.payload.time,
              },
            }
          : {
              ...item,
              active: false,
              consult: { ...item.consult, date: "", currentTime: "" },
            }
      )
    },
  },
})

export default personsReducer.reducer
export const { changePerson, initDate } = personsReducer.actions
