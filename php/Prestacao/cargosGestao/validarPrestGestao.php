<?php
session_start();
require("../../session.php");
include("../../conn.php");
include("../../Funcoes/enviarEmail.php");

$id = $_POST['id'];
$justificativa = $_POST['justificativa'];
$matSelecionado = $_POST['matricula'];

$aprovador  = $_SESSION['matricula'];
$nomAprovador = $_SESSION['colaborador'];
$numRegional = $_SESSION['codreg'];


if($justificativa != ""){// o e-mail deverá ir  para o grupo administrativo
    //Quem recebeŕa o e-mail.
    $strGer = "Select numcad,nomfun,numreg,emacom From tVTRHfunc Where numcad = $matSelecionado";
    $queryGer = mssql_query($strGer);
    $arrayGer = mssql_fetch_array($queryGer);
    $solicitante= $arrayGer['numcad'];
    $nomSolicitante= $arrayGer['nomfun'];
    $acao = "faltanto ser concluído";
    $email = 'grupoadministrativo@inec.org.br';
    $aprovador = 000;
    $nomAprovador = 'Administrador Prossiga';

    $queryUpdt = "UPDATE tPROSabpr SET stspre=3 WHERE numseq = '$id' ";
    echo enviarEmail('anacarla.silva@inec.org.br',$solicitante,$nomSolicitante,$aprovador,$nomAprovador,$acao);
}else{
    //Quem recebeŕa o e-mail.
    $strGer = "Select numcad,nomfun,numreg,emacom From tVTRHfunc Where numcad = $matSelecionado";
    $queryGer = mssql_query($strGer);
    $arrayGer = mssql_fetch_array($queryGer);
    $acao = "validado";

    $solicitante= $arrayGer['numcad'];
    $nomSolicitante= $arrayGer['nomfun'];
    $email= $arrayGer['emacom']; //Para quem enviar

    $queryUpdt = "UPDATE tPROSabpr SET stspre=4 WHERE numseq = '$id' ";
    echo enviarEmail('emerson.gomes@inec.org.br',$solicitante,$nomSolicitante,$aprovador,$nomAprovador,$acao);
}
        
$query = mssql_query($queryUpdt) or die('Erro ao alterar registro.');

if($query){

    echo json_encode(0);

}else{
  
    echo json_encode(1);
}
