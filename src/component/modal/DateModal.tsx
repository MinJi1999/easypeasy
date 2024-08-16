import React, { useEffect, useState } from "react";
import { CalendarArrayType, TodoT } from "../../type/calendarType";
import { ModalBackground, ModalContainer } from "../../styled/DateModal";
import { initialSelectDate } from "../../resource/data/tmpData";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  setCalendarList,
  setSelectedDate,
} from "../../redux/couter/calenderSlice";
import { sortList } from "../../util/function/dateUtil";

interface PropsType {
  info: TodoT;
  open: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DateInfoT {
  [key: string]: string | boolean | number;
  date: string;
  time: string;
  content: string;
  title: string;
  important: boolean;
  done: boolean;
  key: number;
}

export default function DateModal(props: PropsType) {
  const dispatch = useAppDispatch();
  const { info, open, setModalOpen } = props;
  const [dateInfo, setDateInfo] = useState<DateInfoT>({
    date: "0000-00-00",
    time: "00:00:00",
    content: "",
    title: "",
    important: false,
    done: false,
    key: -1,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const calendarList = useAppSelector((state) => state.calendar.calendar);

  useEffect(() => {
    setDateInfo(() => ({
      ...info,
    }));
  }, [info, open]);

  useEffect(() => {}, [dateInfo]);

  function fillZero(num: number) {
    return String(num).padStart(2, "0");
  }

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.target as HTMLDivElement;
    if (element.className.includes("modal-bg")) {
      setModalOpen(false);
    }
  };

  const handleDateInfo = (value: boolean | string, key: string) => {
    setDateInfo((prev) => {
      const copied = { ...prev };
      copied[key] = value;
      return copied;
    });
  };
  const callDispatch = (value?: any, key?: string) => {
    const resultTodoObj = { ...selectedDate };
    console.log(resultTodoObj.todo, "sort가 안되어잇는..?");
    const copiedTodo = { ...dateInfo };
    if (!!key) {
      copiedTodo[key] = value;
    }
    const prevTodoIdx = resultTodoObj.todo.findIndex(
      (todo) => todo.key === info.key
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
  // 날짜오류 체크! 로컬 스토리지에 데이터 저장하고 로드하는 거 해보까/
  return (
    open && (
      <ModalBackground className="modal-bg" onClick={(e) => closeModal(e)}>
        <ModalContainer>
          <input
            type="checkbox"
            onChange={(e) => {
              callDispatch(!dateInfo.done, "done");
              handleDateInfo(e.target.checked, "done");
            }}
          />
          <span
            onClick={() => {
              callDispatch(!dateInfo.important, "important");
              setDateInfo((prev) => {
                prev["important"] = !prev.important;
                return prev;
              });
            }}
          >
            {dateInfo.important ? "★" : "☆"}
          </span>
          {!isEditMode ? (
            <div
              style={{
                fontSize: 30,
                fontWeight: 600,
                textDecorationLine: dateInfo.done ? "line-through" : "none",
              }}
              onClick={() => setIsEditMode((prev) => !prev)}
            >
              {dateInfo.title}
            </div>
          ) : (
            <input
              // defaultValue={info.title}
              onBlur={(e) => {
                setIsEditMode(false);
                callDispatch();
              }}
              value={dateInfo.title}
              onChange={(e) => handleDateInfo(e.target.value, "title")}
            />
          )}
          <div>{info.startTime}</div>
          <input
            type="date"
            readOnly
            value={dateInfo.date}
            // onChange={(e) => handleDateInfo(e, "date")}
            // onBlur={(e) => callDispatch()}
          />
          <input
            type="time"
            value={dateInfo.time}
            onChange={(e) => handleDateInfo(e.target.value, "time")}
            onBlur={(e) => callDispatch()}
          />
          <div>
            <textarea
              onChange={(e) => handleDateInfo(e.target.value, "content")}
              onBlur={(e) => callDispatch()}
            />
          </div>
          <div>{info.content}</div>
        </ModalContainer>
      </ModalBackground>
    )
  );
}
