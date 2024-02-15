// src/components/EventList.js
import Event from "./Event";
import { Container, Row } from "react-bootstrap";

const EventList = ({ events }) => {
  return (
    <Container className="mx-auto p-0" >
      <Row
        data-testid="event-list"
        role="list"
        className="event"
      >
        {events
          ? events.map((event) => <Event key={event.id} event={event} />)
          : null}
      </Row>
    </Container>
  );
};

export default EventList;
