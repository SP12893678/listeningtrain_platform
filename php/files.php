<?php
    $type = $_GET['type'];
    switch ($type) {
        case 'upload':
            $file_data = $_GET['data'];
            $data = [];
            // $data['data'] = [];
            for ($index=0; $index < count($_FILES['file']['tmp_name']); $index++) {
                $file = json_decode($file_data[$index],true);
                $path = $_FILES['file']['name'][$index];
                $ext = pathinfo($path, PATHINFO_EXTENSION);
                $filename = '../static/images/enviro/' . $file['type'].'/tmp/' .uniqid(rand(), true) . '.' . $ext;
                move_uploaded_file($_FILES['file']["tmp_name"][$index], $filename);

                $content = [];
                $content['type'] = $file['type'];
                $content['filename'] = $filename;
                if($file['type'] == 'object')
                    $content['index'] = $file['index'];
                array_push($data,$content);
            }
            
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;
        default:
            break;
    }
