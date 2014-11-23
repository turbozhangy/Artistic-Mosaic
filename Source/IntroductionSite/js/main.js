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
	
});