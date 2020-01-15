<?php

    /**
     * Sending mail through php mail method
     */

    if($_SERVER['REQUEST_METHOD'] === 'POST') {

        // Gettin form data and validate input fields
        $name    = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
        $subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
        $email   = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
        $mailheader = "From: $email \r\n";
        $recipient  = "donato9522@gmail.com";

        // Getting type of vars to validate it
        $nameType    = gettype($name);
        $subjectType = gettype($subject);
        $emailType   = gettype($email);
        $messageType = gettype($message);
        if($nameType === 'string' && $subjectType === 'string' && $emailType === 'string' && $messageType === 'string') {
        
            // Send mail
            if(mail($recipient, $subject, $message, $mailheader)) {
                echo 'Message sent';
            }
        }  
    }