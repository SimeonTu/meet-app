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
            width: "350px",
            boxShadow: "inset 0 0 15px -11px rgba(0, 0, 0, 0.75), 0 0 15px -11px rgba(0, 0, 0, 0.75)",
            position: "relative"
        }
    }

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>
                    <FontAwesomeIcon 
                    size='lg'
                    style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", opacity: "0.95" }} 
                    icon={icon({ name: "circle-info", family: "classic", style: "solid" })} 
                    />
                    {this.props.text}
                </p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(56, 56, 56)'; // info
        // this.borderColor = this.color
        this.bgColor = 'white'; //
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(56, 56, 56)'; // warning
        // this.borderColor = 'darkred'
        this.bgColor = 'white'; // 
    }
}

export { InfoAlert, ErrorAlert };