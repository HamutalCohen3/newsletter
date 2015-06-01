$(document).ready(function(){
	$(".form-container").hide();
	
	
	
	
	
});
$(".news .btn-form-display").click(function(){
	$(".matzov-for-matzov-form").hide();
	$(".news-form").toggle(300);
})
$(".matzov-for-matzov .btn-form-display").click(function(){
	$(".news-form").hide();
	$(".matzov-for-matzov-form").toggle(300);
})
$(".jobs .btn-form-display").click(function(){
	$(".jobs-form").toggle(300);
})
$(".btn-cancel").click(function(){
	$(this).parents(".form-container").hide(300);
})