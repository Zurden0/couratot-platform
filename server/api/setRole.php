<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

$role = $_POST["role"];
$id = $_POST["id"];

$stmt = $db->prepare("UPDATE users SET role = ? WHERE id = ?");
$stmt->bind_param("si", $role, $id);
$stmt->execute();

echo "ok";
