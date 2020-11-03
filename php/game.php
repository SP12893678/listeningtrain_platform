<?php
 session_start();
    require_once './connect.php';
    $type = $_GET['type'];
    switch ($type) {
        case 'get':
            $data = [];
            if(!checkUserDataExist($con)) insertEmptyTable($con);
            $account = $_SESSION['account'];
            $sql = "SELECT * FROM game where account='$account'";
            $result = mysqli_query($con, $sql);
            echo json_encode(mysqli_fetch_array($result), JSON_UNESCAPED_UNICODE);
            break;
        case 'update':


            break;
        case 'update_mission':
            if(!checkUserDataExist($con)) insertEmptyTable($con);
            $func = $_GET['type'];
            $func($con);    
            break;
        default:
            # code...
            break;
    }

function checkUserDataExist($con){
    $account = $_SESSION['account'];
    $sql = "SELECT * FROM game where account='$account'";
    $result = mysqli_query($con, $sql);
    return mysqli_num_rows($result) >= 1;
}

function insertEmptyTable($con)
{
    $account = $_SESSION['account'];
    $sql = "INSERT INTO `game` (`account`) VALUES ('$account')";
    $result = mysqli_query($con, $sql);
}

function update_mission($con) {
    $id = $_GET['id'];
    $time = $_GET['time'];
    $account = $_SESSION['account'];
    $sql = "SELECT * FROM game where account='$account'";
    $result = mysqli_query($con, $sql);
    $data = mysqli_fetch_array($result);
    $missions = json_decode($data['mission'], true); 
    $mission = [];
    $mission['id'] = $id;
    $mission['time'] = $time;
    // $key = array_search($id, array_column($missions, 'id'));
    if(in_array($id, array_column($missions, 'id'))) {
        $key = array_search($id, array_column($missions, 'id'));
        $missions[$key] = $mission;
    }
    else array_push($missions,$mission);
    // if($key == false) array_push($missions,$mission);
    // else $missions[$key] = $mission;
    $missions = json_encode($missions, JSON_UNESCAPED_UNICODE);
    $sql = "UPDATE `game` SET mission = '$missions' WHERE `account` = '$account'";
    $result = mysqli_query($con, $sql);

    $data = [];
    $data['result'] = $result;
    $data['sql'] = $sql;
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}