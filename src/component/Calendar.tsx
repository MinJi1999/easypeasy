import React, { useEffect, useState } from "react";
import {
  CalendarContainer,
  CalendarTitle,
  Container,
  // DateBox,
  // DateText,
  DayBox,
  DaysContainer,
  LeftArrow,
  RightArrow,
} from "../styled/CalendarStyled";
import { useAppDispatch, useAppSelector } from "../redux/hook";
// import { setSeletedDate } from "../redux/couter/calenderSlice";
// import { RootState } from "../redux/store";
import { settingDayData, todoDays } from "../resource/data/tmpData";
import Dates from "./Dates";
import { CalendarArrayType } from "../type/calendarType";
import { setCalendarList } from "../redux/couter/calenderSlice";
import { getLocalStorage, setLocalStorage } from "../util/function/saveData";
import F from "./modal/Landing";
import Landing from "./modal/Landing";
import { LandingModal } from "../styled/LandingModalStyled";
import { returnDateTime } from "../util/function/dateUtil";
interface DateObjectT {
  [key: string]: CalendarArrayType;
}

export default function Calendar() {
  const dispatch = useAppDispatch();
  // 현재 날짜 ex) 12
  // const [date, setDate] = useState(0);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  // 현재 month의 총 일수
  const [wholeDates, setWholeDates] = useState<DateObjectT>({});
  const [showLanding, setShowLanding] = useState(false);
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);

  useEffect(() => {
    setInitial();
    settingLocalStorage();
    if (checkShowLanding()) {
      setShowLanding(true);
    }
  }, []);

  const checkShowLanding = () => {
    const isLandingCheck = localStorage.getItem("epLandingModalShow");
    if (!!isLandingCheck) {
      const parsed = JSON.parse(isLandingCheck);
      const savedDate = parsed.date;
      const isOff = parsed.value === "off";
      const today = returnDateTime();
      if (savedDate !== today.date) {
        localStorage.removeItem("epLandingModalShow");
      }
      if (isOff) {
        return false;
      } else return true;
    } else return true;
  };

  // 초기 날짜 세팅
  const setInitial = () => {
    const day = new Date();
    const year = day.getFullYear();
    const month = day.getMonth();
    const date = day.getDate();
    setYear(year);
    setMonth(month + 1);
    // setDate(date);
  };

  const settingLocalStorage = () => {
    const todo = getLocalStorage();
    if (!!todo) {
      const parsed = JSON.parse(todo);
      dispatch(setCalendarList(parsed));
    }
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
    const currentDate = new Date(year, month, 0);
    return currentDate.getDate();
  };

  // 현 달력에 들어갈 날짜 array 구하기
  const settingDates = (month: number, dates: number) => {
    const curDate = new Date(`${year}-${month}-01`);
    // 현재 월의 1일의 요일...
    const firstDay = curDate.getDay() - 1;
    const prevMonth = prevMonthDates(firstDay);
    const curMonthArr = Array.from({ length: dates }, (v, i) => i + 1);
    const curMonth = settingDayData(curMonthArr, month, year);
    const nextMonth = nextMonthDates();
    const result = prevMonth.concat(curMonth, nextMonth);
    const realResult = result.map((li: CalendarArrayType) => {
      return !!todoDays[li.date] ? { ...li, ...todoDays[li.date] } : li;
    });
    const dateObj: DateObjectT = {};
    realResult.forEach((date) => {
      dateObj[date.key] = date;
    });
    // 등록한 애들만 list 저장한다며
    // dispatch(setCalendarList({ ...dateObj, ...todoDays }));
    setWholeDates({ ...dateObj });
  };

  // 해당 월이 수요일부터 시작이면 채워야 하는 월화수에 해당하는 전 월의 날짜.
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

  // 해당 월이 수요일에서 끝나면 채워야 하는 목금토에 해당하는 다음 월의 날짜.
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
          {Object.values(wholeDates).map(
            (value: CalendarArrayType, index: number) => {
              return <Dates key={index} info={value} />;
            }
          )}
        </DaysContainer>
        {/* <input type="datetime-local" onChange={(e) => console.log(e, "e")} /> */}
      </CalendarContainer>
      {showLanding && selectedDate.todo.length ? (
        <Landing setShowLanding={setShowLanding} />
      ) : null}
    </Container>
  );
}
