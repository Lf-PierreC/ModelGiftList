import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Header from "./components/Header.tsx";

import Lista from "./pages/Lista.tsx";
import Login from "./pages/Login.tsx";
import Admin from "./pages/Admin.tsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Persist login no localStorage
  useEffect(() => {
    const storage = localStorage.getItem("loggedIn");
    if (storage === "true") setLoggedIn(true);
  }, []);

  const handleLogin = (password: string) => {
    // Senha fixa: "noiva123"
    if (password === "noiva123") {
      setLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
  };

  return (
    <Router>
      <Navbar/>
      <Header/>
          <Routes>
          <Route path="/" element={<Lista />} />
          <Route path="/login" element={<Login onLogin={handleLogin} loggedIn={loggedIn} />} />
          <Route path="/admin" element={<Admin onLogout={handleLogout} />} />
        </Routes>
    </Router>
  );
}

export default App;
