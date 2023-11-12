import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Auth SpecificComponent={LandingPage} option={null} />} />
          <Route path='/login' element={<Auth SpecificComponent={LoginPage} option={false} />} />
          <Route path='/register' element={<Auth SpecificComponent={RegisterPage} option={false} />} />
        </Routes>
      </div>
  );
}

export default App;