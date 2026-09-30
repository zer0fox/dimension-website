import useSite from '@/hooks/useSite';
import useLanguage from '@/hooks/useLanguage';
import useContactForm from '@/hooks/useContactForm';
import contentStyles from '../components/Content/Content.module.scss';
import styles from './Contact.module.scss';

const Contact = () => {
    const site = useSite();
    const { text } = useLanguage();
    const { sent, hiding, handleSubmit, formKey } = useContactForm();
    const alertClass = ['alert', 'alert-success', styles.alert, sent && styles.show, hiding && styles.hide]
        .filter(Boolean)
        .join(' ');

    return (
        <div>
            <div className={alertClass} role="alert">
                <strong>{text('Το μήνυμά σας στάλθηκε επιτυχώς.', 'Your message has been sent successfully.')}</strong> {text('Ευχαριστώ για την επικοινωνία. Θα σας απαντήσω το συντομότερο δυνατό.', 'Thank you for contacting me, I will get back to you as soon as possible.')}
            </div>
            <div className={contentStyles.item}>
                <div className={`${contentStyles.text} ${styles.contact}`}>
                    <div>
                        <h2>{text('Πληροφορίες', 'Information')}</h2>
                        {site.phone}<br />
                        <a href={`mailto:${site.email}`}>{site.email}</a>
                    </div>
                    <div>
                        <h2>{text('Επικοινωνήστε μαζί μου', 'Contact me')}</h2>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.group}>
                                <input type="text" className={styles.input} placeholder={text('Ονοματεπώνυμο', 'Full Name')} id="form-name" name="name" required />
                                <label htmlFor="form-name" className={styles.label}>{text('Ονοματεπώνυμο', 'Full name')}</label>
                            </div>
                            <div className={styles.group}>
                                <input type="email" className={styles.input} placeholder={text('Διεύθυνση email', 'Email address')} id="form-email" name="email" required />
                                <label htmlFor="form-email" className={styles.label}>{text('Διεύθυνση email', 'Email address')}</label>
                            </div>
                            <div className={styles.group}>
                                <textarea className={styles.input} placeholder={text('Το μήνυμά σας', 'Your message')} id="form-message" name="message"></textarea>
                                <label htmlFor="form-message" className={styles.label}>{text('Το μήνυμά σας', 'Your message')}</label>
                            </div>
                            <input type="hidden" id="form-key" name="formkey" value={formKey} />
                            <input type="submit" className={`btn btn-lg ${styles.submit}`} value={text('Αποστολή', 'Send')} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;