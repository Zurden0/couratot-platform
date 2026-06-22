<?php
global $db;
require_once "../cors.php";
require_once "../db.php"; // подключение к БД

$username = $_POST["login"];
$password = $_POST["pass"];

// Проверка на пустые поля
if (empty($username) || empty($password)) {
    echo "Поля не должны быть пустыми";
    exit;
}

$stmt = $db->prepare("SELECT * FROM users WHERE login = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Проверяем, существует ли пользователь
if (!$user) {
    echo "Неверный логин или пароль";
    exit;
}

// Проверяем пароль
if ($password != $user["password"]) {
    echo "Неверный логин или пароль";
    exit;
}

// Авторизация успешна
session_start();
if ($user["role"] === "student") {
    $_SESSION["user_id"] = $user["id"];
} else {
    $_SESSION["curator_id"] = $user["id"];
}

$_SESSION["role"] = $user["role"];


echo "OK";

