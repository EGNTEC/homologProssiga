<?php
session_start();
require("session.php");
include("conn.php");

$codprg  = $_SESSION['usu_codprg'];
$codcargo= $_SESSION['codcargo'];
$descTrp = $_POST['tipTrp'];
$dataprestacao = $_POST['datpres'];

$dia=1;
$mes = date('m', strtotime($dataprestacao));
$ano = date('Y', strtotime($dataprestacao));
$Dtcad = $ano.'/'.$mes.'/'.$dia;

//echo $Dtcad;echo'<br>';

//Tratamento para passar programa.
if($codprg==1){
   
  $numprg=4002;
 
}else{

  $numprg=4003;
}

if($descTrp=="Proprio"){

   $idTrp = 1;
}else{

   $idTrp = 2;
}

$descKm = "SELECT p.vlrtrp as vlrtrp FROM tPROSprtr p
 WHERE p.datvig=(select max(q.datvig)
   from tPROSprtr q where
p.tiptrp = q.tiptrp
and q.datvig <= '$Dtcad'
and p.tiptrp  = $idTrp
and q.numprg  = $numprg)";

if ($codcargo == 6500 || $codcargo == 7800) {
  
  $descKm = " SELECT p.vlrtrp as vlrtrp FROM tPROSprtrge p
   WHERE p.datvig=(select max(q.datvig)
     from tPROSprtrge q where
  p.tiptrp = q.tiptrp
  and q.datvig <= '$Dtcad' and p.parm  = $codcargo )";
}

//var_dump($descKm);
$valKm = mssql_query($descKm);

$arrayKm = mssql_fetch_array($valKm);
$result  = $arrayKm['vlrtrp'];

//encoda para formato JSON
echo json_encode($result);
