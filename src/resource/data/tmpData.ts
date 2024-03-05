import { CalendarArrayType } from "../../type/calendarType";

export const calendarList = [
  {
    key: 0,
    date: "2023-06-28",
    todo: [
      {
        startTime: "2023-06-28T18:00",
        endTime: "2023-06-28T21:00",
        title: "친구 생일파티",
        content: "드레스 코드 블랙",
        done: false,
        important: false,
      },
    ],
  },
  {
    key: 1,
    date: "2023-07-06",
    todo: [
      {
        startTime: "2023-07-06T19:30",
        endTime: "2023-07-06T22:00",
        title: "나무 위의 군대 연극",
        content: "너무 떨려",
        done: false,
        important: true,
      },
    ],
  },
  {
    key: 2,
    date: "2023-07-06",
    todo: [
      {
        startTime: "2023-08-06T19:30",
        endTime: "2023-08-06T22:00",
        title: "나무 위의 군대 연극 2차 관람",
        content: "오늘도 눈에 잘 담자",
        done: false,
        important: true,
      },
    ],
  },
];

export const getTodoList = (date: string) => {
  calendarList.map((list: CalendarArrayType) => {
    return list.date.includes(date);
  });
};

const initial = [
  {
    startTime: "",
    endTime: "",
    title: "",
    content: "",
    done: false,
    important: false,
  },
];

export const settingDayData = (days: number[], month: number, year: number) => {
  const result = days.map((date: number, index: number) => {
    return {
      key: index,
      date: `${year}-${month}-${date}`,
      todo: [
        // {
        //   startTime: "",
        //   endTime: "",
        //   title: "",
        //   content: "",
        //   done: false,
        //   important: false,
        // },
        // {
        //   startTime: "18:00",
        //   endTime: "21:00",
        //   title: "친구 생일파티",
        //   content: "드레스 코드 블랙",
        //   done: false,
        //   important: false,
        // },
        // {
        //   startTime: "19:30",
        //   endTime: "22:00",
        //   title: "나무 위의 군대 연극",
        //   content: "너무 떨려",
        //   done: true, // 내일은 투두 입력, checked 반응,  기획서 변경되어야 함. 기획서에서의 데이터 구조가 이상함.
        //   important: true,
        // },
        // {
        //   startTime: "19:30",
        //   endTime: "22:00",
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
