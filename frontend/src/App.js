import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import ProblemForm from './ProblemForm';
import ProblemList from './ProblemList';
import './App.css';

const App = () => {
  const [problems, setProblems] = useState([]);
  const [editingProblem, setEditingProblem] = useState(null);

  const handleAddProblem = (problem) => {
    if (editingProblem) {
      setProblems((prev) =>
        prev.map((p) => (p._id === editingProblem._id ? { ...problem, _id: editingProblem._id } : p))
      );
      setEditingProblem(null);
    } else {
      setProblems((prev) => [...prev, { ...problem, _id: Date.now().toString() }]);
    }
  };

  const handleEditClick = (problem) => {
    setEditingProblem(problem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setProblems((prev) => prev.filter((p) => p._id !== id));
  };

  const handleLogout = () => {
    alert('Logged out!');
    // Add your logout logic here
  };

  return (
    <>
      <Header onLogout={handleLogout} />
      <Container className="mb-5">
        <ProblemForm onSubmit={handleAddProblem} initialData={editingProblem} />
        <hr />
        <h2 className="my-4">My Problems</h2>
        <ProblemList
          problems={problems}
          handleEditClick={handleEditClick}
          handleDelete={handleDelete}
        />
      </Container>
      <footer className="text-center py-3 bg-light mt-auto">
        <Container>
          <small>© 2025 Your Name | <a href="mailto:youremail@example.com">Contact Me</a></small>
        </Container>
      </footer>
    </>
  );
};

export default App;
