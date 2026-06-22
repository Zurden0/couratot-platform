<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

session_start();
$student_id = $_SESSION["user_id"];

$stmt = $db->prepare("SELECT 	name, storage_place FROM documents WHERE student_id = ?");
$stmt->bind_param("i", $student_id);
$stmt->execute();
$result = $stmt->get_result();
$path = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($path);