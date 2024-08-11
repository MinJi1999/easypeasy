export interface CalendarType {
  [key: string]: CalendarArrayType | {};
  calendar: Record<string, SelectedDateType>;
  selectedDate: CalendarArrayType;
}

export interface SelectedDateType {
  key: string;
  date: string;
  todo: [];
}

export interface CalendarArrayType {
  [key: string]:
    | string
    // | null 여기 널이 왜있었던걸까? 투두
    | TodoT[];
  key: string;
  date: string;
  todo: TodoT[];
}

export interface TodoT {
  [key: string]: string | boolean | number;
  date: string;
  time: string;
  title: string;
  content: string;
  done: boolean;
  important: boolean;
  key: number;
}
