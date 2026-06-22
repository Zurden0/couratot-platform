<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

$relative_id = isset($_POST["relative_id"]) ? $_POST["relative_id"] : null;

$stmt = $db->prepare("DELETE FROM relatives WHERE id = ?");
$stmt->bind_param("i", $relative_id);
$stmt->execute();

echo "ok";

