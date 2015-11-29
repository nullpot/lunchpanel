window.onload = function(){
	$(function () {
        // Ajax通信を開始する
        $.ajax({
            url: 'http://lunchpanel.nullpot.com/php/gurunavi.php',
            type: 'get', 		// getかpostを指定(デフォルトは前者)
            dataType: 'json', 	// 「json」を指定するとresponseがJSONとしてパースされたオブジェクトになる
            data: { 			// 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
                area: document.querySelector("#search-field").value
            }
        })
        // ・ステータスコードは正常で、dataTypeで定義したようにパース出来たとき
        .done(function (response) {
			// 取得した情報を元にpanelを作成
			makePanels(response);

			// パネルに画面遷移のイベントをadd
			var tempPanels = document.querySelectorAll(".divPanelInformations");
			for(var i=0;i<tempPanels.length;i++){
				tempPanels[i].addEventListener("click",function(){
					transferPage("description.html");
				},false);
			}
		    // クエリから全画面の検索情報を取得してテキスト情報に入力する
		    document.querySelector("#search-field").value = getQueryVariable("searchCondition") || "";

		    makeDetailInfo(response[0][getQueryVariable("key")]);
        })
        // ・サーバからステータスコード400以上が返ってきたとき
        // ・ステータスコードは正常だが、dataTypeで定義したようにパース出来なかったとき
        // ・通信に失敗したとき
        .fail(function () {
            $('#result').val('失敗');
            $('#detail').val('');
        });
	});





	// 取得した情報を元にpanelを作成
	// makePanels(testObj);

	// パネルに画面遷移のイベントをadd
	// var tempPanels = document.querySelectorAll(".divPanelInformations");

    // クエリから全画面の検索情報を取得してテキスト情報に入力する
    document.querySelector("#search-field").value = getQueryVariable("searchCondition") || "";

    // 取得した情報を元に詳細の説明を作成
    
}

// 取得した情報を元に詳細の説明を作成
function makeDetailInfo(jsonData){
	// TBD 雑なので後でちゃんと作り直す
	// TBD object構造が合っているか確認
	var divDetailInfo = document.querySelector("#divDetailInfo");
	for(var key in jsonData){
		var divDetailInfo = document.querySelector("#divDetailInfo");
		if(key !== "restaurant_image"){
			divDetailInfo.querySelector("." + key).innerHTML = jsonData[key];
		}
	}
	document.querySelector("#divDetailPicture").style.background = "url(" + jsonData.restaurant_image + ")";
}