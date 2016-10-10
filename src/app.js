import React from 'react';
import Base from './components/Base';
import io from 'socket.io-client';

require('!style!css!bootstrap/dist/css/bootstrap.css');
require('./assets/sass/style.scss');

const App = React.createClass({
    render() {
        return (
            <Base
                state={this.state}
                handle={this.handleDataChange}
                handleMessages={this.handleMessagesChange}
            />
        );
    },

    getInitialState() {
        return {
            file         : null,
            socket       : null,
            messages     : []
        };
    },

    handleDataChange(data) {
        this.setState({
            file    : (typeof data.file != "undefined") ?  data.file : '',
            response: (typeof data.response != "undefined") ?  data.response : ''
        });
    },
    // Foreach of the messages check the state messages. Add non-existent, remove redundant
    handleMessagesChange(messages) {
        let stateMessages = this.state.messages;

        for (let message in messages) {
            if (stateMessages.indexOf(message) === -1) {
                stateMessages.push(parseInt(message));
            }
        }

        for (let message in this.state.messages) {
            if (messages.indexOf(parseInt(message)) === -1) {
                let i = stateMessages.indexOf(parseInt(message));
                stateMessages.splice(i, 1);
            }
        }

        this.setState({messages: stateMessages});
    },

    componentWillMount() {
        let socket = io.connect('http://' + document.domain + ':' + location.port);
        this.setState({socket: socket})
    }
});

export default App;