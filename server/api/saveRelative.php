<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

$first_name = isset($_POST["first_name"]) ? $_POST["first_name"] : null;
$last_name = isset($_POST["last_name"]) ? $_POST["last_name"] : null;
$other_name = isset($_POST["other_name"]) ? $_POST["other_name"] : null;
$phone = isset($_POST["phone"]) ? $_POST["phone"] : null;
$type = isset($_POST["type"]) ? $_POST["type"] : null;
$workplace = isset($_POST["workplace"]) ? $_POST["workplace"] : null;
$residence = isset($_POST["residence"]) ? $_POST["residence"] : null;
$education = isset($_POST["education"]) ? $_POST["education"] : null;
$citizenship = isset($_POST["citizenship"]) ? $_POST["citizenship"] : null;
$birth_date = isset($_POST["birth_date"]) ? $_POST["birth_date"] : null;

$relative_id = isset($_POST["id"]) ? $_POST["id"] : null;

$stmt = $db->prepare("
    UPDATE relatives 
    SET 
        first_name = ?,
        last_name = ?,
        other_name = ?,
        phone = ?,
        type = ?,
        workplace = ?,
        residence = ?,
        education = ?,
        citizenship = ?,
        birth_date = ?
    WHERE id = ? 
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
    $relative_id
);

$stmt->execute();

echo "ok";