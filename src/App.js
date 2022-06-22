import React, { useState, useEffect } from "react";
import "./App.css";
import Input from "./components/Input";
import Keyboard from "./components/keyboard";
import { AuthProvider } from "./providers/auth";

function App() {
  const rows = [{}, {}, {}, {}, {}, {}];

  return (
    <AuthProvider>
      <div className="App">
        <h1
          style={{
            color: "white",
            fontFamily: "Mitr",
            marginBottom: "20%",
          }}
        >
          MANUTERMO S2
        </h1>
        {rows.map((item, key) => (
          <Input row={key}></Input>
        ))}
        <Keyboard></Keyboard>
      </div>
    </AuthProvider>
  );
}

export default App;
