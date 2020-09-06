<?php
    require_once './connect.php';
    $type = $_GET['type'];
    switch ($type) {
        case 'get':
            $amount = $_GET['amount'];
            if($amount == 'part')
            {
                $items = $_GET['items'];
                $object_arr = join("','",$items);   
                $sql = "SELECT * FROM object WHERE id IN ('$object_arr')";
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
            break;
        case 'delete':

            // $items = $_GET['items'];
            // $object_arr = join(",",$items);
            // echo $object_arr;
            // $sql = "DELETE FROM data WHERE id IN (".$object_arr.")";
            break;
        case 'update':
            $data = [];
            $item = json_decode($_GET['item'],true);
            $id = $item['id'];
            $pic_src = $item['pic_src'];
            $sound_src = $item['sound_src'];
            $name = $item['name'];
            $coordinate = $item['coordinate'];
            $size = $item['size'];
            $angle = $item['angle'];
            $scale = $item['scale'];

            if ($id == -1) {
                $sql = "INSERT INTO `object` 
                (`pic_src`,`sound_src`,`name`,`coordinate`,`size`,`angle`,`scale`) 
                VALUES ('$pic_src','$sound_src','$name','$coordinate','$size','$angle','$scale')";
                $result = mysqli_query($con, $sql);
                $data['result'] = $result;
                $data['id'] = $con -> insert_id;
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            else{
                $sql = "UPDATE `object` SET 
                pic_src = '$pic_src',
                sound_src = '$sound_src',
                name = '$name',
                coordinate = '$coordinate',
                size = '$size',
                angle = '$angle',
                scale = '$scale'
                 WHERE `id` = $id";
                $result = mysqli_query($con, $sql);
                $data['result'] = $result;
                $data['id'] = $id;
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
        
            break;
        default:
            # code...
            break;
    }