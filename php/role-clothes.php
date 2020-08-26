<?php
    require_once './connect.php';
    $type = $_GET['type'];
    $name = $_GET['name'];
    switch ($type) {
        case 'get':
            $sql = "SELECT * FROM `role-clothing` WHERE name IN ('$name')";
            $result = mysqli_query($con, $sql);
            if (!$result) {
                printf("Error: %s\n", mysqli_error($con));
                exit();
            }
            $data = [];
            while($row = mysqli_fetch_array($result)){
                array_push($data,$row);
            }
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;
        case 'save':
            $gender = $_GET['gender'];
            $hair = $_GET['hair'];
            $clothes = $_GET['clothes'];
            $cleft = $_GET['cleft'];
            $cright = $_GET['cright'];
            $bottoms = $_GET['bottoms'];
            $shoe = $_GET['shoe'];
            $sright = $_GET['sright'];
            $h_deco = $_GET['h_deco'];
            $wrist_deco = $_GET['wrist_deco'];
            //check 是否有data
            $sql = "SELECT * FROM `role_clothing` WHERE name IN ('$name')";
            $result = mysqli_query($con, $sql);
            $row=mysqli_fetch_assoc($result);
            if ($row == null) {
                $save = "INSERT IGNORE INTO `role-clothing`(`name`, `gender`, `hair`, `clothes`, `cleft`, `cright`, `bottoms`, `shoe`, `sright`, `h_deco`, `wrist_deco`) VALUES ('$name','$gender','$hair','$clothes','$cleft','$cright','$bottoms','$shoe','$sright','$h_deco','$wrist_deco')";
            }
            else{
                //更新clothing data
                $save = "UPDATE `role-clothing` SET `gender`='$gender',`hair`='$hair',`clothes`='$clothes',`cleft`='$cleft',`cright`='$cright',`bottoms`='$bottoms',`shoe`='$shoe',`sright`='$sright',`h_deco`='$h_deco',`wrist_deco`='$wrist_deco' WHERE name='$name'";
            }
            $result = mysqli_query($con, $save);
            if (!$result) {
                printf("Error: %s\n", mysqli_error($con));
                exit();
            }
            $data = $row;
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;
        default:
            # code...
            break;
    }
    