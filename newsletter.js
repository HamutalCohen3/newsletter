$(document).ready(function(){
	$(".form-container").hide();
	
	
	
	
	
});
/*$(".news .btn-form-display").click(function(){
	
})*/
$(".news .btn-form-display").click(function() {
	$("#matzov-for-matzov-form .form-container").hide();
	$("#news-form .form-container").show(300);
    $('html, body').animate({
        scrollTop: $("#news-form").offset().top
	}, 400);
});
$(".matzov-for-matzov .btn-form-display").click(function(){
	$("#news-form .form-container").hide();
	$("#matzov-for-matzov-form .form-container").show(300);
	$("html, body").animate({
		scrollTop: $("#matzov-for-matzov-form").offset().top
	}, 400);
})
$(".jobs .btn-form-display").click(function(){
	$("#jobs-form .form-container").show(300);
	$("html, body").animate({
		scrollTop: $("#jobs-form").offset().top,
		}, 400
	);
})
$(".btn-cancel").click(function(){
	$("html, body").animate({
		scrollTop: $(this).parents(".form-container").offset().top
	}, 300);
	$(this).parents(".form-container").hide(300);
	return false;
})