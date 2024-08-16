import { CalendarArrayType, TodoT } from "../../type/calendarType";
// ㅅㅂ 이런 객체는 타입을 어케 매겨야됨?
export const todoDays: any = {
  "2024-07-06": {
    key: "2024-07-06",
    date: "2024-07-06",
    todo: [
      {
        key: 0,
        startTime: 1720224000000,
        title: "나무 위의 군대 연극",
        content: "너무 떨려",
        done: false,
        important: true,
      },
    ],
  },
  "2024-07-20": {
    key: "2024-07-20",
    date: "2024-07-20",
    todo: [
      {
        key: 0,
        startTime: 1721433600000,
        title: "남산 가기",
        content: "카메라 챙기기",
        done: false,
        important: false,
      },
    ],
  },

  "2024-07-26": {
    key: "2024-07-26",
    date: "2024-07-26",
    todo: [
      {
        key: 0,
        startTime: 1720569600000,
        title: "나무 위의 군대 연극 2차 관람",
        content: "오늘도 눈에 잘 담자",
        done: false,
        important: true,
      },
    ],
  },
};

export const getTodoList = (date: string) => {
  todoDays.map((list: CalendarArrayType) => {
    return list.date.includes(date);
  });
};

export const todoValueInit = {
  date: "",
  time: "",
  title: "",
  content: "",
  done: false,
  important: false,
  key: -1,
};

export const settingDayData = (days: number[], month: number, year: number) => {
  const result = days.map((date: number, index: number) => {
    const resultDate = String(date).padStart(2, "0");
    const resultMonth = String(month).padStart(2, "0");
    return {
      key: `${year}-${resultMonth}-${resultDate}`,
      date: `${year}-${resultMonth}-${resultDate}`,
      todo: [
        // {
        //   startTime: "",
        //   title: "",
        //   content: "",
        //   done: false,
        //   important: false,
        // },
        // {
        //   startTime: "18:00",
        //   title: "친구 생일파티",
        //   content: "드레스 코드 블랙",
        //   done: false,
        //   important: false,
        // },
        // {
        //   startTime: "19:30",
        //   title: "나무 위의 군대 연극",
        //   content: "너무 떨려",
        //   done: true, // 내일은 투두 입력, checked 반응,  기획서 변경되어야 함. 기획서에서의 데이터 구조가 이상함.
        //   important: true,
        // },
        // {
        //   startTime: "19:30",
        //   title: "나무 위의 군대 연극 2차 관람",
        //   content: "오늘도 눈에 잘 담자",
        //   done: false,
        //   important: true,
        // },
      ],
    };
  });
  return result;
};

export const initialSelectDate: CalendarArrayType = {
  key: "",
  date: "",
  todo: [],
};

export const initialTodo = {
  date: "",
  time: "",
  title: "",
  content: "",
  done: false,
  important: false,
  key: -1,
};


