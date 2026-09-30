-- The hosted contact form uses a public build-time Formspree ID instead of the PHP mailer.
UPDATE site SET contact_form_endpoint = NULL WHERE contact_form_endpoint = '/post.php';
UPDATE site SET contact_form_key = NULL WHERE id = 1;