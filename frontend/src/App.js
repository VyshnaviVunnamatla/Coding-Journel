import React from "react";
import ProblemForm from "./components/ProblemForm";
import ProblemList from "./components/ProblemList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Coding Journal</h1>
      <ProblemForm />
      <ProblemList />
    </div>
  );
}

export default App;