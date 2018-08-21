<?php
session_start();
ob_start();
include('conn.php');

$username = $_POST["username"];
$password = $_POST["password"];
$dia= date('m');
$ano= date('Y');

$query = mssql_query("
	   SELECT func.numcad, 
		func.nomfun,
		func.numcpf,
		func.numloc,
		func.nomloc as unidade,
		func.numreg,
		hior.nomloc as regional,
		func.emacom,
		func.codcar,
		func.titred,
		func.codniv,
		tppe.desper as desper
from	tVTRHfunc func

			inner join tVTRHhior hior on
					hior.numloc = func.numreg

			inner join tPROStppe tppe on
					tppe.codper = func.codniv

where func.numcad ='$username' AND func.numcpf='$password' AND func.sitafa=1") or die('Erro ao setar as configurações do colaborador!');

//consulta sql
$row =  mssql_num_rows($query);
$dados = mssql_fetch_array($query);

//Pegar valor de saldo do colaborador logado
//$stringSaldo = mssql_query("SELECT sum(vlrpre) - (select sum(vlrpla) from tPROSabpl where matfun=$username) AS saldo
//FROM tPROSabpr WHERE matfun=$username");

 #$stringSaldo = mssql_query("Select dbo.fn_calcular_saldo ($username) as saldo");
 $prSldo = mssql_query("Exec dbo.pr_calcular_saldo $username");
 $stringSaldo = mssql_query("select dbo.fn_buscar_saldo ($username) as saldo");
 $arraySaldo  = mssql_fetch_array($stringSaldo);

 $saldo = $arraySaldo['saldo'];
//fim

//Pegar a situação da prestação e planejamento do periodo.
 $stringSitpla = mssql_query("Select dbo.fn_Consultar_Situacao ($username) as situacao");

 $arraySitpla = mssql_fetch_array($stringSitpla);
 $sit = $arraySitpla['situacao'];

//=======================================================================================

$stringSitpre = mssql_query("SELECT stspre FROM tPROSabpr WHERE seqpla='$idsit'");
$rowSitpre = mssql_num_rows($stringSitpre);
$arraySitpre = mssql_fetch_array($stringSitpre);
$stspre = $arraySitpre['stspre'];
//========================================================================================

//variaveis de sessão

$_SESSION['matricula'] = $dados['numcad'];
$_SESSION['colaborador'] = $dados['nomfun'];
$_SESSION['codcargo']   = $dados['codcar'];
$_SESSION['cargo']   = $dados['titred'];
$_SESSION['nomund']  = $dados['nomloc'];
$_SESSION['codund']  = $dados['numloc'];
$_SESSION['codreg']  = $dados['numreg'];
$_SESSION['codniv']  = $dados['codniv'];
$_SESSION['nomund']  = $dados['unidade'];
$_SESSION['nomreg']  = $dados['regional'];
$_SESSION['descniv'] = $dados['desper'];
$_SESSION['emacom']  = $dados['emacom'];
$_SESSION['saldo']   = $saldo;
$_SESSION['descsit'] = $sit;

#variaveis para limite de tempo
$_SESSION['limite'] = 3000; //equivale a 5 min 300 || 1800 = 30min || 3600 = 60min || 3000=50min
$_SESSION['registro'] = time();
#=========================================================================================================
 if($row <= 0){

    //echo "{success:0}"; //falha
	header("location:https://novoprossiga.inec.org.br/index.php?ret=1");

 }else{

    //echo "{success:1}"; //sucesso
	header("location:https://novoprossiga.inec.org.br/principal.php");
 }
