import React, { useEffect, useState } from "react";
import Calendar from "./component/Calendar";
import Sider from "./component/Sider";
import Landing from "./component/modal/Landing";
import { returnDateTime } from "./util/function/dateUtil";

function App() {
  const [showLanding, setShowLanding] = useState(false);
  useEffect(() => {
    if (checkShowLanding()) {
      setShowLanding(true);
    }
  }, []);

  const checkShowLanding = () => {
    const isLandingCheck = localStorage.getItem("epLandingModalShow");
    if (!!isLandingCheck) {
      const parsed = JSON.parse(isLandingCheck);
      const savedDate = parsed.date;
      const isOff = parsed.value === "off";
      const today = returnDateTime();
      if (savedDate !== today.date) {
        localStorage.removeItem("epLandingModalShow");
      }
      if (isOff) {
        return false;
      } else return true;
    } else return true;
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
      }}
    >
      <Sider />
      <Calendar />
      {showLanding ? <Landing setShowLanding={setShowLanding} /> : null}
    </div>
  );
}

export default App;
