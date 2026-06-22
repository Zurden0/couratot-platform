<?php
global $db;
require_once "../cors.php";
require_once "../db.php";

session_start();
$curator_id = $_SESSION["curator_id"];


$stmt = $db->prepare("
SELECT 
    g.id AS group_id,
    g.name AS group_name,

    u.login AS curator_name,

    s.id AS student_id,
    s.first_name,
    s.last_name

FROM `groups` g
LEFT JOIN users u ON u.id = g.curator_id
LEFT JOIN students s ON s.group_id = g.id

ORDER BY g.id;
");


$stmt->execute();
$result = $stmt->get_result();
$rows = $result->fetch_all(MYSQLI_ASSOC);

$result = [];

foreach ($rows as $row) {
    $gid = $row['group_id'];

    if (!isset($result[$gid])) {
        $result[$gid] = [
            'groups_id' => $gid,
            'groups_name' => $row['group_name'],
            'curator_name' => $row['curator_name'],
            'students' => []
        ];
    }

    if ($row['student_id']) {
        $result[$gid]['students'][] = [
            'id' => $row['student_id'],
            'first_name' => $row['first_name'],
            'last_name' => $row['last_name']
        ];
    }
}

$result = array_values($result);

echo json_encode($result);