<?php
session_start();
require("../session.php");
include('../conn.php');

$mat   		= $_SESSION['matricula'];
$tiptrp  	= $_POST["tiptra"];
$seqpre  	= $_POST["numseq"];
$datpre  	= $_POST["dtdes"];
$vlrdes   	= $_POST["vlrad"];
$tipo    	= $_POST["tipo"];
$numcad		= $_POST["numcad"];
$juspre		= $_POST["trajeto"];

$datcad = date('Y-m-d H:i:s');

$query 	= "INSERT Into tPROSprde(matsol,seqpre, datpre, datcad, tiptrp, qtdkm, vlrdes, juspre,numevt,odofim,odoini)
          Values($mat,$seqpre,'$datpre','$datcad',4,0,$vlrdes,'$juspre',$tipo,0,0)";
      //var_dump($query);

$dados = mssql_query($query) or die('Erro ao Inserir.');
      	 mssql_query("Exec dbo.pr_calcular_saldo $numcad");

if($dados = True){
  
   $result = 0;  
}else{
   $result = 1;	
}

echo json_encode($result);