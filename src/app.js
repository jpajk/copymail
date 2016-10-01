import React from 'react';
import Base from './components/Base';

require('!style!css!bootstrap/dist/css/bootstrap.css');
require('./assets/sass/style.scss')

const App = React.createClass({
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

    render() {
        return (
            <Base
                state={this.state}
                handle={this.handleDataChange}
            />
        );
    }
});

export default App;