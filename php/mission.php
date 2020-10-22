<?php
    require_once './connect.php';
    $type = $_GET['type'];
    switch ($type) {
        case 'get':
            $amount = $_GET['amount'];
            if($amount == 'all')
            {
                $sql = "SELECT * FROM mission where 1";
                $result = mysqli_query($con, $sql);
                $data = [];
                while($row = mysqli_fetch_array($result))
                {
                    array_push($data,$row);
                }
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            else if($amount == 'part')
            {
                $items = $_GET['items'];
                $mission_arr = join("','",$items);
                $sql = "SELECT * FROM mission where id IN ('$mission_arr')";
                $result = mysqli_query($con, $sql);
                $data = [];
                while($row = mysqli_fetch_array($result))
                {
                    array_push($data,$row);
                }
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            break;
        case 'update':
            $data = [];
            $item = json_decode($_GET['item'],true);
            $id = $item['id'];
            $type = $item['type'];
            $title = $item['title'];
            $description = $item['description'];
            $required = json_encode($item['required'], JSON_UNESCAPED_UNICODE);
            $rewards = json_encode($item['rewards'], JSON_UNESCAPED_UNICODE);

            if ($id == -1) {
                $sql = "INSERT INTO `mission` 
                (`title`,`description`,`type`,`required`,`rewards`) 
                VALUES ('$title','$description','$type','$required','$rewards')";
                $result = mysqli_query($con, $sql);
                $data['result'] = $result;
                $data['id'] = $con -> insert_id;
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            else{
                $sql = "UPDATE `mission` SET 
                title = '$title',
                description = '$description',
                type = '$type',
                required = '$required',
                rewards = '$rewards'
                 WHERE `id` = $id";
                $result = mysqli_query($con, $sql);
                $data['result'] = $result;
                $data['id'] = $id;
                $data['sql'] = $sql;
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            break;
        default:
            # code...
            break;
    }