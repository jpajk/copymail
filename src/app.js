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
            />
        );
    },

    getInitialState() {
        return {
            file    : '',
            response: '',
        };
    },

    handleDataChange(data) {
        this.setState({
            file    : (typeof data.file != "undefined") ?  data.file : '',
            response: (typeof data.response != "undefined") ?  data.response : ''
        });
    },

    componentWillMount() {
        let socket = io.connect('http://' + document.domain + ':' + location.port);

        socket.on('connect', function() {
            console.log('Connected');
            socket.emit('my event', {data: 'I\'m connected!'});
        });
    }
});

export default App;