<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

$uploadDir = __DIR__ . "/../storage/";
$name = $_POST["name"];

session_start();
$student_id = $_SESSION["user_id"];

$stmt = $db->prepare("DELETE FROM documents WHERE name = ? and student_id = ?");
$stmt->bind_param("si", $name, $student_id);
$stmt->execute();

echo "ok";