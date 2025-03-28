import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "events",
  initialState: {
    allEvents: [],
    currentEvent: null,
    currentEventForm: null,
  },
  reducers: {
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
    setAllEvents: (state, action) => {
      state.allEvents = action.payload;
    },
    setCurrentEventForm: (state, action) => {
      state.currentEventForm = action.payload;
    },
  },
});

export const { setCurrentEvent, setAllEvents, setCurrentEventForm } = eventSlice.actions;
export default eventSlice.reducer;
