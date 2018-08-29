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

$mat    = $_GET['mat'];
$und    = $_GET['unid'];
$reg    = $_GET['reg'];
$sts    = $_GET['sts'];
$mes    = $_GET['mes'];
$ano    = $_GET['ano'];


$queryString = " SELECT distinct Substring (Convert (Varchar(10), abpl.datpla, 103),4,7) AS datpla,
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
			where prtr.tiptrp = abpl.tiptrp
			and   prtr.parm =6500
			and	  prtr.datvig = (select max(datvig) from tPROSprtrge prtr2
									where prtr2.tiptrp = prtr.tiptrp
									and   prtr2.numprg = prtr.numprg 
									and	  prtr2.datvig <= abpl.datpla)) as vlrtrp,
		Convert (Varchar(10),abpl.datpla, 103) AS data

	FROM tPROSabpl abpl

                INNER JOIN tPROStptr tptr ON abpl.tiptrp = tptr.tiptrp
				INNER JOIN tPROSstts stts ON abpl.stspla = stts.numsts
				INNER JOIN tVTRHfunc func ON abpl.matfun = func.numcad
                INNER JOIN tPROSprtrge prtr ON prtr.tiptrp = abpl.tiptrp 
    
    WHERE abpl.matfun = $col And abpl.datpla > '03-01-2018'";

$query = mssql_query($queryString) or die('Erro ao filtrar aberturas');

$rows = array('data' => array());
while($abrplan = mssql_fetch_assoc($query)) {
    $rows['data'][] = $abrplan;
}

//encoda para formato JSON
  echo json_encode($rows);               
                    