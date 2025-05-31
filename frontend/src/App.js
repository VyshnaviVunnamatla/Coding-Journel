import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from './components/Navbar';
import Header from "./components/Header";
import ProblemForm from "./components/ProblemForm";
import ProblemList from "./components/ProblemList";

function App() {
  const handleLogout = () => {
    // Add logout logic here if you want
    alert("Logout clicked");
  };

  return (
    <Router>
      <Header onLogout={handleLogout} />
      <div className="container my-4">
        <Routes>
          <Route
            path="/"
            element={<ProblemList />}
          />
          <Route
            path="/add-problem"
            element={<ProblemForm />}
          />
          {/* You can add more routes here, like /profile */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
