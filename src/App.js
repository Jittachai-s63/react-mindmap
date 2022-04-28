import React from "react";
import Mindmap from "./component/mindmap";
import Present from "./component/Present";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mindmap />} />
        <Route path="/present" element={<Present />} />
      </Routes>
    </Router>
  )
}

export default App;
