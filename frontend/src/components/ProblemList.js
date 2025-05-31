import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const ProblemList = ({ problems, handleEditClick, handleDelete }) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {problems.map((p) => (
        <Col key={p._id}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="card-title">{p.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Difficulty: {p.difficulty}
              </Card.Subtitle>
              <Card.Text>
                {p.description.length > 100
                  ? p.description.substring(0, 100) + '...'
                  : p.description}
              </Card.Text>
              <pre>{p.solution.substring(0, 150)}{p.solution.length > 150 ? '...' : ''}</pre>
              <div className="d-flex justify-content-end gap-2 mt-3">
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
  );
};

export default ProblemList;
