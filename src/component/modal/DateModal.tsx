import React, { useEffect, useState } from "react";
import { CalendarArrayType, TodoT } from "../../type/calendarType";
import { ModalBackground, ModalContainer } from "../../styled/DateModal";
import { initialSelectDate } from "../../resource/data/tmpData";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  setCalendarList,
  setSelectedDate,
} from "../../redux/couter/calenderSlice";

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
    const { date, time } = info;
    const currentDate = new Date(`${date} ${time}`);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const minutes = currentDate.getMinutes();
    const hours = currentDate.getHours();
    const sec = currentDate.getSeconds();

    // if (dateRef.current && timeRef.current) {
    //   dateRef.current.defaultValue = `${year}-${fillZero(month)}-${fillZero(
    //     day
    //   )}`;
    //   timeRef.current.defaultValue = `${fillZero(date.time.hour)}:${fillZero(
    //     date.time.minutes
    //   )}:${fillZero(date.time.seconds)}`;
    // }

    setDateInfo(() => ({
      ...info,
    }));
  }, [info, open]);

  function fillZero(num: number) {
    return String(num).padStart(2, "0");
  }

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.target as HTMLDivElement;
    if (element.className.includes("modal-bg")) {
      setModalOpen(false);
    }
  };

  const handleDateInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const value = e.target.value;
    setDateInfo((prev) => {
      const copied = { ...prev };
      copied[key] = value;
      return copied;
    });
  };

  const callDispatch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    // 1. todo는 일단 배열을 유지. 수정 시엔 동일 key를 찾아서 arr[idx] = result로
    // 2. 생성할 때는 이전의 todo를 깔아주고 뒤에 push해주는 형태
    // 3. 해당 result를 calendarList에도 깔아준다.
    const resultTodoObj = { ...selectedDate };
    const copiedTodo = { ...dateInfo };
    const prevTodoIdx = resultTodoObj.todo.findIndex(
      (todo) => todo.key === info.key
    );
    if (prevTodoIdx >= 0) {
      const copiedPrevTodos = [...resultTodoObj.todo];
      copiedPrevTodos[prevTodoIdx] = {
        ...resultTodoObj.todo[prevTodoIdx],
        ...copiedTodo,
      };
      resultTodoObj.todo = copiedPrevTodos;
    } else {
      const newKey = resultTodoObj.todo.length;
      copiedTodo["key"] = newKey;
      resultTodoObj["todo"] = [...resultTodoObj["todo"], copiedTodo];
    }

    // resultTodoObj["date"] = copiedTodo.date;
    // resultTodoObj["key"] = copiedTodo.date;
    const calendarResult: Record<string, CalendarArrayType> = {};
    calendarResult[copiedTodo.date] = resultTodoObj;
    dispatch(setCalendarList(calendarResult));
    console.log("3");
    dispatch(setSelectedDate(resultTodoObj));
  };

  return (
    open && (
      <ModalBackground className="modal-bg" onClick={(e) => closeModal(e)}>
        <ModalContainer>
          <span>{info.important ? "★" : "☆"}</span>
          {!isEditMode ? (
            <div
              style={{ fontSize: 30, fontWeight: 600 }}
              onClick={() => setIsEditMode((prev) => !prev)}
            >
              {dateInfo.title}
            </div>
          ) : (
            <input
              // defaultValue={info.title}
              onBlur={(e) => {
                setIsEditMode(false);
                callDispatch(e, "title");
              }}
              value={dateInfo.title}
              onChange={(e) => handleDateInfo(e, "title")}
            />
          )}
          <div>{info.startTime}</div>
          <input
            type="date"
            readOnly
            value={dateInfo.date}
            // onChange={(e) => handleDateInfo(e, "date")}
            // onBlur={(e) => callDispatch(e, "date")}
          />
          <input
            type="time"
            value={dateInfo.time}
            onChange={(e) => handleDateInfo(e, "time")}
            onBlur={(e) => callDispatch(e, "time")}
          />
          <div>
            <textarea
              onChange={(e) => handleDateInfo(e, "content")}
              onBlur={(e) => callDispatch(e, "content")}
            />
          </div>
          <div>{info.content}</div>
        </ModalContainer>
      </ModalBackground>
    )
  );
}
