<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

$name = $_POST["name"];

$stmt = $db->prepare("INSERT INTO `groups`(name) VALUES (?)");
$stmt->bind_param("s", $name);
$stmt->execute();

echo "ok";