$(document).ready(function(){
	$(".form-container").hide();
	
	
	
	
	
});
$(".news .btn-form-display").click(function(){
	$(this).toggle(400,function(){
		$(".news .form-container").toggle(400);
	});
})
$(".matzov-for-matzov .btn-form-display").click(function(){
	$(this).toggle(400,function(){
		$(".matzov-for-matzov .form-container").toggle(400);
	});
})
$(".jobs .btn-form-display").click(function(){
	$(this).toggle(400,function(){
		$(".jobs .form-container").toggle(400);
	});
})
$(".cancel").click(function(){
	
})