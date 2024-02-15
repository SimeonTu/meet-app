// src/components/Event.js

import { Button, Col } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import AnimateHeight from 'react-animate-height';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [buttonText, setButtonText] = useState("Show details")

  let startTimeAndDate = new Date(event.start.dateTime).toLocaleString('en-GB', { timeZone: 'GMT' })
  let startDate = startTimeAndDate.split(",")[0]
  let startTime = startTimeAndDate.split(",")[1].trim()
  let endTimeAndDate = new Date(event.end.dateTime).toLocaleString('en-GB', { timeZone: 'GMT' })
  let endDate = endTimeAndDate.split(",")[0]
  let endTime = endTimeAndDate.split(",")[1].trim()

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
    <Col md={6} xl={4} className="p-0" role="listitem" key={event.summary}>

      <div style={{ backgroundColor: "#fcf8f8", borderRadius: "7px", boxShadow: "0 0 20px -15px rgba(0, 0, 0, 0.75)" }} className="m-2 p-3 text-center">

        <div>
          <h3 className="m-0" style={{ fontFamily: "'Kanit', sans-serif" }}>{event.summary}</h3>

          {/* <div style={{ marginTop: "-100%", overflow: "hidden", transition: "all 1s ease" }} className={showDetails ? "expanded" : ""} data-testid="details">{event.description}</div> */}

          <AnimateHeight
            className={showDetails ? "mt-2" : ""}
            style={{ transition: "margin 0.5s" }}
            duration={500}
            height={showDetails ? "auto" : 58}
          >
            <div
              style={
                showDetails
                  ?
                  { backgroundColor: "#EFD2D3", color: "black", borderRadius: "7px", transition: "all 0.5s", position: "relative" }
                  :
                  { color: "black", borderRadius: "7px", transition: "background-color 0.5s", position: "relative" }
              }
              className="p-2"
              data-testid="details">
              {
                // showDetails
                // ?
                event.description
                // :
                // event.description.split(" ").slice(0, 10).join(" ") + "..."
              }

              {/* really ugly solution for "expand" indicator, look for something else or remove */}
              {/* <div style={
                showDetails
                  ?
                  { display: "none", opacity: "0", transition: "opacity 0.25s ease-out" }
                  :
                  { textAlign: "start", paddingLeft: "5px", backgroundColor: "#fcf8f8", width: "45px", fontSize: "18px", zIndex: "10", opacity: "1", transition: "opacity 0.5s cubic-bezier(1,0,1,-0.1)", position: "absolute", top: "30px", right: "0" }
              }
              >...</div> */}

            </div>
          </AnimateHeight>

          <div id="time-and-date">
            <div id="start-time" className="mt-2">
              <AnimateHeight
                duration={500}
                height={showDetails ? "auto" : 0}
              >
                <p className="m-0">Start time:</p>
              </AnimateHeight>

              <p className="m-0">
                <FontAwesomeIcon icon={icon({ name: "calendar-days", family: "classic", style: "solid" })} className="me-1" />
                {startDate}
                <FontAwesomeIcon icon={icon({ name: "clock", family: "classic", style: "solid" })} className="ms-3 me-1" />
                <span data-testid="start-time" >{startTime}</span>
              </p>
            </div>

            <AnimateHeight
              duration={500}
              height={showDetails ? "auto" : 0}
            >
              <div className="pt-1" id="end-time">
                <p className="m-0">End time:</p>
                <p className="m-0">
                  <FontAwesomeIcon icon={icon({ name: "calendar-days", family: "classic", style: "solid" })} className="me-1" />
                  {endDate}
                  <FontAwesomeIcon icon={icon({ name: "clock", family: "classic", style: "solid" })} className="ms-3 me-1" />
                  {endTime}
                </p>
              </div>
            </AnimateHeight>

          </div>

          <p className="mt-2 mb-2 align-items-center">
            <FontAwesomeIcon icon={icon({ name: 'location-dot', family: 'classic', style: 'solid' })} className="me-1" />
            {event.location}
          </p>
        </div>

        <div md="auto" className="d-flex justify-content-center">
          <Button
            className="details-btn"
            data-testid="details-button"
            onClick={toggleDetails}
          >
            {buttonText}
          </Button>
        </div>

      </div>
    </Col>
  );
};

export default Event;
