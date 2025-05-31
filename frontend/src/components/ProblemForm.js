import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function ProblemForm({ onAddProblem }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [solution, setSolution] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProblem({ title, description, solution });
    setTitle('');
    setDescription('');
    setSolution('');
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Add New Problem</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="problemTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter problem title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="problemDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter problem description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="problemSolution" className="mb-3">
            <Form.Label>Solution</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter solution code"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Problem
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProblemForm;
