import { SelectedDateType } from "../../type/calendarType";

export const setLocalStorage = (data: Record<string, SelectedDateType>) => {
  localStorage.setItem("todoList", JSON.stringify(data));
};

export const getLocalStorage = () => {
  return localStorage.getItem("todoList");
};
