<?php
    require_once './connect.php';
    $type = $_GET['type'];
    switch ($type) {
        case 'get':
            $amount = $_GET['amount'];
            if($amount == 'all')
            {
                $sql = "SELECT * FROM enviro where 1";
                $result = mysqli_query($con, $sql);
                if (!$result) {
                    printf("Error: %s\n", mysqli_error($con));
                    exit();
                }
                $data = [];
                while($row = mysqli_fetch_array($result))
                {
                    array_push($data,$row);
                }
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            else if($amount == 'one'){
                $item = $_GET['item'];
                $sql = "SELECT * FROM enviro where id = '". $item ."'";
                $result = mysqli_query($con, $sql);
                echo json_encode(mysqli_fetch_array($result), JSON_UNESCAPED_UNICODE);
            }
            break;
        case 'delete':
            
            $id = $_GET['id'];
            $sql = "DELETE FROM enviro WHERE id = '". $id ."'";
            break;
        default:
            # code...
            break;
    }