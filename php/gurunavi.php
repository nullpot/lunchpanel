<?php


require_once('./yahoo.php');


$request_add=$_GET['area'];
$geo=yahoo_geo($request_add);


// ぐるなびAPI
// http://api.gnavi.co.jp/api/manual/restsearch/

/*****************************************************************************************
 * ぐるなびWebサービスのレストラン検索APIで緯度経度検索を実行しパースするプログラム
 * 注意：緯度、経度、範囲の値は固定で入れています。
 * アクセスキーはユーザ登録時に発行されたキーを指定してください。
 *****************************************************************************************/

//エンドポイントのURIとフォーマットパラメータを変数に入れる
$uri = "http://api.gnavi.co.jp/RestSearchAPI/20150630/";
//APIアクセスキーを変数に入れる
$acckey = '14c383d2e30f47f282bd9b688c62eb22';
//返却値のフォーマットを変数に入れる
$format = "json";
//緯度・経度、範囲を変数に入れる
//緯度経度は日本測地系で日比谷シャンテのもの。範囲はrange=1で300m以内を指定している。
$lat = $geo['latitude'];
$lon = $geo['longitude'];
$range = 1;
$hit_per_page = 100;

//URL組み立て
$url = sprintf("%s%s%s%s%s%s%s%s%s%s%s%s%s", $uri, "?format=", $format, "&keyid=", $acckey, "&latitude=", $lat, "&longitude=", $lon, "&range=", $range, "&hit_per_page=", $hit_per_page);

//API実行
$json = file_get_contents($url);
//取得した結果をオブジェクト化
$obj = json_decode($json);
//echo '$obj'.'<br>';
//print_r($obj);
//結果をパース
//トータルヒット件数、店舗番号、店舗名、最寄の路線、最寄の駅、最寄駅から店までの時間、店舗の小業態を出力
$i=0;
foreach ((array)$obj as $key => $val) {
	if (strcmp($key, "total_hit_count") == 0) {
//		echo "total:" . $val . "\n";
	}

	if (strcmp($key, "rest") == 0) {
		foreach ((array)$val as $restArray) {
//			echo '<pre>';
//			print_r($restArray);
//			echo '</pre>';
//			if (checkString($restArray->{'id'})) echo $restArray->{'id'} . "\t";
			$result[$i]['restaurant_name']=(checkString($restArray->{'name'}))?$restArray->{'name'}:'';
			$result[$i]['restaurant_access']=(checkString($restArray->{'access'}->{'line'}))?(string)$restArray->{'access'}->{'line'}.$restArray->{'access'}->{'station'}:'';
//			if (checkString($restArray->{'access'}->{'station'})) echo (string)$restArray->{'access'}->{'station'} . "\t";
//			if (checkString($restArray->{'access'}->{'walk'})) echo (string)$restArray->{'access'}->{'walk'} . "分\t";

			foreach ((array)$restArray->{'code'}->{'category_name_s'} as $v) {
				$result[$i]['restaurant_category']=(checkString($v))?$v:'';
			}
//			echo "\n";
			$i++;
		}

	}
}

// debug
//echo '<pre>';
//print_r($result);
//echo '</pre>';

$data=json_encode($result);
echo "[" . $data . "]";

//文字列であるかをチェック
function checkString($input)
{

	if (isset($input) && is_string($input)) {
		return true;
	} else {
		return false;
	}

}