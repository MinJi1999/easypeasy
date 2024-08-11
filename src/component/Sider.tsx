import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  SideDateTitle,
  SideMonthTitle,
  SiderYearTitle,
} from "../styled/CalendarStyled";
import {
  setCalendarList,
  setSelectedDate,
} from "../redux/couter/calenderSlice";
import {
  initialSelectDate,
  initialTodo,
  returnDateTime,
  todoDays,
  todoValueInit,
} from "../resource/data/tmpData";
import _ from "lodash";
import { CalendarArrayType, TodoT } from "../type/calendarType";
import DateModal from "./modal/DateModal";
const initialSelectedData = {
  key: "0000-00-00",
  date: "0000-00-00",
  todo: [],
};

// const initialModalInfo = {

// }

interface PayloadT {
  [key: string]: string | string[];
  key: string;
  date: string;
  todo: string[];
}
export default function Sider() {
  const dispatch = useAppDispatch();
  // const [currentDate, setCurrentDate] =
  //   useState<CalendarArrayType>(initialSelectedData);
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const calendarList = useAppSelector((state) => state.calendar.calendar);

  const todoInput = useRef<HTMLInputElement | null>(null);
  const date = selectedDate.date.split("-");
  // const [selectDate, setselectDate] = useState(initialSelectDate);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setmodalInfo] = useState(initialTodo);

  // console.log(calendarList, "calendarList");
  const insertTodo = () => {
    const copied = _.cloneDeep(selectedDate);
    if (todoInput.current) {
      let todoInfo = { ...todoValueInit };
      todoInfo["key"] = selectedDate.todo.length;
      todoInfo["title"] = todoInput.current.value;
      const { date, time } = returnDateTime();
      todoInfo["date"] = date;
      todoInfo["time"] = time;
      copied.todo.push(todoInfo);
    }
    const result: any = {};
    if (!!selectedDate.key) {
      result[selectedDate.key] = {
        ...copied,
      };
      dispatch(setCalendarList(result));
      dispatch(setSelectedDate(copied));
    }

    if (todoInput.current) {
      todoInput.current.value = "";
    }
  };

  const deleteTodo = (value: TodoT) => {
    const copied = _.cloneDeep(selectedDate);
    copied["todo"] = copied.todo.filter((list) => list.key !== value.key);

    const result: any = { ...initialSelectDate };
    if (!!selectedDate.key) {
      result[selectedDate.key] = {
        ...copied,
      };
      dispatch(setCalendarList(result));
      dispatch(setSelectedDate(copied));
    }
  };

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
        {date[1]}
        {date[2]}
      </SiderYearTitle>
      {/* <SideMonthTitle></SideMonthTitle>
      <SideDateTitle></SideDateTitle> */}
      <div>
        <input
          ref={todoInput}
          style={{ width: 200, height: 20 }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              insertTodo();
            }
          }}
        />
        <button className="sider-submit-button" onClick={() => insertTodo()}>
          +
        </button>
      </div>
      {selectedDate &&
        selectedDate?.todo.map((value, idx) => (
          <div
            key={idx}
            onClick={() => {
              setModalOpen(true);
              setmodalInfo(() => ({ ...value, key: idx }));
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: 20,
                fontWeight: 500,
                marginRight: 15,
              }}
            >
              {value.time}
            </span>
            {value.title}
            <input type="checkbox" defaultChecked={value.done} />
            <button
              className="sider-delete-button"
              onClick={() => deleteTodo(value)}
            >
              X
            </button>
          </div>
        ))}
      {modalOpen && (
        <DateModal
          open={modalOpen}
          info={modalInfo}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
}
