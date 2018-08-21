<?php
session_start(); 
include("php/conn.php");

$programa     = $_GET['programa'];
$numcad   	  = $_SESSION['matricula'];
$password 	  = $_SESSION['password'];   

header("location:/teste2/php/autent.php?username=".$numcad.'&password='.$password.'&programa='.$programa);