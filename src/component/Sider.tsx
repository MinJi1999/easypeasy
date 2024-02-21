import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hook";
import { CalendarArrayType } from "../type/calendarType";

const initialSelectedData = {
  key: null,
  date: "0000-00-00",
  todo: [],
};
export default function Sider() {
  const [seletedDate, setSeletedDate] =
    useState<CalendarArrayType>(initialSelectedData);
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);

  useEffect(() => {
    if (selectedDate?.key !== -1) {
      setSeletedDate(selectedDate);
    }
  }, [selectedDate]);

  const date = seletedDate.date.split("-");
  console.log(date, "date");

  return (
    <div
      style={{
        width: 350,
        height: "100%",
        backgroundColor: "tomato",
        display: "inline-block",
      }}
    >
      <div
        style={{
          display: "inline-block",
          fontSize: 40,
          fontWeight: 600,
          color: "yellow",
          opacity: 0.8,
        }}
      >
        {date[0]}
      </div>
      <div
        style={{
          display: "inline-block",
          fontSize: 40,
          fontWeight: 600,
          color: "yellow",
        }}
      >
        {date[1].padStart(2, "0")}
      </div>
      <div
        style={{
          display: "inline-block",
          fontSize: 40,
          fontWeight: 600,
          color: "yellow",
        }}
      >
        {date[2]}
      </div>
      {seletedDate?.todo.map((value, idx) => (
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
