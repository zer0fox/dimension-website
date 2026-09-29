import { useState } from 'react';
import { contact } from '@/content/site';

export default function useContactForm() {
    const [sent, setSent] = useState(false);
    const [hiding, setHiding] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (sent) return;

        const response = await fetch(contact.formEndpoint, {
            method: 'POST',
            body: new FormData(event.target),
        });
        if (!response.ok) return;

        setSent(true);
        setTimeout(() => setHiding(true), 1000);
        setTimeout(() => {
            setSent(false);
            setHiding(false);
        }, 9000);
    };

    return { sent, hiding, handleSubmit, formKey: contact.formKey };
}