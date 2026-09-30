import { useEffect, useRef, useState } from 'react';

const formId = import.meta.env.VITE_FORMSPREE_ID || 'xaenvvkp';
const pendingKey = 'dimension-contact-pending';

export default function useContactForm() {
    const formRef = useRef(null);
    const [returned, setReturned] = useState(false);

    useEffect(() => {
        const finishReturn = () => {
            if (sessionStorage.getItem(pendingKey) !== '1') return;
            sessionStorage.removeItem(pendingKey);
            formRef.current?.reset();
            setReturned(true);
        };
        const onPageShow = (event) => {
            if (event.persisted) finishReturn();
        };

        window.addEventListener('pageshow', onPageShow);
        if (performance.getEntriesByType('navigation')[0]?.type === 'back_forward') finishReturn();
        return () => window.removeEventListener('pageshow', onPageShow);
    }, []);

    const onSubmit = () => {
        sessionStorage.setItem(pendingKey, '1');
        setReturned(false);
    };

    return {
        endpoint: /^[a-zA-Z0-9]+$/.test(formId) ? `https://formspree.io/f/${formId}` : null,
        formRef,
        returned,
        dismiss: () => setReturned(false),
        onSubmit,
    };
}