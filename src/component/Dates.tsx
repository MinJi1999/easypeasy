import React, { useEffect, useState } from "react";
import { DateBox, DateText } from "../resource/styled/CalendarStyled";
import { CalendarArrayType } from "../type/calendarType";
import DateModal from "./modal/DateModal";
import { setSeletedDate } from "../redux/couter/calenderSlice";
import { useDispatch } from "react-redux";

interface PropsType {
  info: CalendarArrayType;
  curDate: number;
}

export default function Dates(props: PropsType) {
  const { info, curDate } = props;
  const d = info.date.split("-");

  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  useEffect(() => {
    if (today === info.date) {
      dispatch(setSeletedDate({ ...info }));
    }
  }, [info]);

  const onCickEvent = () => {
    // setModalOpen(true);
    dispatch(setSeletedDate({ ...info }));
  };

  return (
    <>
      <DateBox onClick={() => onCickEvent()}>
        <DateText current={today === info.date}>{d[d.length - 1]}</DateText>
      </DateBox>
      {/* {modalOpen && (
        <DateModal open={modalOpen} info={info} setModalOpen={setModalOpen} />
      )} */}
    </>
  );
}
