<?php
session_start();
require("../../session.php");
include("../../conn.php");

$nomecol = $_SESSION['colaborador'];
$niv     = $_SESSION['codniv'];
$col     = $_SESSION['matricula'];
$codreg  = $_SESSION['codreg'];
$codund  = $_SESSION['codund'];
$programa= $_SESSION['programa'];
$codcargo= $_SESSION['codcargo'];

$mat    = $_GET['mat'];
$und    = $_GET['unid'];
$reg    = $_GET['reg'];
$sts    = $_GET['sts'];
$mes    = $_GET['mes'];
$ano    = $_GET['ano'];

$queryString = " SELECT Substring (Convert (Varchar(10), abpl.datpla, 103),4,7) AS mesref,

(Select Coalesce ((Select	max(Convert(Varchar(10), datlim, 103))
From		tPROSlipr lipr
Where	lipr.numseq = abpr.numseq),
Convert(Varchar(10), abpr.datlim, 103) )) as dtfim,

func.nomloc AS nomloc,
func.numcad AS numcad,
func.nomfun AS nomfun,
func.titred AS titred,
func.codcar As codcar,
abpr.qtdkm  AS qtdkm,
abpr.juspre AS juspre,
abpr.vlrpre AS vlrpre,
tptr.destrp AS destrp,
abpr.stspre AS stspre,
stts.dessts AS dessts,
abpr.numseq AS numseq,
abpr.seqpla AS seqpla,
abpl.tiptrp AS tiptrp,
(select vlrtrp from tPROSprtrge prtr
where prtr.parm ='$codcargo'
and	  prtr.datvig = (select max(datvig) from tPROSprtrge prtr2
                 where prtr2.numprg = prtr.numprg 
                 and	  prtr2.datvig <= abpl.datpla)) as vlrtrp

FROM tPROSabpr abpr
     INNER JOIN tPROSabpl abpl ON abpr.seqpla = abpl.numseq
     INNER JOIN tPROStptr tptr ON abpl.tiptrp = tptr.tiptrp
     INNER JOIN tPROSstts stts ON abpr.stspre = stts.numsts
     INNER JOIN tVTRHfunc func ON abpl.matfun = func.numcad 

Where abpl.matfun = $col And abpl.datpla > '03-01-2018'";

if($mes != ""){
	$mes = " And DATEPART(MONTH,abpl.datpla) = $mes";
}

if($ano != ""){
	$ano = " And DATEPART(MONTH,abpl.datpla) = $ano";
}

$queryString = $queryString.$mes.$ano; 

//var_dump($queryString);	

$query = mssql_query($queryString) or die('Erro ao filtrar aberturas');

$rows = array('data' => array());
while($abrplan = mssql_fetch_assoc($query)) {
    $rows['data'][] = $abrplan;
}

//encoda para formato JSON
  echo json_encode($rows);               
                    