import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get("https://coding-journel-backend.onrender.com/api/problems");
        setProblems(res.data);
      } catch (err) {
        console.error("Error fetching problems:", err);
        setError("Failed to fetch problems.");
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

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
                    <pre className="bg-light p-2 rounded small" style={{ maxHeight: "150px", overflowY: "auto" }}>
                      {p.code}
                    </pre>
                  </Card.Text>
                  <Card.Text>{p.notes}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ProblemList;

