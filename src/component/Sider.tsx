import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { CalendarArrayType } from "../type/calendarType";
import {
  SideDateTitle,
  SideMonthTitle,
  SiderYearTitle,
} from "../styled/CalendarStyled";
import { setCalendarList } from "../redux/couter/calenderSlice";

const initialSelectedData = {
  key: null,
  date: "0000-00-00",
  todo: [],
};
export default function Sider() {
  const dispatch = useAppDispatch();
  const [currentDate, setCurrentDate] =
    useState<CalendarArrayType>(initialSelectedData);
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const calendarList = useAppSelector((state) => state.calendar.calendar);
  console.log(calendarList, "calendarList");
  useEffect(() => {
    setCurrentDate(selectedDate);
  }, [selectedDate]);

  const date = currentDate.date.split("-");

  return (
    <div
      style={{
        width: 350,
        height: "100%",
        backgroundColor: "tomato",
        display: "inline-block",
        padding: 20,
      }}
    >
      <SiderYearTitle>
        {date[0]}
        {date[1].padStart(2, "0")}
        {date[2].padStart(2, "0")}
      </SiderYearTitle>
      {/* <SideMonthTitle></SideMonthTitle>
      <SideDateTitle></SideDateTitle> */}
      <div>
        <input style={{ width: 200, height: 20 }} />
        <button
          className="sider-submit-button"
          onClick={() => {
            dispatch(
              setCalendarList({
                1: {
                  key: 1,
                  date: "2024-03-02",
                  todo: ["홍냔ㅇ냐"],
                },
              })
            );
          }}
        >
          O
        </button>
        <button className="sider-delete-button">X</button>
      </div>
      {currentDate &&
        currentDate?.todo.map((value, idx) => (
          <div key={idx}>
            <span
              style={{
                display: "inline-block",
                fontSize: 20,
                fontWeight: 500,
                marginRight: 15,
              }}
            >
              {value.startTime}
            </span>
            {value.title}
            <input type="checkbox" defaultChecked={value.done} />
          </div>
        ))}
    </div>
  );
}
