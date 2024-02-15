// src/components/Alert.js

import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.bgColor = null;
        this.borderColor = null;
        this.iconName = null
    }

    getStyle = () => {
        return {
            color: this.color,
            backgroundColor: this.bgColor,
            // borderWidth: "px",
            // borderStyle: "solid",
            // fontWeight: "bolder",
            borderRadius: "7px",
            // borderColor: this.borderColor,
            textAlign: "center",
            fontSize: "0.95rem",
            margin: "0 auto",
            padding: "35px 20px 15px 20px",
            // width: "350px",
            boxShadow: "inset 0 0 15px -11px rgba(0, 0, 0, 0.75), 0 0 15px -11px rgba(0, 0, 0, 0.75)",
            position: "relative"
        }
    }

    render() {
        return (
            <>
                {
                    this.props.userCountry ? (

                        <div className="Alert mt-3">
                            <div className="alerts-container--location p-sm-3 pe-sm-5">
                                <FontAwesomeIcon
                                    className='mt-3 mt-sm-0 me-sm-2'
                                    size='lg'
                                    style={{ opacity: "0.95" }}
                                    icon={icon({ name: "location-dot", family: "classic", style: "solid" })}
                                />
                                <p className='mt-2 mt-sm-0 p-0'>Show events from <b>{this.props.userCountry}</b>?</p>
                                <div>
                                    <button
                                        className='alerts-button mb-3 mb-sm-0 mt-2 mt-sm-0 ms-sm-3 p-2 ps-3 pe-3'
                                        onClick={() => {
                                            this.props.setSearchForUserCountry(true)
                                            this.props.setShowLocationAlert(false)
                                        }}
                                    >
                                        Yes
                                    </button>
                                    {/* <button onClick={() => this.props.setShowLocationAlert(false)} className='alerts-button mt-3 ms-3 p-2 ps-3 pe-3'>No</button> */}
                                    <FontAwesomeIcon
                                        onClick={() => this.props.setShowLocationAlert(false)}
                                        className='me-2'
                                        icon={icon({ name: "x", family: "classic", style: "solid" })}
                                        style={{ position: "absolute", top: "15px", right: "10px", opacity: "0.7", cursor: "pointer" }}
                                    />

                                </div>
                            </div>
                        </div>

                    ) : (
                        <div className="Alert mt-3">
                            <div style={this.getStyle()}>
                                <FontAwesomeIcon
                                    size='lg'
                                    style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", opacity: "0.95" }}
                                    icon={icon({ name: "circle-info", family: "classic", style: "solid" })}
                                />
                                {this.props.text}
                            </div>
                        </div>
                    )
                }
            </>
        )
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(56, 56, 56)'; // info
        // this.borderColor = this.color
        this.bgColor = 'white'; //
        this.iconName = "circle-info"
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(56, 56, 56)'; // warning
        // this.borderColor = 'darkred'
        this.bgColor = 'white'; //
        this.iconName = "circle-info"
    }
}

class OfflineAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(56, 56, 56)'; // warning
        // this.borderColor = 'darkred'
        this.bgColor = 'white'; //
        this.iconName = "circle-info"
    }
}

class LocationAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(56, 56, 56)'; // warning
        // this.borderColor = 'darkred'
        this.bgColor = 'white'; //
        this.iconName = "location-dot"
    }
}

export { InfoAlert, ErrorAlert, OfflineAlert, LocationAlert };