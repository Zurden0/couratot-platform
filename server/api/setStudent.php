<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

$student_id = $_POST['id'];

session_start();
$_SESSION["user_id"] = $student_id;

echo "ok";