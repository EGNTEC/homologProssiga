<?php
session_start();
require("../../session.php");
include('../../conn.php');
include("../../Funcoes/enviarEmail.php");

$stspla = $_POST['sit'];
$numseq = $_POST['seqpla'];
$vlrsol = $_POST['valsol'];

$solicitante  = $_SESSION['matricula'];
$nomSolicitante = $_SESSION['colaborador'];
$numRegional = $_SESSION['codreg'];

$acao = "corrigido";

//Alterar valor da solicitação
$strUpdtVlr = "Update tPROSplde Set vlrdes = $vlrsol Where seqpla = $numseq And vlrdes <> 0";
$queryUpdtVlr = mssql_query($strUpdtVlr);
//var_dump($strUpdtVlr);

if($queryUpdtVlr == true) {
    //Alterar valor da situação
    $strUpdtSts = "Update tPROSabpl Set stspla = 2 Where numseq = $numseq";
    $queryUpdtSts = mssql_query($strUpdtSts);

    $strGer = "Select numcad,nomfun,emacom From tVTRHfunc Where codcar = 6500 And numloc = $numRegional";
    $queryGer = mssql_query($strGer);
    $arrayGer = mssql_fetch_array($queryGer);

    $aprovador= $arrayGer['numcad'];
    $nomAprovador= $arrayGer['nomfun'];
    $email= $arrayGer['emacom']; //Para quem enviar

    if($codcargo == 6500){

        $email = 'grupogerenciageraloperacoes@inec.org.br';
        $aprovador = 000;
        $nomAprovador = 'Gerência Geral';
    }

    echo enviarEmail('emerson.gomes@inec.org.br',$solicitante,$nomSolicitante,$aprovador,$nomAprovador,$acao);

    echo "{success:1}";
 } else {
    echo "{success:0}";
 }

