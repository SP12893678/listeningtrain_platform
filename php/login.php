<?php
ini_set('display_errors', 1);
session_start();
require_once './connect.php'; 
$logintype = $_GET['type'];



switch ($logintype) {
    case 'checklogin':
        if(!isset($_SESSION['account']) ) {
           
            $data = ["0","0","0"];
            echo json_encode($data, JSON_UNESCAPED_UNICODE); 
        }else{
            
            $sac=$_SESSION['account'];
            $sql2 = "SELECT name  FROM user WHERE account='$sac'" ;
            $sql3 = "SELECT identity FROM user WHERE account='$sac'" ;
            $result2 = mysqli_query($con, $sql2);
            $result3 = mysqli_query($con, $sql3);
            $data = [];
            $row= mysqli_fetch_array($result2, MYSQLI_NUM);
            $row2 = mysqli_fetch_array($result3, MYSQLI_NUM);
             $name = implode(" ",$row); 
             $id = implode(" ",$row2); 
            array_push($data,$name);
            array_push($data,$id);
            array_push($data,"1");
        

            echo json_encode($data, JSON_UNESCAPED_UNICODE);   
        }

    break;

    case 'login':
        $ac = $_GET['account'];
        $pw = $_GET['password']; 
        
        $sql = "SELECT * FROM user WHERE account='$ac' AND  password='$pw'" ;
        $result = mysqli_query($con, $sql);
        $total_records = mysqli_num_rows($result);
        if ( $total_records > 0 ) {
            
            $_SESSION['account'] = $ac;
            $sac=$_SESSION['account'];
            $sql2 = "SELECT name  FROM user WHERE account='$ac' AND  password='$pw'" ;
            $sql3 = "SELECT identity FROM user WHERE account='$ac' AND  password='$pw'" ;
            $result2 = mysqli_query($con, $sql2);
            $result3 = mysqli_query($con, $sql3);
            $data = [];
            $row= mysqli_fetch_array($result2, MYSQLI_NUM);
            $row2 = mysqli_fetch_array($result3, MYSQLI_NUM);
            $name = implode(" ",$row); 
            $id = implode(" ",$row2); 
            array_push($data,$name);
            array_push($data,$id);
            array_push($data,"1");
            array_push($data,$sac);
        
            echo json_encode($data, JSON_UNESCAPED_UNICODE);   
        }
        else{
            $data = [0,0,0];
            echo json_encode($data, JSON_UNESCAPED_UNICODE);  
        }
    break;

    case 'logout':
        session_destroy();   
        echo 1;
    break;

    default:
            # code...
    break;
}
?>