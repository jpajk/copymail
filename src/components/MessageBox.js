import React from 'react';
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";

const MessageBox = React.createClass({
    propTypes: {
        messages: React.PropTypes.array.isRequired
    },

    render() {
        return (
            <div className="message-box" style={{width: '100%', display: 'inline-block'}}>
                {this.props.messages.map((message, idx) => {
                        let m = this.getMessage(message);
                        return this.getMessageTemplate(m, idx);
                    }
                )}
            </div>
        );
    },

    getMessage(code) {
        let messages = {
            0: {
                messageContents: 'Wrong file size',
                className: 'alert alert-warning'
            },
            1: {
                messageContents: 'Wrong file extension',
                className: 'alert alert-warning'
            }
        };

        return messages[code];
    },

    getMessageTemplate(params, key) {
        return (
            <div key={key} className={params.className}>{params.messageContents}</div>
        );
    }
});

export default MessageBox;