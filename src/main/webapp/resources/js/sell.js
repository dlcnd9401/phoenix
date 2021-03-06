$(document).ready(function(){
	var data2 = []; // 데이터 담을 배열 변수 선언
	var viewRow = 10; // 화면에 보여질 행 갯수
	var page = 1; // 현재 페이지 값
	var totCnt2 = 0; // 데이터 전체 객수
	
	function createHtml(){
             $("tbody").empty();
             // 데이터를 출력하는데 널값이 있어도 빈칸으로 출력되게함.
             for(var i = 0; i < data2.length; i++){
        		var tag = "<tr class='Selllist-text'>"; 
        		    tag += "<td style='width:150px'>";
        		    if(data2[i].path != ''){
        		    	tag += "<img class='img' src='" + data2[i].path + "'";
        		    }else {
        		    	tag += "　";
        		    }
        		    tag += "</td>";
        		    tag += "<td style='width:250px'>";
        		    if(data2[i].Sname != ''){
        		    	tag += data2[i].Sname;
        		    }else {
        		    	tag += "　";
        		    }
        		    tag += "</td>";
        		    tag += "<td style='width:250px'>";
        		    if(data2[i].Name != ''){
        		    	tag += data2[i].Name;
        		    }else {
        		    	tag += "　";
        		    }
        		    tag +="</td>";
        		    tag += "<td style='width:250px'>";
        		    if(data2[i].Code != ''){
        		    	tag += data2[i].Code;
        		    }else {
        		    	tag += "　";
        		    }
        		    tag += "</td>";
        		    tag += "<td style='width:250px'>";
        		    if(data2[i].Store != ''){
        		    	tag += data2[i].Store; 
        		    }else {
        		    	tag += "　";
        		    }
        		    tag += "<td style='width:200px'>";
        		    if(data2[i].Price != ''){
        		    	tag += data2[i].Price; 
        		    }else {
        		    	tag += "　";
        		    }
        		    tag += "</td>";
        		    tag += "<td style='width:200px'>";
        		    if(data2[i].Date != ''){
        		    	tag += data2[i].Date; 
        		    }else {
        		    	tag += "　";
        		    }
        		    tag += "</td>";
        		    tag += "</tr>";
        		$("tbody").append(tag);
        		
            } 
            if(data2.length < 1){
            	var tag = "<tr class='Selllist-text2'>"; 
    		    tag += "<td>구매하신 상품이 없습니다.</td>";
    		    tag += "</tr>";
            	$("tbody").append(tag);
            }
	  }
	 
	  function createPaging(){
			var paging = totCnt2 / viewRow;
			// 전체의 행의 수에서 보여줄 행을 나누면 페이지의 갯수를 알 수 있다.
			$(".Sellpagebtns").empty(); // div 태그 속에 a 태그를 초기화 한다.
			for(var i = 0; i < paging; i++){
				$(".Sellpagebtns").append("<a href='#sell" + (i + 1) + "'>" + (i + 1) + "</a>");
			}
			
//			$(".pagebtns a").eq(page - 1).addClass("page"); 
			// page의 변수를 이용하여 a 태그의 인덱스 값을 구하여 page 클래스를 적용한다.
			
			$(".Sellpagebtns a").off().on("click", function(){ // 페이지 전환 이벤트를 작성 한다.
				// a 태그 중에 몇번째 페이지인지 알면 리스트 화면를 다시 보여 줄 수 있다. page 변수 활용 할것!
				page = $(this).text();
				setTimeout(function(){
					initData(); // 디비에서 데이터 다시 가져 오기 위하여 함수 호출
				}, 100); // 0.1초 후에 실행 하기 위하여 setTimeout() 함수를 실행한다.
			});
		}
	  
	  function initData(){ // 디비에서 데이터 가져오기 위한 함수
			
			var hash = location.hash; // a 태그의 이벤트로 발생한 hash 값을 가져온다.
			if(hash != ""){ // hash 값이 있을 경우 page 변수의 값으로 사용한다.
				page = hash.substr(5, hash.length);
			}
			
			var end = (viewRow * page); // 10 * 2 = 20 
			var start = (end - viewRow); // 20 - 10 = 10
	
			$.ajax({
					type:"post", // post 방식으로 통신 요청
					url:"/phoenix/sellData", // Spring에서 만든 URL 호출
					dataType : "json",
					data:{"start":start, "viewRow":viewRow} // 파라메터로 사용할 변수 값 객체 넣기
			}).done(function(result){ // 비동기식 데이터 가져오기
				data2 = result.data2; // JSON으로 받은 데이터를 사용하기 위하여 전역변수인 data에 값으로 넣기
				totCnt2 = result.totCnt2.tot;
				createHtml(); // 화면에 표현하기 위하여 함수 호출
				createPaging(); // 페이지 링크 표현하기 우하여 함수 호출
			});
		}	
		initData();
});