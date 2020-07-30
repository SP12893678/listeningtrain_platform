<?php
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $_FILES['file']['name'])) {
        require './PhpSpreadsheet/vendor/autoload.php';
        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader('Xlsx');
        $reader->setReadDataOnly(TRUE);
        $spreadsheet = $reader->load($_FILES['file']['name']); //载入excel表格
        $worksheet = $spreadsheet->getActiveSheet()->toArray(null,true,true,true);
        $data = "";
        $count = 0;
        $rows = count($worksheet);
        foreach ($worksheet as $value)
        {
            $count++;
            $data .= json_encode($value, JSON_UNESCAPED_UNICODE);
            $data .=($count < $rows)?',':'';
        }
        $data = "[".$data."]";
        echo $data;
        unlink($_FILES["file"]["name"]);
    }