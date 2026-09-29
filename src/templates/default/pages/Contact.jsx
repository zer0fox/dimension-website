import React, { Component } from 'react';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: false,
            hideAlert: false
        };
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        if(this.state.alert) return;
        const data = new FormData(event.target);
        
        fetch('/post.php', {
          method: 'POST',
          body: data
        }).then(r => {
            if(r.ok){
                this.setState({alert: true});
                setTimeout(()=>{this.setState({hideAlert: true});}, 1000);
                setTimeout(()=>{this.setState({alert: false, hideAlert: false});}, 9000);
            }
        });
    };
    render() {
        return (
            <div>
                <div className={"alert alert-success fadeIn" + (this.state.alert ? " show": "") + (this.state.hideAlert ? " hide": "")} role="alert">
                    <strong>Your message has been sent successfully.</strong> Thank you for contacting me, I will get back to you as soon as possible.
                </div>
                <div className="content__item">
                    <div className="content__text contact">
                        <div>
                            <h2>Information</h2>
                            (+30) 697 7070 170<br />
                            <a href="mailto:dimitra.gogi@gmail.com">dimitra.gogi@gmail.com</a>
                        </div>
                        <div>
                            <h2>Contact me</h2>
                            <form onSubmit={this.handleSubmit} className="form">
                                <div className="form__group">
                                    <input type="text" className="form__input" placeholder="Full Name" id="form-name" name="name" required />
                                    <label htmlFor="form-name" className="form__label">Full name</label>
                                </div>
                                <div className="form__group">
                                    <input type="email" className="form__input" placeholder="Email address" id="form-email" name="email" required />
                                    <label htmlFor="form-email" className="form__label">Email address</label>
                                </div>
                                <div className="form__group">
                                    <textarea className="form__input" placeholder="Your message" id="form-message" name="message"></textarea>
                                    <label htmlFor="form-message" className="form__label">Your message</label>
                                </div>
                                <input type="hidden" id="form-key" name="formkey" value="JHNHReLVWpq6LeVYRp3m" />
                                <input type="submit" className="btn btn-lg form__submit" value="Send" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
