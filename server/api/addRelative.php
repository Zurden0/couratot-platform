<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

session_start();
$student_id = $_SESSION["user_id"];

// Получаем данные из POST
$first_name = isset($_POST["first_name"]) ? $_POST["first_name"] : null;
$last_name = isset($_POST["last_name"]) ? $_POST["last_name"] : null;
$other_name = isset($_POST["other_name"]) ? $_POST["other_name"] : null;
$phone = isset($_POST["phone"]) ? $_POST["phone"] : null;
$type = isset($_POST["type"]) ? $_POST["type"] : null;
$workplace = isset($_POST["work"]) ? $_POST["work"] : null;
$residence = isset($_POST["lifePlace"]) ? $_POST["lifePlace"] : null;
$education = isset($_POST["education"]) ? $_POST["education"] : null;
$citizenship = isset($_POST["citizenship"]) ? $_POST["citizenship"] : null;
$birthday = isset($_POST["birth_date"]) ? $_POST["birth_date"] : null;

// SQL запрос
$stmt = $db->prepare("
    INSERT INTO relatives 
    (first_name, last_name, other_name, phone, type, workplace, residence, education, citizenship, birth_date, student_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssssssssi",
    $first_name,
    $last_name,
    $other_name,
    $phone,
    $type,
    $workplace,
    $residence,
    $education,
    $citizenship,
    $birthday,
    $student_id
);

$stmt->execute();


if ($stmt->error) {
    var_dump($stmt->error);
    exit;
}

echo json_encode("OK");
