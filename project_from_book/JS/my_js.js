// JavaScript Document

function sum(){
	var ret=0;
	for(var i=0; i<arguments.length;i++){//函数不用写参数，但可以有很多参数
		ret+=arguments[i];
	}
	return ret;
}

function average(){
	var ret=0;
	for(var i=0; i<arguments.length;i++){
		ret+=arguments[i];
	}
	ret=ret/arguments.length;
	return ret;
}

function level(score){
	ret="";
	if(score>=90) ret="A";
	else if(score>=80) ret="B";
	else if(score>=70) ret="C";
	else ret="不及格";
	return ret;
}

function msg(level){
	var ret="";
	switch(level){
		case ("A"):ret="祝贺你取得好成绩！";break;
		case ("B"):ret="成绩不错，继续加油！";break;
		case ("A"):ret="必须加油啊！";break;	
	}
	return ret;
}

function student(name,math,chinese,english,science,gym){
	//参数
	this.name=name;
	this.math=math;
	this.chinese=chinese;
	this.english=english;
	this.science=science;
	this.gym=gym;
	//方法，传承上面定义过的方法
	this.sum=sum;
	this.ave=average;
	this.level=level;
	this.msg=msg;
	//新的定义的方法
	this.toString1=function toString1(){
		var Ave=this.ave(this.math, this.chinese,this.english,this.science,this.gym);
		var s=this.name+"\n你的总成绩是"+this.sum(this.math, this.chinese,this.english,this.science,this.gym)+
		"\n你的平均成绩是"+Ave
		+"\n你的等级是"+this.level(Ave)
		+"\n"+this.msg(this.level(Ave));
		
		return s;
	}
}


//常用内置对象实训

//1.去掉字符串首位及中间重复的空格
function trim(s){
	var ret=s.split(" ");
	s="";
	for(var i=0;i<ret.length;i++){
		if(ret[i]!=""){s+=ret[i]+" ";}
	}
	s.sub(0,length-1);
	return s;
}

/////////////////////////////////////////////////////游戏/////////////////////////////////////////////////////////
var state=new Array(16);
state[0]="静安区";
state[1]="黄浦区";
state[2]="宝山区";
state[3]="闵行区";
state[4]="浦东区";
state[5]="奉贤区";
state[6]="嘉定区";
state[7]="闸北区";
state[8]="普陀区";
state[9]="长宁区";
state[10]="金山区";
state[11]="松江区";
state[12]="青浦区";
state[13]="杨浦区";
state[14]="普陀区";
state[15]="徐汇区";
var len=state.length;
var tryTimes=0;
var startTime=new Date();
var endTime="";
var sr=Math.floor(Math.random()*len);
var answer=state[sr];


function newGame(){
	//alert("reload");
	location.reload();
}
 
function clearBox(){	
	document.getElementById("guess").focus();	
	document.getElementById("guess").value="";		
	hint.innerHTML="输入你的答案，然后按回车键~";
	//alert("刷新后次数为："+tryTimes);
}
function diffTime(from,to){
	var diffTime=parseInt((to-from)/1000);
	return diffTime;
}

function guessit(){
	var guess=document.getElementById("guess").value;

	if(guess==answer){
		endTime=new Date();
		var time=diffTime(startTime,endTime);
		if(time<60){if(confirm("回答正确！我是在上海的"+answer+",你用了"+time+"秒哦。,你还想再玩吗？"))newGame();}
		else alert("回答正确！我是在上海的"+answer+",不过你用了太长时间哦。");
		newGame();
	}
	else{
		
		tryTimes++;
		switch(tryTimes){
		case 1:
			hint.innerHTML="第一次提示，区名有"+answer.length+"个字";
			break;
		case 2:
			hint.innerHTML="第二次提示，区名第三个字是："+answer[2];
			break;
		case 3:
			hint.innerHTML="第三次提示，区名第一个字是："+answer[0];
			break;
		default:
			hint.innerHTML="没有提示了。";
		}
		
		if(tryTimes==5){
			if(confirm("对不起，我在上海的"+answer+",你还想再玩吗？"))newGame();
		}	
	}
}


////////////////////////////////////////////////////成绩提交系统//////////////////////////////////////////////////////////
var emails=new Object();
emails["001"]="001@sjtu.edu.cn";
emails["002"]="002@sjtu.edu.cn";
emails["003"]="003@sjtu.edu.cn";
emails["004"]="004@sjtu.edu.cn";

var errorMsg="";

function clearAll(){
	document.getElementById("nameList").selectedIndex=-1;
	document.getElementById("chinese").value="";
	document.getElementById("math").value="";
	document.getElementById("other").value="";
	document.getElementById("PE").value="";
	document.getElementById("other1").click();
}

function doSelect(){
	var selected=document.getElementById("nameList").selectedIndex;
	var selectedValue=document.getElementById("nameList").options[selected].value;
	var selectedText=document.getElementById("nameList").options[selected].text;
	document.getElementById("studentImg").src="img/my"+selected+".jpg";
	document.getElementById("eMailHe").href="emailto:"+emails[selectedValue];
	document.getElementById("emailss").value=emails[selectedValue];
	//alert(document.getElementById("eMailHe").href);
	document.title="学生成绩输入系统－"+selectedText;
	
}

function checkRequired(id,label){
	var s=document.getElementById(id).value;
	
	if(s==""){
		errorMsg+="请输入"+label+"\n";
		return;
	}
	else{
		for(var i=0;i<s.length;i++){
			var c=s.charAt(i);
			
			if((c<"0")||(c>"9")){
				errorMsg+=label+"成绩应该为正确的数字.\n";
				return;
			}
			if(parseInt(s)>100){
				errorMsg+=label+"输入的分数超过100分，无效.\n";
				return;
			}
		}
	}
}

function checkScore(id,label){
	var gymScore=document.getElementById(id).value;
	if(gymScore.length!=1){
		errorMsg+=label+"成绩无效.\n"
		return;
	}
	if(gymScore[0]<"A"||gymScore[0]>"F"){
		errorMsg+=label+"成绩无效.\n"
		return;
	}
	
}

function doSubmit(){
	checkRequired("nameList","学生姓名");
	checkRequired("chinese","语文");
	checkRequired("math","数学");
	checkRequired("other","历史或常识");
	checkScore("PE","体育");
	if(errorMsg.length>0){
		alert(errorMsg);
		errorMsg="";
		return;
	}
	document.getElementById("formGrade").submit();
	alert("提交成功！");
	return;
}





