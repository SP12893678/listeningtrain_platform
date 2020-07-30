<?php
     require_once './connect.php';
    $name = $_GET['name'];
    $mail = $_GET['mail'];
    $acr = $_GET['acr'];
    $pwr = $_GET['pwr'];
    $id = $_GET['id'];
  
    $sql = "SELECT * FROM login WHERE  account='$acr'";
    $account_repeat =mysqli_query($con, $sql);
    $total_account = mysqli_num_rows($account_repeat);
    if ( $total_account == 0 ) {
        $sql2 = "SELECT * FROM login WHERE  username='$name'";
        $name_repeat =mysqli_query($con, $sql2);
        $total_name = mysqli_num_rows($name_repeat);
        if ( $total_name == 0 ) {
        $register = "INSERT INTO login (username, mail,account,password,id) VALUES ('$name', '$mail','$acr','$pwr','$id')";
        mysqli_query($con,$register);
        echo 1;
        }else{ // name repeat
        echo 2;  
        }
    } else {  // account repeat
        echo 3;         
    }
?>