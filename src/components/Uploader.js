import React from 'react';
import 'whatwg-fetch';

const Uploader = React.createClass({
    propTypes: {
        state: React.PropTypes.object.isRequired,
        handle: React.PropTypes.func.isRequired
    },

    handleSubmit() {
        let formData = new FormData();
        formData.append('file', this.props.state.file);

        fetch('/copymail',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData
            }
        ).then(function(res) {
            console.log(res);
        });
    },
    // todo: validate file size, raise errors
    loadFile(e) {
        this.props.handle({
            file: e.target.files[0]
        });
    },

    render() {
        return (
            <div className="uploader-wrap">
                <div className="col-xs-12">
                    <input onChange={this.loadFile} type="file" className="form-control" />
                </div>
                <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
            </div>
        );
    }
});

export default Uploader;

