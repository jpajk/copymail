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
            file           : null,
            socket         : null,
            messages       : [],
            currentMessage : '',
            copying        : false,
            progress       : 0
        };
    },

    handleDataChange(data) {
        this.setState({
            file    : (typeof data.file != "undefined") ?  data.file : '',
            response: (typeof data.response != "undefined") ?  data.response : ''
        });
    },

    handleMessagesChange(messages) {
        this.setState({messages: messages});
    },

    componentWillMount() {
        let socket = io.connect('http://' + document.domain + ':' + location.port);

        socket.on('starting_cpimap', function() {
            this.setState({copying: true, progress: 0});
        });

        socket.on('update_progress', function(data) {
            this.setState({
                progress: data.progress,
                currentMessage: data.currentMessage
            });
        });

        this.setState({socket: socket})
    }
});

export default App;