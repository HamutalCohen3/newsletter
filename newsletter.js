$(document).ready(function(){
	$(".form-container").hide();
	resizeWindow();
	
});
$(window).resize(resizeWindow);
function resizeWindow(){
	var isLarg = $("#news-form").parent().is(".news-l");
	if ($(window).width() < 996 && isLarg){
		console.log("change to small");
		$("#news-form").appendTo(".news-s");
	}
	else if($(window).width() > 995 && !isLarg){
		console.log("change to large");
		$("#news-form").appendTo(".news-l");
	}
}
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
$("#jobs-form .btn-review").click(function(){
	var name = $("#jobs-form .name").val().toString();
	var email = $("#jobs-form .email").val().toString();
	var summery = $("#jobs-form .summery").val().toString();
	var more = $("#jobs-form .more").val().toString();
	$(".jobs ul").append(
		"<li>" + summery + "<a href='#'>" + " " + "לפרטים נוספים" + "</a>" + "</li>");
	$(".jobs ul li").last().append("<br>" + name + " <a href='#'>" + email + "</a>.");
	$(".jobs .btn-form-display").hide();
	$(".jobs").append("<div class='btn-group'></div>");
	$(".jobs .btn-group").append("<button class='btn btn-primary btn-change'>שנה</button>");
	$(".jobs .btn-group").append("<button class='btn btn-success btn-send'>שלח</button>");
	$(this).parents(".form-container").hide(300);
	return false;
})
$("#news-form .btn-review").click(function(){
	var name = $("#news-form .name").val().toString();
	var email = $("#news-form .email").val().toString();
	var summery = $("#news-form .summery").val().toString();
	var more = $("#news-form .more").val().toString();
	$(".news ul").append(
		"<li>" + summery + "<a href='#'>" + " " + "לפרטים נוספים" + "</a>" + "</li>");
	$(".news ul li").last().append("<br>" + name + " <a href='#'>" + email + "</a>.");
	$(".news .btn-form-display").hide();
	$(".news").append("<div class='btn-group'></div>");
	$(".news .btn-group").append("<button class='btn btn-primary btn-change'>שנה</button>");
	$(".news .btn-group").append("<button class='btn btn-success btn-send'>שלח</button>");
	$(this).parents(".form-container").hide(300);
	return false;
})
$("#matzov-for-matzov-form .btn-review").click(function(){
	var name = $("#matzov-for-matzov-form .name").val().toString();
	var email = $("#matzov-for-matzov-form .email").val().toString();
	var summery = $("#matzov-for-matzov-form .summery").val().toString();
	var more = $("#matzov-for-matzov-form .more").val().toString();
	$(".matzov-for-matzov ul").append(
		"<li>" + summery + "<a href='#'>" + " " + "לפרטים נוספים" + "</a>" + "</li>");
	$(".matzov-for-matzov ul li").last().append("<br>" + name + " <a href='#'>" + email + "</a>.");
	$(".matzov-for-matzov .btn-form-display").hide();
	$(".matzov-for-matzov").append("<div class='btn-group'></div>");
	$(".matzov-for-matzov .btn-group").append("<button class='btn btn-primary btn-change'>שנה</button>");
	$(".matzov-for-matzov .btn-group").append("<button class='btn btn-success btn-send'>שלח</button>");
	$(this).parents(".form-container").hide(300);
	return false;
})
