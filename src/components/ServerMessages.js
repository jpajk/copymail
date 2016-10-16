import React from 'react';

const ServerMessages = React.createClass({
    propTypes: {
        serverMessage: React.PropTypes.string.isRequired,
    },
    render() {
        if (this.props.serverMessage === '')
            return (
                <div id="server-message"></div>
            );
        else
            return (
            <div id="server-message">
                <div className="alert alert-info">
                    {this.props.serverMessage}
                </div>
            </div>
        );
    }
});

export default ServerMessages;
