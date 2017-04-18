// JavaScript Document

var employee={};

window.onload=function(){
	employee.name=document.getElementById("myName").value;
	employee.position=document.getElementById("myPosition").value;
	employee.tel=18817554940;
	employee.want="first";	
	//alert(employee.name+",欢迎你！");
}
function check(val){
	employee.name=document.getElementById("myName").value;
	
	employee.position=document.getElementById("myPosition").value;
	alert(employee.position);
	if(employee.position!="经理")return;
	if(val.value=" "){
		val.value=employee.name;//把value变成员工的名字。
		if(employee.want=="first"){
			val.style.backgroundColor="yellow";	
			employee.want="second";
		}
		else {
			val.style.backgroundColor="Aquamarine";	
		}
	}
	else if(val.style.backgroundColor!="yellow" && employee.want=="first"){
		alert(val.style.backgroundColor);
		val.style.backgroundColor="yellow";	
		val.value=employee.name;
	}
	
}