import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        "https://coding-journel-backend.onrender.com/api/problems"
      );
      setProblems(res.data);
    } catch (err) {
      console.error("Error fetching problems:", err);
      setError("Failed to fetch problems.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;
    setDeleteError("");
    try {
      await axios.delete(
        `https://coding-journel-backend.onrender.com/api/problems/${id}`
      );
      // Remove from local state for instant UI update
      setProblems(problems.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setDeleteError("Failed to delete the problem.");
    }
  };

  const handleEditClick = (problem) => {
    setCurrentProblem(problem);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setCurrentProblem(null);
  };

  const handleSave = async () => {
    if (!currentProblem) return;
    setSaving(true);

    // Basic validation example:
    if (!currentProblem.title.trim()) {
      alert("Title is required.");
      setSaving(false);
      return;
    }

    try {
      const res = await axios.put(
        `https://coding-journel-backend.onrender.com/api/problems/${currentProblem._id}`,
        currentProblem
      );
      // Update problem in local state
      setProblems(
        problems.map((p) => (p._id === currentProblem._id ? res.data : p))
      );
      setShowEditModal(false);
      setCurrentProblem(null);
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  // Form change handler for editing problem fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProblem({ ...currentProblem, [name]: value });
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Your Coding Problems</h2>

      {deleteError && <Alert variant="danger">{deleteError}</Alert>}

      {problems.length === 0 ? (
        <Alert variant="info">No problems added yet. Start by adding one!</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {problems.map((p) => (
            <Col key={p._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Platform: {p.platform}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Topic:</strong> {p.topic}
                  </Card.Text>
                  <Card.Text>
                    <strong>Code:</strong>
                    <pre
                      className="bg-light p-2 rounded small"
                      style={{ maxHeight: "150px", overflowY: "auto" }}
                    >
                      {p.code}
                    </pre>
                  </Card.Text>
                  <Card.Text>{p.notes}</Card.Text>
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEditClick(p)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Problem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProblem && (
            <Form>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={currentProblem.title}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPlatform">
                <Form.Label>Platform</Form.Label>
                <Form.Control
                  type="text"
                  name="platform"
                  value={currentProblem.platform || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTopic">
                <Form.Label>Topic</Form.Label>
                <Form.Control
                  type="text"
                  name="topic"
                  value={currentProblem.topic || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCode">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="code"
                  value={currentProblem.code || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formNotes">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="notes"
                  value={currentProblem.notes || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} disabled={saving}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProblemList;
