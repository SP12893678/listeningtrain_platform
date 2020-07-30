<?php
     require_once './connect.php';
    $ac = $_GET['account'];
    $pw = $_GET['password'];
  
    $sql = "SELECT * FROM login WHERE account='$ac' AND  password='$pw'" ;
    $result = mysqli_query($con, $sql);
    $total_records = mysqli_num_rows($result);

    if ( $total_records > 0 ) {

        echo 1;       
    }
    else{
        echo 0;  
    }
?>