import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hook";
import { CalendarArrayType } from "../type/calendarType";

export default function Sider() {
  const [seletedDate, setSeletedDate] = useState<CalendarArrayType>();

  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);

  useEffect(() => {
    setSeletedDate(selectedDate);
  }, [selectedDate]);

  return (
    <div
      style={{
        width: 350,
        height: "100%",
        backgroundColor: "tomato",
        display: "inline-block",
      }}
    >
      <h1>{seletedDate?.date}</h1>
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
