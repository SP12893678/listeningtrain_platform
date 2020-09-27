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
            $items = $_GET['items'];
            $audio_arr = join(",",$items);
            $sql = "DELETE FROM data WHERE id IN (".$audio_arr.")";
            $result = mysqli_query($con, $sql);
            $data['result'] = $result;
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;
        case 'upload': 
            $file_data = $_GET['data'];
            $data = [];
            for ($index=0; $index < count($_FILES['file']['tmp_name']); $index++) {
                $file = json_decode($file_data[$index],true);
                $path = $_FILES['file']['name'][$index];
                $ext = pathinfo($path, PATHINFO_EXTENSION);
                $filename = '../static/sound/tmp/' .uniqid(rand(), true) . '.' . $ext;
                move_uploaded_file($_FILES['file']["tmp_name"][$index], $filename);

                $content = [];
                $content['index'] = $file['index'];
                $content['filename'] = $filename;
                array_push($data,$content);
            }
            
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;
        case 'update':
            $data = [];
            $item = json_decode($_GET['item'],true);
            $id = $item['id'];
            $sound_src = $item['sound_src'];
            $category = implode(";",$item['category']);
            $name = $item['name'];
            $frequency = implode(";",$item['frequency']);
            $waveform = $item['waveform'];
            $audio_id = $item['audio_id'];

            if ($id == -1) {
                $sql = "INSERT INTO `data` 
                (`sound_src`,`category`,`name`,`frequency`,`waveform`,`audio_id`) 
                VALUES ('$sound_src','$category','$name','$frequency','$waveform','$audio_id')";
                $result = mysqli_query($con, $sql);
                $data['result'] = $result;
                $data['id'] = $con -> insert_id;
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            }
            else{
                $sql = "UPDATE `data` SET 
                sound_src = '$sound_src',
                category = '$category',
                name = '$name',
                frequency = '$frequency',
                waveform = '$waveform',
                audio_id = '$audio_id'
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

    //檔案儲存 -> 資料庫填寫
    //檔案儲存失敗 -> X