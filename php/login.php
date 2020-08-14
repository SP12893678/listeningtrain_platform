<?php
session_start();
require_once './connect.php'; 
$logintype = $_GET['type'];
$ac = $_GET['account'];
$pw = $_GET['password']; 
switch ($logintype) {
    case 'checklogin':
        if(!isset($_SESSION['account']) || $_SESSION['account']='') {
            echo 0;
        }else{
            echo 1;
        }

    break;

    case 'login':
        
        $sql = "SELECT * FROM user WHERE account='$ac' AND  password='$pw'" ;
        $result = mysqli_query($con, $sql);
        $total_records = mysqli_num_rows($result);
        if ( $total_records > 0 ) {       
            $_SESSION['account']=$ac;
            echo 1;       
        }
        else{
            echo 0;  
        }
    break;

    default:
            # code...
    break;
}
?>