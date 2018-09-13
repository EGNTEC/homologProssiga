<?php
session_start();
include("../../conn.php");
include("../../Funcoes/enviarEmail.php");

$aprovador  = $_SESSION['matricula'];
$nomAprovador = $_SESSION['colaborador'];

$data = $_POST['data'];
$selec = json_decode($data);

$acao = "validado";

if($data != "" || $data != null) {

    foreach ($selec as $key) {

        $numseq = $key;
        
        $strInfAbpl = "Select matfun From tPROSabpl Where numseq = $numseq";
        $queryInfAbpl = mssql_query($strInfAbpl);
        $arrayInfAbpl = mssql_fetch_array($queryInfAbpl);
        $solicitante = $arrayInfAbpl['matfun'];
        
        $strInfCol = "Select nomfun,emacom From tVTRHfunc Where numcad = $solicitante";
        $queryInfCol = mssql_query($strInfCol);
        $arrayInfCol = mssql_fetch_array($queryInfCol);
        $nomSolicitante = $arrayInfCol['nomfun'];
        $email = $arrayInfCol['emacom'];//Para quem enviar

        $strUpdate = "Update tPROSabpl Set stspla = 3 Where numseq = $numseq";
        $strUpdateQuery = mssql_query($strUpdate);

        echo enviarEmail('emerson.gomes@inec.org.br',$solicitante,$nomSolicitante,$aprovador,$nomAprovador,$acao);

    }

}

if($strUpdateQuery){
    echo json_encode(0);
}else{

    echo json_encode(1);
}

