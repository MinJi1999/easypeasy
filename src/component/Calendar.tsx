import React, { useEffect, useState } from "react";
import {
  CalendarContainer,
  CalendarTitle,
  Container,
  DateBox,
  DateText,
  DayBox,
  DaysContainer,
  LeftArrow,
  RightArrow,
} from "../resource/styled/CalendarStyled";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setSeletedDate } from "../redux/couter/calenderSlice";
import { RootState } from "../redux/store";
import { settingDayData } from "../resource/data/tmpData";
import Dates from "./Dates";
import { CalendarArrayType } from "../type/calendarType";
// interface

export default function Calendar() {
  const dispatch = useAppDispatch();
  // 현재 날짜 ex) 12
  const [date, setDate] = useState(0);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  // 현재 month의 총 일수
  const [wholeDates, setWholeDates] = useState<any>([]);

  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);

  useEffect(() => {
    setInitial();
  }, []);

  // 초기 날짜 세팅
  const setInitial = () => {
    const day = new Date();
    const year = day.getFullYear();
    const month = day.getMonth();
    const date = day.getDate();
    setYear(year);
    setMonth(month + 1);
    setDate(date);
  };

  //월이 달라짐에 따라 월의 총 일수도 변경
  useEffect(() => {
    if (month !== 0) {
      settingDates(month, settingDays(month));
    }
  }, [month]);

  // 좌클릭하여 월 업데이트할 때(년도 같이 처리)
  const settingPrevDate = () => {
    setMonth((prev) => {
      const prevMonth = prev - 1;
      return prev !== 1 ? prevMonth : 12;
    });
    if (month === 1) {
      setYear((prev) => prev - 1);
    }
  };

  // 우클릭하여 월 업데이트할 때(년도 같이 처리)
  const settingNextDate = () => {
    setMonth((prev) => {
      const prevMonth = prev + 1;
      return prev !== 12 ? prevMonth : 1;
    });
    if (month === 12) {
      setYear((prev) => prev + 1);
    }
  };

  // 총 일수 구하기
  const settingDays = (month: number) => {
    const testDate = new Date(year, month, 0);
    console.log(month, "month");
    console.log(testDate.getDate(), "나선형 은하");
    return testDate.getDate();
    // 31일인 달 1,3,5,7,8,10,12
    // 30일인 달 4, 6, 9,11
    // if (month === 4 || month === 6 || month === 9 || month === 11) {
    //   return 30;
    // } else if (year % 4 === 0 && month === 2) {
    //   return 29;
    // } else if (month === 2) {
    //   return 28;
    // } else {
    //   return 31;
    // }
  };

  // 현 달력에 들어갈 날짜 array 구하기
  const settingDates = (month: number, dates: number) => {
    const curDate = new Date(`${year}-${month}-1`);
    // // 현재 월의 1일의 요일...
    const firstDay = curDate.getDay() - 1;
    const prevMonth = prevMonthDates(firstDay);
    const curMonthArr = Array.from({ length: dates }, (v, i) => i + 1);
    const curMonth = settingDayData(curMonthArr, month, year);
    const nextMonth = nextMonthDates();
    const result = prevMonth.concat(curMonth, nextMonth);
    // 여기다가 만든 함수를 넣고 최종 setWholeDates에 넣어줘야 함
    setWholeDates(result);
  };

  function prevMonthDates(firstDay: number): CalendarArrayType[] {
    const prevMonth = month - 1;
    const prevWholeDates = settingDays(prevMonth);
    let arr = [];
    for (let i = firstDay; i >= 0; i--) {
      arr.push(prevWholeDates - i);
    }
    const result = settingDayData(arr, prevMonth, year);
    return result;
  }

  function nextMonthDates() {
    const nextMonth = month + 1;
    const date = new Date(`${year}-${nextMonth}-1`);
    const firstDay = date.getDay();
    let arr = [];
    for (let i = 1; i <= 7 - firstDay; i++) {
      arr.push(i);
    }
    const result = settingDayData(arr, nextMonth, year);
    return result;
  }

  return (
    <Container>
      <CalendarContainer>
        <CalendarTitle>
          {/* <button
          onClick={() =>
            dispatch(
              setSeletedDate({ key: 1022, date: "2023-05-12", todo: [] })
            )
          }
        ></button> */}
          <div style={{ fontSize: 25 }}>
            <LeftArrow onClick={settingPrevDate}>왼</LeftArrow>
            {year}
            <RightArrow onClick={settingNextDate}>오</RightArrow>
          </div>
          <div>{month}월</div>
        </CalendarTitle>
        <DaysContainer>
          {["일", "월", "화", "수", "목", "금", "토"].map((value) => (
            <DayBox key={value}>{value}</DayBox>
          ))}
          {wholeDates.map((value: CalendarArrayType, index: number) => {
            return <Dates key={index} info={value} curDate={date} />;
          })}
        </DaysContainer>
        {/* <input type="datetime-local" onChange={(e) => console.log(e, "e")} /> */}
      </CalendarContainer>
    </Container>
  );
}
