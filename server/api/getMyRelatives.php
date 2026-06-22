<?php
global $db;
require_once "../cors.php";
require_once "../db.php";
session_start();
$student_id = $_SESSION["user_id"];

header("Content-Type: application/json");

$stmt = $db->prepare("SELECT * FROM relatives WHERE student_id = ?");
$stmt->bind_param("i", $student_id);
$stmt->execute();
$result = $stmt->get_result();

$articles = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($articles);
