import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const ProblemForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      solution: '',
      difficulty: 'Easy',
      tags: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-4 shadow-sm">
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Problem Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter problem title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Problem Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Describe the problem"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="solution">
          <Form.Label>Solution Code</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter your solution code"
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="difficulty">
          <Form.Label>Difficulty</Form.Label>
          <Form.Select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="tags">
          <Form.Label>Tags (comma separated)</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., arrays, sorting"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default ProblemForm;
