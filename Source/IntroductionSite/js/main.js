$(function() {
	$(".panel").css({"height":$(window).height()});
	$.scrollify({
		section:".panel"
	});
	

	$(".scroll").click(function(e) {
		e.preventDefault();
		$.scrollify("move",$(this).attr("href"));
	});
	
	var top = ($(window).height()-62);
	var left = ($(window).width()-32)/2;
	$("#jiantou").css({'margin-top': top+'px', 'margin-left': left+'px'})
	$("#jiantou").hover(function(){
		$(this).addClass('jiantou');
		$(this).removeClass('jiantou_1')
	},function(){
		$(this).removeClass('jiantou')
		$(this).addClass('jiantou_1');
	});
	
	$("#jiantou").bind("click",function(){
		
		$('body,html').animate({scrollTop:window.pageYOffset+$(window).height()},1000);
		//alert(window.pageYOffset);
		//alert($(window).height());
	});
});