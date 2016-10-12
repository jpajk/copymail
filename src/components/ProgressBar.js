import React from 'react';

const ProgressBar = React.createClass({
    render() {
        return (
            <div className="progress">
                <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                    <span class="sr-only">40% Complete (success)</span>
                </div>
            </div>
        );
    }
});

export default ProgressBar;