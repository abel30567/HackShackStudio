import React from 'react';

class ContactForm extends React.Component {
    constructor(){
        super();
    }
    
    render() {
        return  <div className="form-container border">
                <div className="form-header">
                    <br />
                    <h1>CONTACT</h1>
                </div>
                <div className="form">
                    <div className="form-group-2">
                        <input type="text" placeholder="Name" id="name-input"/>
                    </div>
                    <div className="form-group-2">
                        <input type="text" placeholder="Last name" id="lastn-input"/>
                    </div>
                    <div className="form-group-1">
                        <input type="text" placeholder="Email" id="email-input"/>
                    </div>
                    <div className="form-group-1">
                        <textarea placeholder="Message" id="message-input"></textarea>
                    </div>
                    <div className="form-group">
                        <button onClick = {()=> {
                                var name = document.getElementById("name-input").value;
                                var email = document.getElementById("email-input").value;
                                var lastn = document.getElementById("lastn-input").value;
                                var message = document.getElementById("message-input").value;
                                this.props.onContact( { name: name, email: email, lastn: lastn, message: message } ) } } >
                            SEND MESSAGE
                        </button>
                    </div>
                </div>
            </div>;
    }

}

export default ContactForm;
