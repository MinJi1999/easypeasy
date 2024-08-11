import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  CalendarArrayType,
  CalendarType,
  SelectedDateType,
} from "../../type/calendarType";
// import { RootState, AppThunk } from '../../app/store';
// import { fetchCount } from './counterAPI';
import _ from "lodash";

const initialState: CalendarType = {
  calendar: {},
  selectedDate: { key: "", date: "", todo: [] },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCalendarList: (state, action) => {
      const payload = action.payload;
      state.calendar = { ...state.calendar, ...payload };
    },
    setSelectedDate: (state, action: PayloadAction<CalendarArrayType>) => {
      const { payload } = action;
      if (payload.key) {
        state.selectedDate = { ...payload };
      }
    },
  },
});

export const { setCalendarList, setSelectedDate } = calendarSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default calendarSlice.reducer;
