window.onload = function(){
	// 取得した情報を元にpanelを作成
	makePanels(testObj);

	// パネルに画面遷移のイベントをadd
	var tempPanels = document.querySelectorAll(".divPanelInformations");
	for(var i=0;i<tempPanels.length;i++){
		tempPanels[i].addEventListener("click",function(){
			transferPage("description.html");
		},false);
	}

    // クエリから全画面の検索情報を取得してテキスト情報に入力する
    document.querySelector("#search-field").value = getQueryVariable("searchCondition") || "";

    // TBD objectの取得件数に引数を置き換える
    setResultNum(12);
}

// 検索件数を表示する
function setResultNum(num){
	document.querySelector("#divResultsNum>h2").textContent = num + "件みつかりました。"
}