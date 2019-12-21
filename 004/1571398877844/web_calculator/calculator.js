window.onload = main;

function main () {
	var nodelist = document.querySelectorAll(".button");
	for (var i = 0; i < nodelist.length; ++i) {
		nodelist[i].onclick = button_function;
	}
	document.getElementById("apple").onclick = apple_bulb;
}

function apple_bulb () {
	var apple_bulb_div = document.getElementById("apple_bulb");
	apple_bulb_div.style.opacity = 1;
	setTimeout(shot_down_bulb, 3000);
}

function shot_down_bulb() {
	var apple_bulb_div = document.getElementById("apple_bulb");
	apple_bulb_div.style.opacity = 0;
	console.log("settime_out");
}

function button_function (event) {
	var show_content_box = document.getElementById("content_text");
	var show_content = show_content_box.innerText;
	if (show_content == "错误") show_content = "0";
	
	var button_target = event.target;
	var button_is_operation = true; 
	if ((0 <= button_target.innerText && button_target.innerText <= 9) || button_target.innerText == "(" || button_target.innerText == ")") {
		if (show_content == 0) {
			if(button_target.innerText == ")") return; // 如果是)输入，则直接退出
			show_content = button_target.innerText;
			show_content_box.innerText = show_content;
			return;
		}
		else{
			show_content += button_target.innerText;
		}
		var button_is_operation = false;
		if (button_target.innerText == "(") {
			console.log("enter (");
			var fit_or_not = true;
			// for (var i = 0; i < show_content.length - 1; ++i) {
			// 	if (show_content[i] == "(") fit_or_not = false;
			// 	else if (show_content[i] == ")") fit_or_not = true;
			// }
			// 如果前面是数字，则也不能成功
			var previous_num_orNot = show_content[show_content.length - 2];
			if(!isNaN(previous_num_orNot)) {
				fit_or_not = false;
			}
			if(previous_num_orNot == "(") {
				fit_or_not = false;
			}
			if (!fit_or_not) {
				return;
			}	
		}
		else if (button_target.innerText == ")") {
			console.log("enter )");
			var fit_or_not = true;
			//由于在前面加多了一个),所以因该是倒数第二个
			var previous_num_orNot = show_content[show_content.length - 2];
			// 检测)前应该是一个数字，不然将它置为true
			for (var i = 0; i < show_content.length - 1; ++i) {
				if (show_content[i] == "(") fit_or_not = false;
				else if (show_content[i] == ")") fit_or_not = true;
			}
			if(isNaN(previous_num_orNot)) {
				fit_or_not = true;
			}
			if (fit_or_not) {
				return;
			}	
		}
		else { //如果是数字
			console.log("num");
			var previous_num_orNot = show_content[show_content.length - 2];
			if (previous_num_orNot == ")") return;
		}
	}
	else if (button_target.innerText == "C") {
		show_content = "0";
		button_target.innerText = "AC";
		show_content_box.style.fontSize = "80px";
	}
	else if (button_target.innerText == "AC") {
		
	}
	else if (button_target.innerText == "=") {
		var count = "";
		for (var i = 0; i < show_content.length; ++i) {
			if (show_content[i] == "×") {
				count += "*";
			}
			else if (show_content[i] == "÷") {
				count += "/";
			}
			else count += show_content[i];
		}

		eval("show_content =" + count);
		if (isNaN(show_content) || show_content == Infinity) {
			show_content = "错误";
		}
	}
	else if (button_target.innerText == "+/-") {
		show_content = "-(" + show_content + ")";
	}
	// else if (button_target.innerText == "×") {
	// 	show_content += "*";
	// }
	// else if (button_target.innerText == "÷") {
	// 	show_content += "/";
	// }
	else if (button_target.innerText == "←") {
		var str = "";
		for (var i = 0; i < show_content.length - 1; ++i) str += show_content[i];
		show_content = str;
	}
	else {
		//如果执行俩操作则不能继续,直接退出
		var previous_operator = show_content[show_content.length - 1];
		console.log(previous_operator == "÷");
		var test_operator_againOrNot = false;
		if ((previous_operator == "÷" || previous_operator == "×" || previous_operator == "." || previous_operator == "%" || previous_operator == "-" || previous_operator == "+")) {
			show_content[show_content.length - 1] = button_target.innerText;
			test_operator_againOrNot = true;
		}
		if ((button_target.innerText == "÷" || button_target.innerText == "×" || button_target.innerText == "." || button_target.innerText == "%" || button_target.innerText == "-" || button_target.innerText == "+")) {
			if(isNaN(previous_operator && previous_operator != ")")) {
				return;
			}
		}
		if(!test_operator_againOrNot) {
			console.log(button_target.innerText);
			show_content += button_target.innerText;
		}
		
	}

	// 判断是否需要缩放字体大小来容纳更多的数字
	if (show_content.length > 7) {
		show_content_box.style.fontSize = "60px";
	}
	else if (show_content.length > 10) {
		show_content_box.style.fontSize = "40px";
	}

	//判断是否需要AC的关系调整
	document.getElementById("ac").innerText = "C";
	if (show_content.length == 0 || (show_content[show_content.length - 1] == "0")) {
		document.getElementById("ac").innerText = "AC";
		show_content = "0";
	}
	show_content_box.innerText = show_content;
}