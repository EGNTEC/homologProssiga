<?php

  $serv ="192.168.0.40";#SRVCID09
  $us="sa";#"dbadmprossiga";
  $pass="3Ss@3d1f!C1L";#"homologprossiga";
  $sqlconnect=mssql_connect($serv, $us, $pass);
  $sqldb=mssql_select_db("Prossiga",$sqlconnect) or die('Erro no Banco');

  