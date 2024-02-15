
import { Container, Row, Col, Placeholder } from "react-bootstrap"

const EventPlaceholder = ({ amount }) => {

    let loopArr = [];
    for (let i = 0; i < amount; i++) {
        loopArr.push(i)
    }

    return (

        <Container className="mx-auto p-0" >
            <Row
                data-testid="event-list"
                role="list"
                className="event"
            >

                {loopArr.map((item, index) => (
                    <Col md={6} xl={4} className="p-0" role="listitem" key={index}>
                        <div style={{ backgroundColor: "#fcf8f8", borderRadius: "7px", boxShadow: "0 0 20px -15px rgba(0, 0, 0, 0.75)" }} className="m-2 p-3 text-center">
                            <div>

                                {/* header */}
                                <Placeholder animation="glow">
                                    <Placeholder as={"h3"} className="m-0" style={{ width: "125px" }} />
                                </Placeholder>

                                <Placeholder className="mt-3" as={"p"} animation="glow">
                                    <Placeholder style={{ width: "275px", height: "50px" }} />
                                </Placeholder>

                                {/* date and time */}
                                <p className="mt-2">
                                    <Placeholder animation="glow">
                                        <Placeholder style={{ width: "100px" }} />
                                    </Placeholder>

                                    <Placeholder className="ms-2" animation="glow">
                                        <Placeholder style={{ width: "100px" }} />
                                    </Placeholder>
                                </p>

                                <p className="mt-2 mb-2 align-items-center">
                                    <Placeholder animation="glow">
                                        <Placeholder style={{ width: "100px" }} />
                                    </Placeholder>
                                </p>

                                <Placeholder animation="glow">
                                    <Placeholder.Button variant="primary" style={{ width: "126px" }} />
                                </Placeholder>

                            </div>
                        </div>
                    </Col>
                ))
                }

            </Row>
        </Container>

    )

}

export default EventPlaceholder;