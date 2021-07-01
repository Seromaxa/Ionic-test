import { createSlice } from "@reduxjs/toolkit"

const calendarReducer = createSlice({
  name: "calendar",
  initialState: [
    {
      id: 1,
      dates: {
        beginDate: Date.parse("2021-7-14"),
        long: 27,
        unincludeDay: ["2021-7-16", "2021-7-18", "2021-8-1"],
        //   currentDate: {
        //     day: "",
        //     hour: "",
        //   },
      },

      hours: ["14:00", "15:00", "15:50", "16:40", "18:00"],
    },
    {
      id: 2,
      dates: {
        beginDate: Date.parse("2021-6-14"),
        long: 45,
        unincludeDay: ["2021-6-30", "2021-7-18", "2021-8-1"],
      },
      hours: [
        "9:30",
        "10:00",
        "12:30",
        "13:20",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ],
    },
    {
      id: 3,
      dates: {
        beginDate: Date.parse("2021-6-24"),
        long: 35,
        unincludeDay: [],
      },

      hours: ["10:00", "13:00", "14:30", "15:00", "18:00"],
    },
  ],
  reducers: {},
})

export default calendarReducer.reducer
