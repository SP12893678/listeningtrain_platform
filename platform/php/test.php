<?php
    // header("content-Type: text/html; charset=utf-8");
    $con = mysqli_connect("localhost","root","","listeningtrain_platform");
    $con->query("set names utf8");
    $type = $_GET['type'];

    if($type == 'enviro')
    {
        $sql = "SELECT * FROM enviro";
        $result = mysqli_query($con, $sql);
        echo ReadResult_toarray($result);
    }
    else if($type == 'object')
    {
        $data = $_GET['data'];
        $object_arr = join("','",$data);   
        $sql = "SELECT * FROM object WHERE id IN ('$object_arr')";
        $result = mysqli_query($con, $sql);
        echo ReadResult_toarray($result);
    }
    else if($type == 'audio')
    {
        $data = $_GET['data'];
        $audio_arr = join("','",$data);   
        $sql = "SELECT * FROM data WHERE id IN ('$audio_arr')";
        $result = mysqli_query($con, $sql);
        echo ReadResult_toarray($result);
    }
    else if($type == 'audio_data')
    {
        $sql = "SELECT * FROM data WHERE 1";
        $result = mysqli_query($con, $sql);
        echo ReadResult_toarray($result);
    }
    else
    {
        echo $type;
    }

    function ReadResult_toarray($result) {
        $data = '';
        $count = 0;
        $rows = mysqli_num_rows($result);
        while ($row = mysqli_fetch_array($result)) {
            $count++;
            $data .= json_encode($row, JSON_UNESCAPED_UNICODE);
            $data .=($count < $rows)?',':'';
        }
        $data = "[".$data."]";
        return $data;
    }
?>
