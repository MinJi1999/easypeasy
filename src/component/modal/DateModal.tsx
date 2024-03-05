import React from "react";
import { CalendarArrayType } from "../../type/calendarType";
import { ModalBackground, ModalContainer } from "../../styled/DateModal";

interface PropsType {
  info: CalendarArrayType;
  open: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DateModal(props: PropsType) {
  const { info, open, setModalOpen } = props;
  console.log(info, "info");
  const dateArray = info.date.split("-");
  const [year, month, date] = dateArray;

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.target as HTMLDivElement;
    if (element.className.includes("modal-bg")) {
      setModalOpen(false);
    }
  };

  return (
    open && (
      <ModalBackground className="modal-bg" onClick={(e) => closeModal(e)}>
        <ModalContainer>
          <div style={{ fontSize: 30, fontWeight: 600 }}>
            {year}년{month}월{date}일
          </div>
        </ModalContainer>
      </ModalBackground>
    )
  );
}
