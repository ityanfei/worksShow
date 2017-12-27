window.onload=function (){
	var oUl=document.querySelector('ul');
	var aLi=oUl.children;
	
	for(var i=0; i<aLi.length; i++){
		aLi[i].style.transition='1s all ease '+(11-i)*100+'ms';
		aLi[i].style.WebkitTransform='rotateY('+360/11*i+'deg) translateZ(350px)';
	}
	
	//拿数字模拟角度
	var x=0;
	var y=0;
	
	//速度
	var iSpeedX = 0,
		iSpeedY = 0,
		lastX = 0,
		lastY = 0;
	
	oUl.onmousedown=function (ev){
		var disX=ev.pageX-x; 	
		var disY=ev.pageY-y;
		document.onmousemove=function (ev){
			x=ev.pageX-disX;
			y=ev.pageY-disY;
			
			oUl.style.WebkitTransform='perspective(519px) rotateX('+-y/5+'deg) rotateY('+x/5+'deg)';
			
			iSpeedX = ev.pageX-lastX;
			iSpeedY = ev.pageY-lastY;
			
			lastX = ev.pageX;
			lastY = ev.pageY;
			
		};
		
		document.onmouseup=function (){
			document.onmousemove=null;
			document.onmouseup=null;
			//清除定时器
			clearInterval(oUl.timer);
			//开定时器，让图片环走
			oUl.timer = setInterval(function(){
				iSpeedX*=0.9;
				iSpeedY*=0.9;
				x+=iSpeedX;
				y+=iSpeedY;
				
				oUl.style.WebkitTransform='perspective(519px) rotateX('+-y/5+'deg) rotateY('+x/5+'deg)';
				
				if(Math.abs(iSpeedX)<1)iSpeedX = 0;
				if(Math.abs(iSpeedY)<1)iSpeedY = 0;
				console.log(iSpeedX,iSpeedY);
				if(iSpeedX==0&&iSpeedY==0){
					clearInterval(oUl.timer);
				}
			},30);
			
		};
		return false;
	};
};