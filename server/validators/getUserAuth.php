<?php
require_once "../cors.php";
session_start();

if (isset($_SESSION["curator_id"])) {
    echo $_SESSION["curator_id"];
} else {
    echo $_SESSION["user_id"];
}

