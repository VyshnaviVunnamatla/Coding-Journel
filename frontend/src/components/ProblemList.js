import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ProblemList({ problems, onDeleteProblem }) {
  if (problems.length === 0) return <p>No problems added yet.</p>;

  return (
    <>
      <h2>Problem List</h2>
      {problems.map((problem) => (
        <Card className="mb-3" key={problem.id}>
          <Card.Body>
            <Card.Title>{problem.title}</Card.Title>
            <Card.Text>{problem.description}</Card.Text>
            <pre>{problem.solution}</pre>
            <Button variant="danger" size="sm" onClick={() => onDeleteProblem(problem.id)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default ProblemList;

