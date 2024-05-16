// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlanProvider } from './components/plans/planContext';
import { Plan } from './components/plans/plans';
import Create from './components/plans/create';
import { Home } from './components/welcome/home';
import {Update} from './components/plans/update';
import Login from "./components/authentication/login"
import Signup from "./components/authentication/signup"


function App() {
  return (
    <Router>
      <PlanProvider>
        <Routes>
          <Route path="/plans/new" element={<Create />} />
          <Route path="/plans" element={<Plan />} />
          <Route path="/" element={<Home />} />
          <Route path="/plans/:id/edit" element={<Update/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />

          
        </Routes>
      </PlanProvider>
    </Router>
  );
}

export default App;


