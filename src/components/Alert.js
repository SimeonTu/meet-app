// src/components/Alert.js

import { Component } from 'react';

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
            borderWidth: "px",
            borderStyle: "solid",
            // fontWeight: "bolder",
            borderRadius: "7px",
            borderColor: this.borderColor,
            textAlign: "center",
            fontSize: "0.95rem",
            margin: "0 auto",
            padding: "10px",
            width: "350px"
        }
    }

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#031111'; // seagreen
        this.borderColor = this.color
        this.bgColor = '#20B2AA'; // light seagreen
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#ffffff'; // white
        this.borderColor = 'darkred'
        this.bgColor = '#e50000'; // red
    }
}

export { InfoAlert, ErrorAlert };