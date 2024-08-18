import { TodoT } from "../../type/calendarType";

export const returnDateTime = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const minutes = currentDate.getMinutes();
  const hours = currentDate.getHours();
  const sec = currentDate.getSeconds();
  return {
    date: `${year}-${fillZero(month)}-${fillZero(day)}`,
    time: `${fillZero(hours)}:${fillZero(minutes)}:${fillZero(sec)}`,
  };
};

function fillZero(num: number) {
  return String(num).padStart(2, "0");
}

export function sortList(arr: TodoT[]) {
  const copied = [...arr];
  copied.sort((a, b) => {
    return a.time < b.time ? -1 : 1;
  });
  const arrayKey = copied.map((todo, idx) => {
    const copiedTodo = { ...todo };
    copiedTodo["key"] = idx;
    return copiedTodo;
  });
  return arrayKey;`
}
