<?php
session_start();
require("../../session.php");
include("../../conn.php");

$nomecol = $_SESSION['colaborador'];
$niv     = $_SESSION['codniv'];
$col     = $_SESSION['matricula'];
$codreg  = $_SESSION['codreg'];
$codund  = $_SESSION['codund'];
$programa= $_SESSION['usu_codprg'];
$codcargo = $_SESSION['codcargo'];

$mat    = $_GET['mat'];
$und    = $_GET['unid'];
$reg    = $_GET['reg'];
$sts    = $_GET['sts'];
$mes    = $_GET['mes'];
$ano    = $_GET['ano'];

//Tratamento para o tipo de cargo

if($niv == 6 ){
	$cargo = 6500;
}else
if($niv == 2 && $programa == 1){
	$cargo = 7800;
}else
if($niv == 2 && $programa == 2){
	$cargo = 7300;
}

$String = " SELECT distinct Substring (Convert (Varchar(10), abpl.datpla, 103),4,7) AS datpla,
func.nomloc AS nomloc,
func.numcad AS numcad,
func.nomfun AS nomfun,
func.titred AS cargo,
abpl.qtdcli AS qtdcli,
abpl.qtdkm  AS qtdkm,
abpl.vlrpla AS vlrpla,
tptr.destrp AS destrp,
abpl.stspla AS stspla,
stts.dessts AS dessts,
abpl.numseq AS numseq,
abpl.tiptrp AS tiptrp,
(select vlrtrp from tPROSprtrge prtr
where prtr.parm =$cargo
and	  prtr.datvig = (select max(datvig) from tPROSprtrge prtr2
						where prtr2.numprg = prtr.numprg 
						and	  prtr2.datvig <= abpl.datpla)) as vlrtrp,
Convert (Varchar(10),abpl.datpla, 103) AS data

FROM tPROSabpl abpl

	INNER JOIN tPROStptr tptr ON abpl.tiptrp = tptr.tiptrp
	INNER JOIN tPROSstts stts ON abpl.stspla = stts.numsts
	INNER JOIN tVTRHfunc func ON abpl.matfun = func.numcad
	INNER JOIN tPROSprtrge prtr ON prtr.parm = func.codcar 

Where 	func.codcar = $cargo And abpl.datpla > '03-01-2018'"; 

if ($niv != 6) {

	$String = $String." And func.numloc = $codreg ";
}

if(($mat == "" || $mat == null) && ($sts == "" || $sts == null)){

	$String = $String." And abpl.stspla = 2";
}	

if($mat != "" || $mat != null){

	$String = $String." And abpl.matfun = $mat ";	
}

if($sts != "" || $sts != null){

	$situacao = " And abpl.stspla = $sts" ;
}

if($mes != ""){
	$mes = "And DATEPART(MONTH,abpl.datpla) = $mes";
}

if($ano != ""){
	$ano = "And DATEPART(MONTH,abpl.datpla) = $ano";
}

$result = $String.$situacao.$mes.$ano;

//var_dump($result);

$query = mssql_query($result) or die('Erro ao filtrar solicitacao');

$rows = array('data' => array());
while($abrplan = mssql_fetch_assoc($query)) {
    $rows['data'][] = $abrplan;
}

//encoda para formato JSON
  echo json_encode($rows);               
                    