<?php
global $db;
require_once "../cors.php";
require_once "../db.php";


session_start();
$user_id = $_SESSION["user_id"];

$stmt = $db->prepare("
SELECT students.*, users.login FROM students 
    JOIN users ON users.id = students.id
WHERE students.id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

echo json_encode($user, JSON_UNESCAPED_UNICODE);