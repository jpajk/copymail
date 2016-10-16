import React from 'react';

const ProgressBar = React.createClass({
    propTypes: {
        progressValue: React.PropTypes.string.isRequired
    },

    render() {
        return (
            <div class="progress col-xs-12">
                <div
                    className="progress-bar progress-bar-success"
                    role="progressbar"
                    style={{
                        width: this.props.progressValue + '%'
                    }}
                >
                    <span class="sr-only">{this.props.progressValue}</span>
                </div>
            </div>
        );
    }
});

export default ProgressBar;