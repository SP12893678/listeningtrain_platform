<?php
ini_set('display_errors', 1);
session_start();
require_once './connect.php'; 
$logintype = $_GET['type'];

switch ($logintype) {
    case 'inforcheck':
        $ac = $_GET['account'];
        $pw = $_GET['password']; 

        if($_SESSION['account']===$ac&&$_SESSION['password']===$pw ) {                    
            echo 1; 
        }else{
            
            echo 0;   
        }
    break;

    case 'inforchange':
            $name = $_GET['name'];
            $mail = $_GET['mail'];            
            $pwr = $_GET['pwr'];   
            $ac=$_SESSION['account'] ;
            $sql = "UPDATE user  SET name='$name',mail='$mail',password='$pwr' WHERE account='$ac'";
            $change =mysqli_query($con, $sql);
            $_SESSION['password'] =$pwr;
            echo 1;   
    break;

    case 'checklogin':
        if(isset($_GET['check'])){
            if($_GET['check'] == 'game')unset($_SESSION['demoGame']);
            else $_SESSION['demoGame'] = 1;
        }
        if(!isset($_SESSION['account']) ) {
            $data = [0,0];
            echo json_encode($data, JSON_UNESCAPED_UNICODE); 
        }else{
             $ac=$_SESSION['account'] ;

             $sql = "SELECT * FROM user WHERE account='$ac'" ;
             $result = mysqli_query($con, $sql);
             $data['user'] = mysqli_fetch_array($result);
             $data['islogin']= 1;
             echo json_encode($data, JSON_UNESCAPED_UNICODE);
            
            // $sql2 = "SELECT name  FROM user WHERE account='$ac'" ;
            // $sql3 = "SELECT identity FROM user WHERE account='$ac'" ;
            // $sql4 = "SELECT mail FROM user WHERE account='$ac'" ;
            // $result2 = mysqli_query($con, $sql2);
            // $result3 = mysqli_query($con, $sql3);
            // $result4 = mysqli_query($con, $sql4);
            // $data = [];
            // $row= mysqli_fetch_array($result2, MYSQLI_NUM);
            // $row2 = mysqli_fetch_array($result3, MYSQLI_NUM);
            // $row3 = mysqli_fetch_array($result4, MYSQLI_NUM);
            //  $name = implode(" ",$row); 
            //  $id = implode(" ",$row2); 
            //  $mail = implode(" ",$row3); 
            // array_push($data,$name);
            // array_push($data,$id);
            // array_push($data,"1");
            // array_push($data, $mail);
            // array_push($data, $ac);
          
        
            // echo json_encode($data, JSON_UNESCAPED_UNICODE);   
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
            $_SESSION['password'] = $pw;       
            // while($row = mysqli_fetch_array($result2))
            // {
            //     array_push($data,$row);
            // }          
            $data['user'] = mysqli_fetch_array($result);
            $data['islogin']= 1;
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            
        }
        else{
            $data = [0,0];
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