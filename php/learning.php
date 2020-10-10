<?php
 session_start();
    require_once './connect.php';
    $type = $_GET['type'];
    switch ($type) {
        case 'get':
            $data = [];
            $account = $_SESSION['account'];
            $sql = "SELECT * FROM learning where account='$account'";
            $result = mysqli_query($con, $sql);
            break;
        case 'update':
            $data = [];
            $mode = $_GET['mode'];
            switch ($mode) {
                case 'train':
                    $item = $_GET['item'];
                    $data = [];
                    $account = $_SESSION['account'];
                    $sql = "SELECT * FROM `learning` where account='$account'";
                    $result = mysqli_query($con, $sql);
                    if(mysqli_num_rows($result)<1) insertEmptyTable($con);

                    $sql = "SELECT * FROM `learning` where account='$account'";
                    $result = mysqli_query($con, $sql);
                    $passdata = mysqli_fetch_array($result);
                    $items = json_decode($passdata['train'], true);               
                    $item = json_decode($item, true);
                    array_push($items['train'],$item);
                    
                    $items = json_encode($items, JSON_UNESCAPED_UNICODE);
                    $sql = "UPDATE `learning` SET 
                    train = '$items'
                    WHERE `account` = '$account'";
                    $result = mysqli_query($con, $sql);
                    $data['result'] = $result;
                    $data['sql'] = $sql;
                    echo json_encode($data, JSON_UNESCAPED_UNICODE);
                    break;
                default:
                    # code...
                    break;
            }
            break;
        default:
            # code...
            break;
    }

function insertEmptyTable($con)
{
    $past_data = [];
    $past_data['train'] = [];
    $account = $_SESSION['account'];
    $past_data = json_encode($past_data, JSON_UNESCAPED_UNICODE);
    $sql = "INSERT INTO `learning` (`account`,`train`) VALUES ('$account','$past_data')";
    $result = mysqli_query($con, $sql);
}