<?php 
session_start();
header('Content-Type: text/html; charset=UTF-8');
ini_set('default_charset','utf-8');
require("../../phpmailer/class.phpmailer.php");

function enviarEmail($email,$solicitante,$nomSolicitante,$aprovador,$nomAprovador,$acao){
    $dtHoje = date('d/m/Y');
    $emacom = $_SESSION['emacom'];
        
    $assunto = "Prossiga - Valor solicitado ".$acao;
    $body = "Prezado(a), colaborador(a) o status do planejamento encontra-se "."$acao"."."."\r\n"."\r\n"."Data: ".$dtHoje.";"."\r\n"."Contato: ".$emacom.";"."\r\n"."Solicitante: ".$nomSolicitante." - ".$solicitante.";"."\r\n"."Validador: ".$aprovador." - ".$nomAprovador.";"."\r\n";

    $mail = new PHPMailer();
    $mail->CharSet = 'UTF-8';
    $mail->IsSMTP(); // Define que a mensagem será SMTP
    $mail->Host = "smtp.office365.com"; // Endereço do servidor SMTP
    $mail->Port=587;
    $mail->SMTPSecure="tls";
    $mail->SMTPAuth = true; // Usa autenticação SMTP? (opcional)
    $mail->Username = 'prossiga@inec.org.br'; // Usuário do servidor SMTP
    $mail->Password = 'Pr@$$!g9199'; // Senha do servidor SMTP
    $mail->From = "prossiga@inec.org.br"; // Seu e-mail, quem envia
    $mail->FromName = "Prossiga"; // Seu nome
    $mail->AddAddress($email);
    #$mail->AddAddress('ciclano@site.net');
    $mail->Subject =$assunto; // Assunto da mensagem
    $mail->Body = $body ;

    $enviado = $mail->Send();

    // Limpa os destinatários e os anexos
    $mail->ClearAllRecipients();
    $mail->ClearAttachments();

}
