import React, { useState, useEffect } from "react";
import "./App.css";
import Input from "./components/Input";
import Keyboard from "./components/keyboard";
import { AuthProvider } from "./providers/auth";

function App() {
  const [activeInput, setActiveInput] = useState(0);
  const [enterButtonClick, setEnterButtonClick] = useState(false);
  const rows = [{}, {}, {}, {}, {}, {}];
  const [activeRow, setActiveRow] = useState(0);
  const [inputContent, SetInputContent] = useState([
    {
      content: "",
    },
    {
      content: "",
    },
    {
      content: "",
    },
    {
      content: "",
    },
    {
      content: "",
    },
  ]);

  useEffect(() => {
    console.log("mudu");
    // setPosition(position + 1);
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <h1
          style={{
            color: "white",
            fontFamily: "Mitr",
            marginBottom: 120,
          }}
        >
          MANUTERMO S2
        </h1>
        {rows.map((item, key) => (
          <Input
            inputContent={inputContent}
            SetInputContent={SetInputContent}
            setActiveInput={setActiveInput}
            activeInput={activeInput}
            enterButtonClick={enterButtonClick}
            activeRow={activeRow}
            setActiveRow={setActiveRow}
            row={key}
          ></Input>
        ))}
        <Keyboard
          setActiveInput={setActiveInput}
          activeInput={activeInput}
          inputContent={inputContent}
          SetInputContent={SetInputContent}
          setEnterButtonClick={setEnterButtonClick}
          enterButtonClick={enterButtonClick}
        ></Keyboard>
      </div>
    </AuthProvider>
  );
}

export default App;
