import { contact } from '@/content/site';
import useContactForm from '@/hooks/useContactForm';

const Contact = () => {
    const { sent, hiding, handleSubmit, formKey } = useContactForm();

    return (
        <div>
            <div className={'alert alert-success fadeIn' + (sent ? ' show' : '') + (hiding ? ' hide' : '')} role="alert">
                <strong>Your message has been sent successfully.</strong> Thank you for contacting me, I will get back to you as soon as possible.
            </div>
            <div className="content__item">
                <div className="content__text contact">
                    <div>
                        <h2>Information</h2>
                        {contact.phone}<br />
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </div>
                    <div>
                        <h2>Contact me</h2>
                        <form onSubmit={handleSubmit} className="form">
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
                            <input type="hidden" id="form-key" name="formkey" value={formKey} />
                            <input type="submit" className="btn btn-lg form__submit" value="Send" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;