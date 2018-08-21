<?php
session_start();
require("../session.php");
include("../conn.php");

$info = $_POST['records'];
$dataHoje = date('Y-m-d');

$data = json_decode($info);

foreach ($data as $key) {

   $numseq =$key->numseq ;

   $datpre1 =$key->datpre ;
   $datpreExplod = explode("-",$datpre1);
   $datpre = $datpreExplod[0]."-".$datpreExplod[1]."-".$datpreExplod[2];

   $seqpre =$key->seqpre;
   $qtdcli =$key->qtdcli ;
   $qtdkm  =$key->quilometro;
   $vlrdes =$key->vlrdes ;
   $juspre =$key->juspre ;
   $numevt =$key->numevt ;
   $tiptrp =$key->destrp ;

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

  if($tiptrp =="Proprio" || $tiptrp ==1){

     $tiptrp=1;
     $odoini =$key->odoini ;
     $odofim =$key->odofim ;

  }else
    if($tiptrp =="Coletivo" || $tiptrp ==2){

     $tiptrp =2;
     $odoini =$key->odoini ;
     $odofim =$key->odofim ;

  }


  $mat = $_SESSION['matricula'];

  //Tratamento para verificar se existem divergências na grid.
   if($vlrdes<0){

     $result = 2;
   }
   else
   /*if(($odoini!=0 && $odofim==0) || ($odoini==0 && $odofim!=0) ||
      ($odoini!=0 && $odofim!=0 && $juspre==" ") ||
      ($odoini==0 && $odofim==0 && $juspre!="")
    ){*/
    if(
       (
          ($odoini != 0 && $odofim==0) || ($odoini == 0 && $odofim!=0)) ||
          (($juspre==" " || $juspre=="")&&($odoini != 0 || $odofim!=0)) ||
          (($juspre!="" && $juspre!=" ") && ($odoini == 0 || $odofim==0)
       )

    ){

      $result = 1;
   }else{
      $result = 0;

    $queryUpdt="UPDATE tPROSprde
    set datpre='$datpre',datcad='$dataHoje',qtdkm=$qtdkm,vlrdes=$vlrdes,juspre='$juspre',numevt='$numevt',tiptrp='$tiptrp',seqpre='$seqpre',matsol='$mat',odoini='$odoini',odofim='$odofim' WHERE numseq=$numseq ";

    $query = mssql_query($queryUpdt) or die('Erro ao alterar registro de prestação.');
    //var_dump($queryUpdt);
   }

  //Fim tratamento
}

echo json_encode($result);
