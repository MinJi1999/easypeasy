import React, { useEffect, useState } from "react";
import { DateBox, DateText } from "../styled/CalendarStyled";
import { CalendarArrayType } from "../type/calendarType";
import DateModal from "./modal/DateModal";
import { setSelectedDate } from "../redux/couter/calenderSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hook";

interface PropsType {
  info: CalendarArrayType;
}

export default function Dates(props: PropsType) {
  const { info } = props;
  const d = info.date.split("-");
  const dispatch = useDispatch();
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const calendarList = useAppSelector((state) => state.calendar.calendar);

  useEffect(() => {
    const key = returnKey();
    handleSelectedDate(key);
  }, [info]);

  const returnKey = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const resultDate = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${resultDate}`;
  };

  const onCickEvent = () => {
    const key = info.key;
    handleSelectedDate(key);
  };

  const handleSelectedDate = (key: string) => {
    const copiedInfo = { ...info };
    if (key === copiedInfo.date) {
      if (calendarList[key]) {
        copiedInfo.todo = [...calendarList[key].todo];
      }
      dispatch(setSelectedDate({ ...copiedInfo }));
    }
  };

  return (
    <>
      <DateBox onClick={() => onCickEvent()}>
        <DateText current={selectedDate.date === info.date}>
          {d[d.length - 1]}
        </DateText>
      </DateBox>
    </>
  );
}
