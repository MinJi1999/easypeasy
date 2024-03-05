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
  selectedDate: {
    key: null,
    date: "0000-00-00",
    todo: [],
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCalendarList: (state, action) => {
      const payload: { key: number; value: {} } = action.payload;
      Object.assign(state.calendar, payload);
    },
    setSelectedDate: (state, action: PayloadAction<CalendarArrayType>) => {
      const { payload } = action;
      // const copied: any = _.cloneDeep(state.calendar);
      if (payload.key) {
        // copied[payload.key] = { ...payload };
        state.selectedDate = { ...payload };
      }
    },
  },
});

export const { setCalendarList, setSelectedDate } = calendarSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default calendarSlice.reducer;
