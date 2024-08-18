import React from "react";
import Calendar from "./component/Calendar";
import Sider from "./component/Sider";
import Landing from "./component/modal/Landing";

function App() {
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
    </div>
  );
}

export default App;
