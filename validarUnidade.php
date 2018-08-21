<?php
session_start(); 
include("php/conn.php");

$numloc   = $_GET['numloc'];
$numcad   = $_SESSION['matricula'];
$password = $_SESSION['password'];   

$selectString = "SELECT	nomloc From tVTRHhior Where numloc = $numloc";
$queryString  = mssql_query($selectString);
$arrayString  = mssql_fetch_array($queryString);
$nomloc 	  = $arrayString['nomloc'];	


header("location:/teste2/php/autent.php?username=".$numcad.'&password='.$password.'&numloc='.$numloc.'&nomloc='.$nomloc); 













