<?php
session_start();
ob_start();
include('conn.php');

$dia= date('m');
$ano= date('Y');
$usuario = $_POST["username"];
#Autenticção Via LDAP

$dominio = '@cidadania.intra.ong';
$user = $_POST["username"].$dominio;#inecteste
$pass = $_POST["password"];#inec123

$ldap_serv = 'ldap://192.168.10.4';
$ldap_port = '389';
$lc = ldap_connect($ldap_serv, $ldap_port);
ldap_set_option($lc, LDAP_OPT_REFERRALS, 0);
ldap_set_option($lc, LDAP_OPT_PROTOCOL_VERSION, 3);
$ldapbind = ldap_bind($lc,$user,$pass);

if ($ldapbind == false) {
  #echo 'Usuario ou Senha, incorretos(LDAP).';
  echo json_encode(0);//falha

}
else
{
  #echo "Logado com sucesso!";
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

    where func.numcad ='$usuario' AND func.sitafa=1") or die('Erro ao setar as configurações do colaborador!');

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
    //Recalcular a procedure de saldo.
    $QueryCalcSldo = mssql_query("Select matfun From tPROSsldo");

    while($ArrayCalcSldo = mssql_fetch_array($QueryCalcSldo)){
      $matricula = $state['matfun'];
      $prSldo = mssql_query("Exec dbo.pr_calcular_saldo $matricula");
    }
    #=========================================================================================================
    if($row <= 0){

       //echo "{success:0}"; //falha
     header("location:https://novoprossiga.inec.org.br/index.php?ret=1");

    }else{

       //echo "{success:1}"; //sucesso
     header("location:https://novoprossiga.inec.org.br/principal.php");
    }
}
