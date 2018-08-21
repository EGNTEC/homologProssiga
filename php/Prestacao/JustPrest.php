<?php
session_start();
require("../session.php");
include("../conn.php");

$numseq = $_POST['id'];
$just   = $_POST['just'];

//Tratamento para retirar vírgula,apóstrofo,aspas dupla.
$juspre = str_replace("'","",$juspre);
$juspre = str_replace(","," ",$juspre);
//$juspre = str_replace("""","-",$juspre);
$juspre = str_replace("("," ",$juspre);
$juspre = str_replace(")"," ",$juspre);
$juspre = str_replace("@"," ",$juspre);
$juspre = str_replace("#"," ",$juspre);
$juspre = str_replace("$"," ",$juspre);
$juspre = str_replace("*"," ",$juspre);
$juspre = str_replace("&"," ",$juspre);
$juspre = str_replace("%"," ",$juspre);
$juspre = str_replace("á","a",$juspre);
$juspre = str_replace("Á","A",$juspre);
$juspre = str_replace("é","e",$juspre);
$juspre = str_replace("É","E",$juspre);
$juspre = str_replace("í","i",$juspre);
$juspre = str_replace("Í","I",$juspre);
$juspre = str_replace("ó","o",$juspre);
$juspre = str_replace("Ó","O",$juspre);
$juspre = str_replace("ú","u",$juspre);
$juspre = str_replace("Ú","U",$juspre);
$juspre = str_replace("à","a",$juspre);
$juspre = str_replace("À","A",$juspre);
$juspre = str_replace("è","e",$juspre);
$juspre = str_replace("È","E",$juspre);
$juspre = str_replace("ì","i",$juspre);
$juspre = str_replace("Ì","I",$juspre);
$juspre = str_replace("ò","o",$juspre);
$juspre = str_replace("Ò","O",$juspre);
$juspre = str_replace("ù","u",$juspre);
$juspre = str_replace("Ù","U",$juspre);


if($just==""){

  $result=1;
}else{

  $result=0;

  $queryUpdt="UPDATE tPROSabpr set juspre='$just',stspre=1 WHERE numseq=$numseq ";

  $query = mssql_query($queryUpdt) or die('Erro ao alterar registro de prestação.');

}

echo json_encode($result);
/*if($query){

    echo "{success:true}"; //sucesso

 }else{

    echo "{success:false}"; //falha

 }*/
