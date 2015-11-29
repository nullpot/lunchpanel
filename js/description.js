window.onload = function(){
	// 取得した情報を元にpanelを作成
	makePanels(testObj);

	// パネルに画面遷移のイベントをadd
	var tempPanels = document.querySelectorAll(".divPanelInformations");

    // クエリから全画面の検索情報を取得してテキスト情報に入力する
    document.querySelector("#search-field").value = getQueryVariable("searchCondition") || "";

    // 取得した情報を元に詳細の説明を作成
    makeDetailInfo(testObj["rName1"]);
}

// 取得した情報を元に詳細の説明を作成
function makeDetailInfo(jsonData){
	// TBD 雑なので後でちゃんと作り直す
	// TBD object構造が合っているか確認
	var divDetailInfo = document.querySelector("#divDetailInfo");
	for(var key in jsonData.gNavi){
		var divDetailInfo = document.querySelector("#divDetailInfo");

		divDetailInfo.querySelector("." + key).innerHTML = jsonData.gNavi[key];
	}
}