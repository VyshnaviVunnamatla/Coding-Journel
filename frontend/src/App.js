import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';
import ProblemForm from './components/ProblemForm';
import ProblemList from './components/ProblemList';

function App() {
  const [problems, setProblems] = useState([]);

  const addProblem = (problem) => {
    setProblems([...problems, { ...problem, id: Date.now() }]);
  };

  const deleteProblem = (id) => {
    setProblems(problems.filter((p) => p.id !== id));
  };

  return (
    <>
      <NavbarComponent />
      <Container className="my-4">
        <ProblemForm onAddProblem={addProblem} />
        <hr />
        <ProblemList problems={problems} onDeleteProblem={deleteProblem} />
      </Container>
    </>
  );
}

export default App;

