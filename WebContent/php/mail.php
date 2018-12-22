<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/OAuth.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/POP3.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'saurabh.cartoon@gmail.com';                 // SMTP username
    $mail->Password = 'playandpause';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($_REQUEST['your-email'], 'Query');
    $mail->addAddress('urobotechnologies@gmail.com', 'uRobo Technologies');     // Add a recipient
    $mail->addAddress('saurabh.cartoon@gmail.com', "Saurabh Baranawal");               // Name is optional
    $mail->addReplyTo($_REQUEST['your-email'], "uRobo Technologies");
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    //Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Customer Query';
    $mail->Body    = "From: ".$_REQUEST['your-email']."<br>Name:".$_REQUEST['your-name']."<br>Contact Number::".$_REQUEST['your-number']."<br><h3>".$_REQUEST['your-message']."</h3>";
    $mail->AltBody = $_REQUEST['your-message'];
	
	if(strcmp($_REQUEST['your-number'],"")!=0){
		$mail->send();	
	}
    echo 'Message has been sent';
    echo "<script>location.href='http://www.urobo-technologies.com';</script>";
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    echo "<script>location.href='http://www.urobo-technologies.com';</script>";
}