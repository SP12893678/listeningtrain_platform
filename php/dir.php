<?php

    $path_string = $_GET['path'];
    $paths = explode("-", $path_string);
    $path = "../static/";
    foreach ($paths as $key => $value) {
        $path .= $value."/";
    }
    $extensions = $_GET['extensions'];
    $extensions_string = "";
    foreach ($extensions as $key => $value) {
        $extensions_string .= $value;
        if(count($extensions) > $key + 1)
            $extensions_string .= ",";
    }
    $object_images = glob($path . "{" . $extensions_string ."}",GLOB_BRACE);
    echo json_encode($object_images, JSON_UNESCAPED_UNICODE);