window.onload = function(){
	// 取得した情報を元にpanelを作成
	makePanels(testObj);

	// パネルに画面遷移のイベントをadd
	var tempPanels = document.querySelectorAll(".divPanelInformations");
	for(var i=0;i<tempPanels.length;i++){
		tempPanels[i].addEventListener("click",function(){
			transferDescription("description.html");
		},false);
	}

    // クエリから全画面の検索情報を取得してテキスト情報に入力する
    document.querySelector("#inputText").value = getQueryVariable("searchCondition") || "";

    // TBD objectの取得件数に引数を置き換える
    setResultNum(12);
}

// 検索件数を表示する
function setResultNum(num){
	document.querySelector("#divResultsNum").textContent = num + "件みつかりました。"
}

// テストデータです。
var testObj = {
	"rName1":{
		gNavi:{
			restaurant_name:"rName1",
			restaurant_access:"rAccess1",
		},
		insta:{
			iTestA:123,
			iTestB:234,
		}
	},
		"rName2":{
		gNavi:{
			restaurant_name:"rName2",
			restaurant_access:"rAccess2",
		},
		insta:{
			iTestA:1123,
			iTestB:2234,
		}
	},
}