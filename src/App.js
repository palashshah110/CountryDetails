import React from "react";
import "./App.css";
import CountryForm from "./Component/CountryForm.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryDetalis from "./Component/CountryDetalis.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountryForm />} />
        <Route path="/getCountryDetalis" element={<CountryDetalis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
