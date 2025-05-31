import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

function ProblemForm() {
  const [form, setForm] = useState({
    title: "",
    platform: "",
    topic: "",
    code: "",
    notes: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://coding-journel-backend.onrender.com/api/problems", form);
      setForm({ title: "", platform: "", topic: "", code: "", notes: "" });
      setMessage("✅ Problem added successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add problem.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Add a Coding Problem</h2>
      {message && <Alert variant={message.includes("✅") ? "success" : "danger"}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Problem Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter problem title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="platform" className="mb-3">
              <Form.Label>Platform</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. LeetCode, Codeforces"
                name="platform"
                value={form.platform}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="topic" className="mb-3">
          <Form.Label>Topic</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Arrays, Graphs"
            name="topic"
            value={form.topic}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="code" className="mb-3">
          <Form.Label>Code</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="Paste your code here"
          />
        </Form.Group>

        <Form.Group controlId="notes" className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any additional notes"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Add Problem
        </Button>
      </Form>
    </Container>
  );
}

export default ProblemForm;
