import React from 'react';

const ProgressBar = React.createClass({
    render() {
        return (
            <div class="progress">
                <div
                    class="progress-bar progress-bar-success"
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