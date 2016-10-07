import React from 'react';
import Uploader from './Uploader'

const Base = React.createClass({
    propTypes: {
        state  : React.PropTypes.object.isRequired,
        handle: React.PropTypes.func.isRequired
    },

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron">
                        <h2>Upload CSV for the win</h2>
                        <Uploader
                            state={this.props.state}
                            handle={this.props.handle}
                            handleMessages={this.props.handleMessages}
                        />
                    </div>
                </div>
            </div>
        );
    }
});

export default Base;
