<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

$uploadDir = __DIR__ . "/../storage/";

$name = $_POST["name"];

if (!isset($_FILES["file"])) {
    die("Файл не получен");
}

$file = $_FILES["file"];
$filename = time() . "_" . basename($file["name"]);
$target = $uploadDir . $filename;

if (move_uploaded_file($file["tmp_name"], $target)) {
    $protocol = (!empty($_SERVER['HTTPS']) ? 'https' : 'http');
    $host = $_SERVER['HTTP_HOST'];

    $dir = $protocol . '://' . $host . '/server/storage/' . $filename;

    session_start();
    $student_id = $_SESSION["user_id"];

    $stmt = $db->prepare("INSERT INTO documents (name, storage_place, student_id) VALUES (?, ?, ?)");
    $stmt->bind_param("ssi", $name, $dir, $student_id);
    $stmt->execute();

    echo "ok";
} else {
    echo "Ошибка загрузки";
}
