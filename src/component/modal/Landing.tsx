import React from "react";
import {
  LandingModal,
  ModalBg,
  OffButton,
} from "../../styled/LandingModalStyled";
import { useAppSelector } from "../../redux/hook";
import { TodoList } from "../../styled/CalendarStyled";
import { returnDateTime } from "../../util/function/dateUtil";

interface PropsT {
  setShowLanding: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Landing({ setShowLanding }: PropsT) {
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);

  const setLocalStorageShowLanding = () => {
    const { date } = returnDateTime();
    const lsValue = { date, value: "off" };
    localStorage.setItem("epLandingModalShow", JSON.stringify(lsValue));
  };

  return (
    <ModalBg>
      <LandingModal>
        {selectedDate &&
          selectedDate?.todo.map((value, idx) => (
            <TodoList
              key={idx}
              // onClick={(e) => {
              //   e.stopPropagation();
              //   setModalOpen(true);
              //   setmodalInfo(() => ({ ...value, key: idx }));
              // }}
              style={{
                textDecorationLine: value.done ? "line-through" : "none",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontSize: 20,
                  fontWeight: 500,
                  marginRight: 15,
                  cursor: "pointer",
                }}
                // onClick={(e) => {
                //   e.stopPropagation();
                //   callDispatch(!value.important, "important", value);
                // }}
              >
                {value.important ? "★" : "☆"}
              </span>
              {value.time} {value.title}
              {/* <input
                type="checkbox"
                defaultChecked={value.done}
                onClick={(e) => e.stopPropagation()}
                // onChange={(e) => {
                //   callDispatch(e.target.checked, "done", value);
                // }}
              /> */}
              {/* <button
                className="sider-delete-button"
                // onClick={() => deleteTodo(value)}
              >
                X
              </button> */}
            </TodoList>
          ))}
      </LandingModal>
      <OffButton
        onClick={() => {
          setShowLanding(false);
          setLocalStorageShowLanding();
        }}
      >
        X
      </OffButton>
    </ModalBg>
  );
}
