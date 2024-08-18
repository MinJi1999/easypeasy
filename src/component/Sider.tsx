import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  SideDateTitle,
  SideMonthTitle,
  SiderYearTitle,
  TodoList,
} from "../styled/CalendarStyled";
import {
  setCalendarList,
  setSelectedDate,
} from "../redux/couter/calenderSlice";
import {
  initialSelectDate,
  initialTodo,
  todoValueInit,
} from "../resource/data/tmpData";
import _ from "lodash";
import { CalendarArrayType, DateInfoT, TodoT } from "../type/calendarType";
import DateModal from "./modal/DateModal";
import { returnDateTime, sortList } from "../util/function/dateUtil";
import { setLocalStorage } from "../util/function/saveData";
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

  useEffect(() => {
    if (Object.values(calendarList).length) {
      setLocalStorage(calendarList);
    }
  }, [calendarList]);

  // console.log(selectedDate, "selectedDate");
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

  const callDispatch = (value: any, key: string, dateInfo: DateInfoT) => {
    console.log(value, `${key}`);
    const resultTodoObj = { ...selectedDate };
    const copiedTodo = { ...dateInfo };
    if (!!key) {
      copiedTodo[key] = value;
    }
    const prevTodoIdx = resultTodoObj.todo.findIndex(
      (todo) => todo.key === copiedTodo.key
    );
    if (prevTodoIdx >= 0) {
      const copiedPrevTodos = [...resultTodoObj.todo];
      // console.log(copiedTodo, "second");
      copiedPrevTodos[prevTodoIdx] = {
        ...resultTodoObj.todo[prevTodoIdx],
        ...copiedTodo,
      };
      // console.log(
      //   {
      //     ...resultTodoObj.todo[prevTodoIdx],
      //     ...copiedTodo,
      //   },
      //   "result"
      // );
      resultTodoObj.todo = sortList(copiedPrevTodos);
    } else {
      const newKey = resultTodoObj.todo.length;
      copiedTodo["key"] = newKey;
      resultTodoObj["todo"] = sortList([...resultTodoObj["todo"], copiedTodo]);
    }
    const calendarResult: Record<string, CalendarArrayType> = {};
    calendarResult[copiedTodo.date] = resultTodoObj;
    dispatch(setCalendarList(calendarResult));
    dispatch(setSelectedDate(resultTodoObj));
  };

  return (
    <div
      style={{
        width: 350,
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
          <TodoList
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
              setmodalInfo(() => ({ ...value, key: idx }));
            }}
            style={{ textDecorationLine: value.done ? "line-through" : "none" }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: 20,
                fontWeight: 500,
                marginRight: 15,
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                callDispatch(!value.important, "important", value);
              }}
            >
              {value.important ? "★" : "☆"}
            </span>
            {value.time} {value.title}
            <input
              type="checkbox"
              defaultChecked={value.done}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                callDispatch(e.target.checked, "done", value);
              }}
            />
            <button
              className="sider-delete-button"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(value);
              }}
            >
              X
            </button>
          </TodoList>
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
