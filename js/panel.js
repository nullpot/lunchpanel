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

		    setResultNum(response.length);
        })
        // ・サーバからステータスコード400以上が返ってきたとき
        // ・ステータスコードは正常だが、dataTypeで定義したようにパース出来なかったとき
        // ・通信に失敗したとき
        .fail(function () {
            $('#result').val('失敗');
            $('#detail').val('');
        });
	});
}

// 検索件数を表示する
function setResultNum(num){
	document.querySelector("#divResultsNum>h2").textContent = num + "件みつかりました。"
}