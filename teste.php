<?php

//$date = date('Oct  1 2017 12:00:00:000AM','d-m-Y');

//$dt_fer=date('d/m/Y', strtotime('Oct  1 2017 12:00:00:000AM'));

//echo $dt_fer;

$juspre = 'timbò';

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


echo $juspre;
