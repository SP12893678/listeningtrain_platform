<?php
    session_start();
    require_once './connect.php';
    $type = $_GET['type'];
    switch ($type) {
        case 'get':
            $identity = '學生';
            $amount = 'all';
            $sql = "SELECT * FROM `user` WHERE `identity` = '$identity'";
            $result = mysqli_query($con, $sql);
            $data = [];
            while($row = mysqli_fetch_array($result))
            {
                array_push($data,$row);
            }
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;
        case 'insert':
            $identity = '學生';
            $creator = $_SESSION['account'];
            $items = $_GET["items"];
            $sql = "INSERT INTO `user`(`account`, `password`, `name`,`mail`,`creator`,`identity`,`tags`) VALUES ";
            foreach($items as $key => $value){
                $item = json_decode($value,true);
                $account = $item['account']; 
                $password = $item['password']; 
                $name = $item['name'];
                $mail = $item['email'];
                $tags = implode(",",$item['tags']); 
                $sql .= "('$account','$password','$name','$mail','$creator','$identity','$tags'),";
            }
            $sql = substr($sql,0,strlen($sql) - 1);
            $result = mysqli_query($con, $sql);
            $data['result'] = $result;
            $data['sql'] = $sql;
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;
        default:
            break;
    }

