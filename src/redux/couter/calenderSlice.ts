import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  CalendarArrayType,
  CalendarType,
  SelectedDateType,
} from "../../type/calendarType";
// import { RootState, AppThunk } from '../../app/store';
// import { fetchCount } from './counterAPI';

const initialState: CalendarType = {
  calendar: [],
  selectedDate: {
    key: -1,
    date: "",
    todo: [],
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCalendarList: (state, action: PayloadAction<[]>) => {
      const { payload } = action;
      state.calendar = payload;
    },
    setSeletedDate: (state, action: PayloadAction<CalendarArrayType>) => {
      const { payload } = action;
      state.selectedDate = payload;
    },
  },
});

export const { setCalendarList, setSeletedDate } = calendarSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default calendarSlice.reducer;
