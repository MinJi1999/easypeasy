export interface CalendarType {
  calendar: [];
  selectedDate: CalendarArrayType;
}

export interface SelectedDateType {
  key: number;
  date: string;
  todo: [];
}

export interface CalendarArrayType {
  key: number;
  date: string;
  todo: {
    startTime: string;
    endTime: string;
    title: string;
    content: string;
    done: boolean;
    important: boolean;
  }[];
}
