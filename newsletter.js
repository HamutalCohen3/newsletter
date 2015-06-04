$(document).ready(function(){
	$(".form-container").hide();
	$(".btn-group").hide();
	setFormPosition();
	$(".summery").attr("maxlength", "250");
	$(".more").attr("maxlength", "600");
	$("li:last-child").hide();
});
var layoutBreakpoint = 992;
$(window).resize(setFormPosition);
function setFormPosition(){
	var isLarg = $("#news-form").parent().is(".news-l");
	if (isLarg && ($(window).width() < layoutBreakpoint)){
		console.log("change to small");
		$("#news-form").appendTo(".news-s");
	}
	else if(!isLarg && ($(window).width() >= layoutBreakpoint)){
		console.log("change to large");
		$("#news-form").appendTo(".news-l");
	}
}
$(".news .btn-form-display").click(function() {
	$(".form-container").hide();
	$("#news-form .form-container").show(300);
    $('html, body').animate({
        scrollTop: $("#news-form").offset().top
	}, 400);
});
$(".matzov-for-matzov .btn-form-display").click(function(){
	$(".form-container").hide();
	$("#matzov-for-matzov-form .form-container").show(300);
	$("html, body").animate({
		scrollTop: $("#matzov-for-matzov-form").offset().top
	}, 400);
})
$(".jobs .btn-form-display").click(function(){
	$(".form-container").hide();
	$("#jobs-form .form-container").show(300);
	$("html, body").animate({
		scrollTop: $("#jobs-form").offset().top,
		}, 400
	);
})
$(".btn-cancel").click(function(){
	$("html, body").animate({
		scrollTop: $(this).parentsUntil("#newsletter-container").last().prevAll(".section").first().offset().top
	}, 300);
	$(this).parents("form").trigger("reset");
	$(this).parents(".form-container").hide(300);
	$(".btn-form-display").show(300);
	return false;
})

$("#jobs-form .btn-review").click(function(){
	var name = $("#jobs-form .name").val().toString();
	var email = $("#jobs-form .email").val().toString();
	var summery = $("#jobs-form .summery").val().toString();
	var more = $("#jobs-form .more").val().toString();
	$(".jobs li:last-child").show();
	$(".jobs li:last-child").prepend(summery);
	$(".jobs li:last-child br").after(name + " ");
	$(".jobs li:last-child a").last().append(email);
	$(".jobs li:last-child p.more").append(more);
	$("p.more").hide();
	$(".jobs .btn-form-display").hide();
	$(".jobs .btn-group").show();
	$(this).parents(".form-container").hide(300);
	$("html, body").animate({
		scrollTop: $(".jobs li").last().offset().top
	}, 300);
	return false;
})
$("#news-form .btn-review").click(function(){
	var name = $("#news-form .name").val().toString();
	var email = $("#news-form .email").val().toString();
	var summery = $("#news-form .summery").val().toString();
	var more = $("#news-form .more").val().toString();
	$(".news li:last-child").show();
	$(".news li:last-child").prepend(summery);
	$(".news li:last-child br").after(name + " ");
	$(".news li:last-child a").last().append(email);
	$(".news li:last-child p.more").append(more);
	$("p.more").hide();
	$(".news .btn-form-display").hide();
	$(".news .btn-group").show();
	$(this).parents(".form-container").hide(300);
	$("html, body").animate({
		scrollTop: $(".news li").last().offset().top
	}, 300);
	return false;
})
$("#matzov-for-matzov-form .btn-review").click(function(){
	var name = $("#matzov-for-matzov-form .name").val().toString();
	var email = $("#matzov-for-matzov-form .email").val().toString();
	var summery = $("#matzov-for-matzov-form .summery").val().toString();
	var more = $("#matzov-for-matzov-form .more").val().toString();
	$(".matzov-for-matzov li:last-child").show();
	$(".matzov-for-matzov li:last-child").prepend(summery);
	$(".matzov-for-matzov li:last-child br").after(name + " ");
	$(".matzov-for-matzov li:last-child a").last().append(email);
	$(".matzov-for-matzov li:last-child p.more").append(more);
	$("p.more").hide();
	$(".matzov-for-matzov .btn-form-display").hide();
	$(".matzov-for-matzov .btn-group").show();
	$(this).parents(".form-container").hide(300);
	$("html, body").animate({
		scrollTop: $(".matzov-for-matzov li").last().offset().top
	}, 300);
	return false;
})
$(".section").on("click", ".btn-change", function(){
	$(this).parents(".section").find("li").last().empty();
	$(this).parents(".section").find("li").last().append(
		"<a href='#'> לפרטים נוספים</a><br><a href='#'></a><p class='more'></p>");
	$(this).parents(".btn-group").hide();
	var form;
	if ($(this).parents(".section").hasClass("news")){form = $("#news-form");}
	else if ($(this).parents(".section").hasClass("matzov-for-matzov")){form = $("#matzov-for-matzov-form");}
	else if ($(this).parents(".section").hasClass("jobs")){form = $("#jobs-form");}
	$(form).find(".form-container").show(300);
	$("html, body").animate({
		scrollTop: $(form).offset().top
	}, 300);
	return false;
})
$("#newsletter-container").on("click", ".section li:last-child a:first-child", function(){
	console.log(this);
	$(this).siblings(".more").toggle(200);
	return false;
})