import React, { useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [keys, setKeys] = useState([
    {
      letter: "Q",
      className: false,
    },
    {
      letter: "W",
      className: false,
    },
    {
      letter: "E",
      className: false,
    },
    {
      letter: "R",
      className: false,
    },
    {
      letter: "T",
      className: false,
    },
    {
      letter: "Y",
      className: false,
    },
    {
      letter: "U",
      className: false,
    },
    {
      letter: "I",
      className: false,
    },
    {
      letter: "O",
      className: false,
    },
    {
      letter: "P",
      className: false,
    },
    {
      letter: "A",
      className: false,
    },
    {
      letter: "S",
      className: false,
    },
    {
      letter: "D",
      className: false,
    },
    {
      letter: "F",
      className: false,
    },
    {
      letter: "G",
      className: false,
    },
    {
      letter: "H",
      className: false,
    },
    {
      letter: "J",
      className: false,
    },
    {
      letter: "K",
      className: false,
    },
    {
      letter: "L",
      className: false,
    },
    {
      letter: "",
      delete: true,
    },
    {
      letter: "Z",
      className: false,
    },
    {
      letter: "X",
      className: false,
    },
    {
      letter: "C",
      className: false,
    },
    {
      letter: "V",
      className: false,
    },
    {
      letter: "B",
      className: false,
    },
    {
      letter: "N",
      className: false,
    },
    {
      letter: "M",
      className: false,
    },
  ]);
  return (
    <AuthContext.Provider value={{ keys, setKeys }}>
      {props.children}
    </AuthContext.Provider>
  );
};
