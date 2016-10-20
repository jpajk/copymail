import React from 'react';
import MessageBox from './MessageBox';
import ServerMessages from './ServerMessages';
import ProgressBar from './ProgressBar';

const Uploader = React.createClass({
    propTypes: {
        state: React.PropTypes.object.isRequired,
        handle: React.PropTypes.func.isRequired,
        handleMessages: React.PropTypes.func.isRequired
    },

    validationMethods: {
        'validateFileSize': function(file) {
            let max = 10000000;
            return (file.size > max) ? 0 : null;
        },
        'validateFileExtension': function(file) {
            let acceptedExtension = 'text/csv';

            return (file.type !== 'text/csv') ? 1 : null;
        }
    },

    render() {
        let progress = (this.props.state.copying) ? (this.props.state.progress * 100) : 0;

        console.log(progress);

        return (
            <div className="uploader-wrap">
                <div className="col-xs-12">
                    <input onChange={this.loadFile} type="file" className="form-control" />
                </div>
                <MessageBox messages={this.props.state.messages} />
                <ServerMessages serverMessage={this.props.state.currentMessage} />
                {this.props.state.copying ? <ProgressBar progressValue={progress} /> : ''}
                {
                    this.props.state.copying ?
                    '' :
                    <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                }
            </div>
        );
    },

    handleSubmit() {
        let file = this.props.state.file;

        if (typeof file === 'object')
            this.props.state.socket.emit('file_loaded', {file: file});
    },

    loadFile(e) {
        let file = e.target.files[0];

        this.props.handle({
            file: file
        });

        this.validateFile(file);
    },

    validateFile(file) {
        let messages = [];
        let methods = this.validationMethods;

        for (var key in methods) {
            if (methods.hasOwnProperty(key)) {
                let c = methods[key];
                let result = c(file);

                if (result !== null && result >= 0)
                    messages.push(result);
            }
        }

        this.props.handleMessages(messages);
    }
});

export default Uploader;

