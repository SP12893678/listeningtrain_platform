<?php
    session_start();
    require_once './connect.php';
    $type = $_GET['type'];
    switch ($type) {
        case 'get':
            $data = [];
            $account = $_SESSION['account'];
            $sql = "SELECT * FROM test where account='$account'";
            $result = mysqli_query($con, $sql);
            // $data['count'] = mysqli_num_rows($result);
            echo json_encode(mysqli_fetch_array($result), JSON_UNESCAPED_UNICODE);
            break;
        case 'update':
            $account = $_SESSION['account'];
            $data = $_GET['data'];
            $sql = "SELECT * FROM test where account='$account'";
            $result = mysqli_query($con, $sql);
            $data_count = mysqli_num_rows($result);
            $past_data = [];
            $past_data['exam'] = [];
            if($data_count == 0){
                array_push($past_data['exam'],json_decode($data, true));
                $past_data = json_encode($past_data, JSON_UNESCAPED_UNICODE);
                $sql = "INSERT INTO `test`(`account`, `exam`) VALUES ('$account','$past_data')";
            }
            else{
                $row = mysqli_fetch_array($result);
                $past_data = json_decode($row['exam'], true);
                array_push($past_data['exam'],json_decode($data, true));
                $past_data = json_encode($past_data, JSON_UNESCAPED_UNICODE);
                $sql = "UPDATE `test` SET `exam`='$past_data' WHERE account = '$account'";
            }
            $result = mysqli_query($con, $sql);
            $text = [];
            $past_data = json_decode($row['exam'], true);
            $text['data'] = $past_data;
            $text['result'] = $result;
            echo json_encode($text, JSON_UNESCAPED_UNICODE);
            break;
        default:
            # code...
            break;
    }


