<?php
/**
 * Created by PhpStorm.
 * User: sebas
 * Date: 1/28/15
 * Time: 4:35 PM
 */

$text = "ñ\nb\n,";
//$string = str_replace(array("\t","\r\n","\n","\0","\v"," "),'', $text);
echo mb_strlen($text, "UTF-8");