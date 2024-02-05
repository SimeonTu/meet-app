// src/components/Event.js

import { Button, Row, Col } from "react-bootstrap";
import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [buttonText, setButtonText] = useState("Show details")

  function toggleDetails() {
    if (!showDetails) {
      setShowDetails(true);
      setButtonText("Hide details")
    } else {
      setShowDetails(false);
      setButtonText("Show details")
    }
  }

  return (
    <Row
      role="listitem"
      className="flex-column p-3 mb-4 mx-auto event"
      style={{ width: "500px", border: "1px solid black" }}
    >
      <Col md="auto">
        <h3 className="text-center">{event.summary}</h3>
        <p className="mb-0 mt-3">{new Date(event.created).toString()}</p>
        <p className="mb-2 d-flex justify-content-start">
          <span className="ms-1">{event.location}</span>
        </p>
        {showDetails ? <div className="details" data-testid="details">test</div> : null}
      </Col>
      <Col md="auto" className="d-flex justify-content-end">
        <Button
          className="details-btn"
          data-testid="details-button"
          variant="primary"
          onClick={toggleDetails}
        >
          {buttonText}
        </Button>
      </Col>
    </Row>
  );
};

export default Event;
