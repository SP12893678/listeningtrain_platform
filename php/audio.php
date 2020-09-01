<?php
    require_once './connect.php';
    $type = $_GET['type'];
    switch ($type) {
        case 'get':
            $amount = $_GET['amount'];
            if($amount == 'all')
            {
                $sql = "SELECT * FROM data where 1";
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
                $audio_arr = join("','",$items);
                $sql = "SELECT * FROM data where id IN ('$audio_arr')";
                $result = mysqli_query($con, $sql);
                $data = [];
                while($row = mysqli_fetch_array($result))
                {
                    array_push($data,$row);
                }
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            break;
        case 'edit':

            //id為依序排列的數字,當同時間有人儲存/刪除時,可能發生問題
            $sql = "SELECT COUNT(*) FROM data";
            $result = mysqli_query($con, $sql);
            $count =  mysqli_fetch_array($result)[0];
            //id > 0 用update
            //id = -1 用insert
            // $sql = "SELECT MAX(id) AS 'max_value' FROM object WHERE 1";
            // $sql = "UPDATE `data` SET `id`='',`pic_src`='',`sound_src`='',`category`='',`name`='',`frequency`='',`waveform`='',`created_time`='',`audio_id`='' WHERE 1";
            // $sql = "UPDATE
            //             `data` 
            //         SET
            //             `id` = '',
            //             `pic_src` = '',
            //             `sound_src` = '',
            //             `category` = '',
            //             `name` = '',
            //             `frequency` = '',
            //             `waveform` = '',
            //             `created_time` = '',
            //             `audio_id` = ''
            //         WHERE
            //             1";
            // $sql = "INSERT INTO table_name
            // VALUES (value1_1, value2_2, value3_3,···),
            // (value2_1, value2_2, value2_3,···),
            // (value3_1, value3_2, value3_3,···),";


            // $sql = "INSERT INTO data (`id`, `pic_src`, `sound_src`, `category`, `name`, `frequency`, `waveform`, `created_time`, `audio_id`) 
            // VALUES (1,1,1),(2,2,3),(3,9,3),(4,10,12)
            // ON DUPLICATE KEY UPDATE Col1=VALUES(Col1),Col2=VALUES(Col2);";
            break;
        case 'delete':

            // $items = $_GET['items'];
            // $audio_arr = join(",",$items);
            // echo $audio_arr;
            // $sql = "DELETE FROM data WHERE id IN (".$audio_arr.")";
            break;
        case 'upload':
            $data = [];
            echo count($_FILES['file']['tmp_name']);
            // if(is_uploaded_file($_FILES['file']['tmp_name'])){
            //     $upfile=$_FILES["file"]; 
            //     $data['name']=$upfile["name"];
            //     $data['type']=$upfile["type"];
            //     $data['size']=$upfile["size"]; 
            //     $data['tmp_name']=$upfile["tmp_name"];
            // }
            // // if (move_uploaded_file($_FILES["file"]["tmp_name"], $_FILES['file']['name'])){}
            // echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;
        default:
            # code...
            break;
    }

    //檔案儲存 -> 資料庫填寫
    //檔案儲存失敗 -> X