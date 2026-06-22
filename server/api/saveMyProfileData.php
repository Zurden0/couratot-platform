<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

session_start();

$user_id = $_SESSION["user_id"];

// Получаем данные из POST
$first_name = isset($_POST["first_name"]) ? $_POST["first_name"] : null;
$last_name = isset($_POST["last_name"]) ? $_POST["last_name"] : null;
$other_name = isset($_POST["other_name"]) ? $_POST["other_name"] : null;
$birthday = isset($_POST["birth_date"]) ? $_POST["birth_date"] : null;

$phone = isset($_POST["phone"]) ? $_POST["phone"] : null;
$mail = isset($_POST["mail"]) ? $_POST["mail"] : null;
$lifePlace = isset($_POST["address"]) ? $_POST["address"] : null;

$personalStatus = isset($_POST["personal_status"]) ? $_POST["personal_status"] : null;
$familyStatus = isset($_POST["family_status"]) ? $_POST["family_status"] : null;
$citizenship = isset($_POST["citizenship"]) ? $_POST["citizenship"] : null;
$workplace = isset($_POST["workplace"]) ? $_POST["workplace"] : null;
$education = isset($_POST["education"]) ? $_POST["education"] : null;

// SQL запрос
$stmt = $db->prepare("
    UPDATE students SET
        first_name = ?,
        last_name = ?,
        other_name = ?,
        birth_date = ?,
        phone = ?,
        address = ?,
        personal_status = ?,
        family_status = ?,
        citizenship = ?,
        workplace = ?,
        education = ?,
        mail = ?
    WHERE id = ?
");

$fields = [
    $first_name, $last_name, $other_name, $birthday,
    $phone, $mail, $lifePlace, $personalStatus,
    $familyStatus, $citizenship, $workplace, $education
];

foreach ($fields as &$f) {
    if ($f === "null" || $f === "") {
        $f = null;
    }
}

$stmt->bind_param(
    "ssssssssssssi",
    $first_name,
    $last_name,
    $other_name,
    $birthday,
    $phone,
    $lifePlace,
    $personalStatus,
    $familyStatus,
    $citizenship,
    $workplace,
    $education,
    $mail,
    $user_id
);

$stmt->execute();

echo json_encode("OK");
