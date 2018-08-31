<?php
session_start();
ob_start();
require("../../session.php");
include('../../conn.php');

$stspla = $_POST['sit'];
$numseq = $_POST['numseq'];
$vlrsol = $_POST['valsol'];

$strUpdtVlr = "Update tPROSplde Set vlrdes = $vlrsol Where seqpla = $numseq And vlrdes <> 0";
