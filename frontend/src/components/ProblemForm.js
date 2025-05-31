import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

function ProblemForm() {
  const [form, setForm] = useState({
    title: "",
    platform: "",
    topic: "",
    code: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.platform.trim()) newErrors.platform = "Platform is required";
    if (!form.topic.trim()) newErrors.topic = "Topic is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
    if (message) setMessage(""); // clear message on any input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(
        "https://coding-journel-backend.onrender.com/api/problems",
        form
      );
      setForm({ title: "", platform: "", topic: "", code: "", notes: "" });
      setMessage("✅ Problem added successfully!");
      setErrors({});
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add problem.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Add a Coding Problem</h2>
      {message && (
        <Alert variant={message.includes("✅") ? "success" : "danger"}>
          {message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} noValidate>
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
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
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
                isInvalid={!!errors.platform}
              />
              <Form.Control.Feedback type="invalid">
                {errors.platform}
              </Form.Control.Feedback>
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
            isInvalid={!!errors.topic}
          />
          <Form.Control.Feedback type="invalid">
            {errors.topic}
          </Form.Control.Feedback>
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

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Problem"}
        </Button>
      </Form>
    </Container>
  );
}

export default ProblemForm;
