<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

// Получаем данные из POST
$group_id = isset($_POST["group_id"]) ? $_POST["group_id"] : null;
$first_name = isset($_POST["first_name"]) ? $_POST["first_name"] : null;
$last_name = isset($_POST["last_name"]) ? $_POST["last_name"] : null;
$other_name = isset($_POST["other_name"]) ? $_POST["other_name"] : null;
$login = isset($_POST["login"]) ? $_POST["login"] : null;

// 1. Создаём пользователя
$stmt1 = $db->prepare("INSERT INTO users (login) VALUES (?)");

if (!$stmt1) {
    die("SQL error stmt1: " . $db->error);
}

$stmt1->bind_param("s", $login);
$stmt1->execute();

$user_id = $stmt1->insert_id;

// 2. Создаём студента
$stmt2 = $db->prepare("
    UPDATE students SET first_name = ?, last_name = ?, other_name = ?, group_id = ? WHERE id = ?
");

if (!$stmt2) {
    die("SQL error stmt2: " . $db->error);
}

$stmt2->bind_param("sssii", $first_name, $last_name, $other_name, $group_id, $user_id);
$stmt2->execute();

echo "ok";
