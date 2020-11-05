<?php
    session_start();
    require_once './connect.php';
    $type = $_GET['type'];
    if(isset($_SESSION['account'])){
        $account = $_SESSION['account'];
    switch ($type) {
        /* 讀取角色個人資料 */
        case 'getData':
            $sql = "SELECT * FROM `roledata` WHERE account='$account'";
            $result = mysqli_query($con, $sql);
            if (!$result) {
                printf("Error: %s\n", mysqli_error($con));
                exit();
            }
            $data = mysqli_fetch_array($result);
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;
        /* 存取角色個人資料 */
        case 'saveData':
            $nickname = ($_GET['nickname']=='')?$account:$_GET['nickname'];
            $gender = $_GET['gender'];
            $birthday = $_GET['birthday'];
            $title = $_GET['title'];
            $money = $_GET['money'];
            //check 是否有data
            $sql = "SELECT * FROM `roledata` WHERE account='$account'";
            $result = mysqli_query($con, $sql);
            $row = mysqli_fetch_assoc($result);
            if ($row == null) {
                $save = "INSERT IGNORE INTO `roledata`(`account`, `nickname`, `gender`, `birthday`, `title`, `money`) VALUES ('$account','$nickname','$gender','$birthday','$title','$money')";
            }
            else{
                //更新clothing data
                $save = "UPDATE `roledata` SET `nickname`='$nickname',`title`='$title',`money`='$money' WHERE account='$account'";
            }
            $result = mysqli_query($con, $save);
            if (!$result) {
                printf("Error: %s\n", mysqli_error($con));
                exit();
            }
            $data = $row;
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;
        /* 存取角色身上服飾 */
        case 'saveClothing':
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
            $sql = "SELECT * FROM `roledata` WHERE account='$account'";
            $result = mysqli_query($con, $sql);
            $row = mysqli_fetch_assoc($result);
            if ($row == null) {
                $save = "INSERT IGNORE INTO `roledata`(`account`, `gender`, `hair`, `clothes`, `cleft`, `cright`, `bottoms`, `shoe`, `sright`, `h_deco`, `wrist_deco`) VALUES ('$account','$gender','$hair','$clothes','$cleft','$cright','$bottoms','$shoe','$sright','$h_deco','$wrist_deco')";
            }
            else{
                //更新clothing data
                $save = "UPDATE `roledata` SET `gender`='$gender',`hair`='$hair',`clothes`='$clothes',`cleft`='$cleft',`cright`='$cright',`bottoms`='$bottoms',`shoe`='$shoe',`sright`='$sright',`h_deco`='$h_deco',`wrist_deco`='$wrist_deco' WHERE account='$account'";
            }
            $result = mysqli_query($con, $save);
            if (!$result) {
                printf("Error: %s\n", mysqli_error($con));
                exit();
            }
            $data = $row;
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;
        /* 讀取角色擁有的服飾 */
        case 'getClothes':
            $sql = "SELECT * FROM `roleClothes` WHERE account='$account'";
            $result = mysqli_query($con, $sql);
            if (!$result) {
                printf("Error: %s\n", mysqli_error($con));
                exit();
            }
            $data = [];
            while($row = mysqli_fetch_array($result)){
                $data[$row['gender']] = $row;
            }
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;
        /* 存取角色獲得的服飾 */
        case 'saveClothes':
            $gender = $_GET['gender'];
            $category = $_GET['category'];
            $itemNoList = $_GET['itemNoList'];
            //check 是否有data
            $sql = "SELECT * FROM `roleClothes` WHERE account='$account' AND gender='$gender'";
            $result = mysqli_query($con, $sql);
            $row = mysqli_fetch_assoc($result);
            if ($row == null) {
                $save = "INSERT INTO `roleClothes`(`account`, `gender`, `$category`) VALUES ('$account','$gender','$itemNoList')";
                //INSERT INTO `roleClothes`(`account`, `gender`, `hair`) VALUES('55','gg','1,2,3')
            }
            else{
                //更新clothing data
                $save = "UPDATE `roleClothes` SET `$category`='$itemNoList' WHERE account='$account' AND gender='$gender'";
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
    }
    