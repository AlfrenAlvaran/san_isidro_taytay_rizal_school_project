import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Services from "./pages/Services";


const App = () => {
  return (
   <div className="min-h-screen bg-white font-sans text-slate-900">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} /> 
    </Routes>
   </div>
  );
};

export default App;
