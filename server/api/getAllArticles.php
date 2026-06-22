<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

header("Content-Type: application/json");

$stmt = $db->prepare("SELECT * FROM announcements");
$stmt->execute();
$result = $stmt->get_result();

$articles = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($articles);
