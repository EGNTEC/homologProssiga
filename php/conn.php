<?php

  $serv ="192.168.0.135";#SRVCID09
  $us="sa";#"dbadmprossiga";
  $pass="root";#"homologprossiga";
  $sqlconnect=mssql_connect($serv, $us, $pass);
  $sqldb=mssql_select_db("Prossiga",$sqlconnect) or die('Erro no Banco');

  