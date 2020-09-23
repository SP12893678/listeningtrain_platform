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
        case 'update':
            $data = [];
            $item = json_decode($_GET['item'],true);
            $id = $item['id'];
            $background_src = $item['background_src'];
            $category = $item['category'];
            $name = $item['name'];
            $object = $item['object'];
            if ($id == -1) {
                $sql = "INSERT INTO `enviro`
                (`background_src`, `category`, `name`, `object`) VALUES 
                ('$background_src','$category','$name','$object')";
                $result = mysqli_query($con, $sql);
                $data['result'] = $result;
                $data['id'] = $con -> insert_id;
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            else{
                $sql = "UPDATE `enviro` SET 
                `background_src`='$background_src',
                `category`='$category',
                `name`='$name',
                `object`='$object'
                 WHERE `id` = $id";
                $result = mysqli_query($con, $sql);
                $data['result'] = $result;
                $data['id'] = $id;
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            break;
        // case 'none':
        //     $data = [];
        //     $item = $_GET['data'];
        //     for ($index=0; $index < 100000; $index++) { 
        //         array_push($data,$item);
        //     }
        //     echo json_encode($data, JSON_UNESCAPED_UNICODE);
        //     break;
        default:
            # code...
          
            break;
    }