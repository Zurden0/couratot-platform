<?php
global $db;
require_once "../cors.php";
require_once "../db.php";


header("Content-Type: application/json");

$stmt = $db->prepare("SELECT id, login, role FROM users WHERE role != 'admin'");
$stmt->execute();
$result = $stmt->get_result();

$users = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($users);
