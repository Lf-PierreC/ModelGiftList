// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lista from "./pages/Lista";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { PresenteProvider } from "./context/PresenteContext";
import Navbar from "./components/Navbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (senha: string) => {
    const senhaCorreta = "noiva123"; // troque para a senha real
    if (senha === senhaCorreta) {
      setLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <PresenteProvider>
      <Router>
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Lista />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} loggedIn={loggedIn} />}
          />
        </Routes>
      </Router>
    </PresenteProvider>
  );
}

export default App;
