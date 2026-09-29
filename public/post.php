<?php
   if ($_SERVER['REQUEST_METHOD'] !== 'POST' || ($_POST['formkey'] ?? '') !== "JHNHReLVWpq6LeVYRp3m") {
      http_response_code(400);
      die("ERROR");
   }

   $name = str_replace(array("\r", "\n"), ' ', trim($_POST['name'] ?? ''));
   $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
   $message = trim($_POST['message'] ?? '');

   // The email ends up in mail headers, so only a validated address is allowed.
   if ($name === '' || $email === false) {
      http_response_code(400);
      die("ERROR");
   }

   $body = "Name: " . $name . "\r\n" .
           "Email: " . $email . "\r\n" .
           "Message: " . "\r\n" . $message;

   $headers = implode("\r\n", array(
      "From: webmaster@dimensionstudio.gr",
      "Reply-To: " . $email,
      "X-Mailer: PHP/" . PHP_VERSION
   ));

   if (!mail("dimitra@dimensionstudio.gr", "Message from dimensionstudio.gr contact form " . $email, $body, $headers)) {
      http_response_code(500);
      die("ERROR");
   }
   echo "OK";
?>