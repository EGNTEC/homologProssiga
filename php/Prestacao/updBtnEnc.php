<?php
session_start();
require("../session.php");
include("../conn.php");
include("../Funcoes/enviarEmail.php");

$tiptrp=$_POST['tiptrp'];
$id=$_POST['id'];
$codcargo= $_SESSION['codcargo'];
//$vlrpre=$_POST['vlrpre'];
//$mat = $_SESSION['matricula'];
$solicitante  = $_SESSION['matricula'];
$nomSolicitante = $_SESSION['colaborador'];
$numRegional = $_SESSION['codreg'];
$acao = "finalizado";

//Tratamento para pegar matricula
$queryMat = mssql_query("select matfun from tprosabpr WHERE numseq = '$id'");
$arrayMat = mssql_fetch_array($queryMat);
$mat = $arrayMat['matfun'];

//Tratamento para pegar valor total ao finalizar
$queryTot = mssql_query("SELECT isnull(sum(vlrdes),0) AS vlrpre FROM tPROSprde WHERE seqpre=$id");
$arrayTot = mssql_fetch_array($queryTot);
$vlrpre   = $arrayTot['vlrpre']; 

//Tratamento para prestações que passou da data limite
$queryLimite = mssql_query("select count(*) as result from tproslipr where numseq=$id");
$arrayLimite = mssql_fetch_array($queryLimite);
$lipre = $arrayLimite['result'];

//Tratamento para o valor teto

$queryString = "SELECT isnull(p.vlrprm,0) As vlrprm,p.datvig as inicio
             FROM tPROSparm p 
            WHERE p.datvig = (select max(q.datvig)
                              from tPROSparm q 
                              where p.numprm=q.numprm
                              and q.datvig < getdate() 
                              and q.numprm =";

if($tiptrp==1){

   $queryString = $queryString."2)"; 

}else{

   $queryString = $queryString."4)";     
}

$valTeto = mssql_query($queryString);

$arrayValTeto = mssql_fetch_array($valTeto);
$vlrprm = $arrayValTeto['vlrprm'];


  //Tratamento para verificar se o valor total da prestação 
  // e parametro é vazio,nulo

  if($vlrpre == 0){ //prestação

      $result = 3;

      $prSldo = mssql_query("Exec dbo.pr_calcular_saldo $mat");

      $stringSitpla = mssql_query("Select dbo.fn_Consultar_Situacao ($mat) as situacao");

  }else
  if($vlrprm == 0){ //parâmetro

      $result = 4; 

  }else
  //Fim do tratamento

  if($vlrpre > $vlrprm){ // se o valor da prestação for maior que o parâmetro.
     $result = 1;
                                  
   }else{

        $result = 2;  // altera normalmente
        
        $queryUpdt = "UPDATE tPROSabpr SET stspre=1 WHERE numseq = '$id' ";
        $query = mssql_query($queryUpdt) or die('Erro ao alterar registro.');

        $strGer = "Select numcad,nomfun,emacom From tVTRHfunc Where codcar = 6500 And numloc = $numRegional";
        $queryGer = mssql_query($strGer);
        $arrayGer = mssql_fetch_array($queryGer);

        $aprovador= $arrayGer['numcad'];
        $nomAprovador= $arrayGer['nomfun'];
        $email= $arrayGer['emacom']; //Para quem enviar

        if($codcargo == 6500){
            $email = 'grupogerenciageraloperacoes@inec.org.br';
            $aprovador = 000;
            $nomAprovador = 'Gerência Geral';            
        }
        
        echo enviarEmail('emerson.gomes@inec.org.br',$solicitante,$nomSolicitante,$aprovador,$nomAprovador,$acao);
       
       $prSldo = mssql_query("Exec dbo.pr_calcular_saldo $mat");

       $stringSitpla = mssql_query("Select dbo.fn_Consultar_Situacao ($mat) as situacao"); 
   }

  echo json_encode($result);




