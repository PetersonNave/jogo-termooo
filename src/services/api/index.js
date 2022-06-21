import axios from "axios";
import React from "react";

const api = axios.create({
  baseURL: "https://significado.herokuapp.com/v2",
});

export default api;
