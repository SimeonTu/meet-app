// src/components/EventList.js
import Event from "./Event";
import { Container } from "react-bootstrap";

const EventList = ({ events }) => {
  return (
    <Container className="mx-auto" data-testid="event-list" role="list">
      {events
        ? events.map((event) => <Event key={event.id} event={event} />)
        : null}
    </Container>
  );
};

export default EventList;
