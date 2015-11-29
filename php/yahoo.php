<?php
/**
 * Created by PhpStorm.
 * User: h_shirai
 * Date: 15/11/29
 * Time: 15:27
 */

// http://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/geocoder.html
$yahoo_app_id = 'dj0zaiZpPW4wdm8zNGxQQ0JFTSZzPWNvbnN1bWVyc2VjcmV0Jng9NDU-'; // アプリケーションID：
$yahoo_app_secret = 'bc6fdd0ac412d8ce94afee38a8282165f90e72b3'; // シークレット：

function yahoo_geo($address_str)
{

	$addres = urlencode($address_str);

	$request = 'http://geo.search.olp.yahooapis.jp/OpenLocalPlatform/V1/geoCoder?appid=' . $yahoo_app_id . '&query=' . $addres;


	$xml = simplexml_load_file($request);
//print_r($xml->Feature->Geometry->Coordinates[0]);
	$geo = explode(',', $xml->Feature->Geometry->Coordinates[0]);
	$result = array(
		'longitude' => $geo[0],
		'latitude' => $geo[1],
		'name' => $xml->Feature->Name
	);

// debug
// echo '<pre>';
// print_r($result);
// echo '</pre>';
	return $result;
}
