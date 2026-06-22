<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

$login = $_POST["login"];
$group_id = $_POST["id"];

$stmt1 = $db->prepare("SELECT id FROM users WHERE login = ? AND role = 'curator'");
$stmt1->bind_param("s", $login); // ← строка!
$stmt1->execute();
$result = $stmt1->get_result();
$curator = $result->fetch_assoc();

if (!$curator) {
    echo "Это не куратор";
    exit();
}

$curator_id = $curator['id'];

$stmt2 = $db->prepare("UPDATE `groups` SET curator_id = ? WHERE id = ?");
$stmt2->bind_param("ii", $curator_id, $group_id);
$stmt2->execute();

echo "ok";
