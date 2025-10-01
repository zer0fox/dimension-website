<?php
   $name = $_POST['name'];
   $email = $_POST['email'];
   $message = $_POST['message'];
   $formkey = $_POST['formkey'];
   if($formkey !== "JHNHReLVWpq6LeVYRp3m"){
      die("ERROR");
   }
   $message =  "Name: ". $name . "\r\n" .
               "Email: ". $email . "\r\n" .
               "Message: " . "\r\n" . $message;

   $headers = array("From: webmaster@dimensionstudio.gr",
      "Reply-To: ".$email,
      "X-Mailer: PHP/" . PHP_VERSION
   );
   $headers = implode("\r\n", $headers);
   mail("dimitra@dimensionstudio.gr", "Message from dimensionstudio.gr contact form ".$email, $message, $headers);
   echo "OK";
?>
