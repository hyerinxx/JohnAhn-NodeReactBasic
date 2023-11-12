import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={Auth(LandingPage, null)} />
          <Route path='/login' element={Auth(LoginPage, false)} />
          <Route path='/register' element={Auth(RegisterPage, false)} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;