

$(document).ready(function(){
	var d = new Date();
	var hebMonth;
	var year = d.getFullYear();
	switch (d.getMonth()){
		case 0:
			hebMonth = "ינואר";
			break;
		case 1:
			hebMonth = "פברואר";
			break;
		case 2:
			hebMonth = "מרץ";
			break;
		case 3:
			hebMonth = "אפריל";
			break;
		case 4:
			hebMonth = "מאי";
			break;
		case 5:
			hebMonth = "יוני";
			break;
		case 6:
			hebMonth = "יולי";
			break;
		case 7:
			hebMonth = "אוגוסט";
			break;
		case 8:
			hebMonth = "ספטמבר";
			break;
		case 9:
			hebMonth = "אוקטובר";
			break;
		case 10:
			hebMonth = "נובמבר";
			break;
		case 11:
			hebMonth = "דצמבר";
			break;
	}
	$(".head-line").append(hebMonth + " " + year);
	$(".form-container").hide();
	//create News Form
	$(".news.form-container h5").html("הגשת כתבה למהדורה הבאה");
	$(".news.form-container .article-type").val("חדשות");
	//create matzov form
	$(".matzov-for-matzov.form-container ul:first").after($(basicForm).clone());
	$(".matzov-for-matzov.form-container h5:first").html("הגשת בקשה למהדורה הבאה");
	$(".matzov-for-matzov.form-container form:first .article-type").val('מצו"ב בשביל מצו"ב');
	//create jobs form
	$(basicForm).clone().appendTo(".jobs.form-container");
	$(".jobs.form-container h5").html("הגשת הצעת עבודה למהדורה הבאה");
	$(".jobs.form-container .article-type").val("הצעות עבודה");

	setNewsFormPosition();//responsive
	
	jQuery.validator.addMethod( "hebrew", function(value){
		console.log(value);
		return hebrewValidate(value);
	}, "תקציר הרשומה צריך להיות בעברית")

	//validate
	$("form").each(function(){
		$(this).validate({
			rules: {
				//summary *** not really working with editor
				'entry.1593542857': {
					required: true,
					minlength: 30, 
					maxlength: 600,
					hebrew: true
				},
				//name
				"entry.1415989532": {
					required: true,
					minlength: 2,
					maxlength: 50
				},
				//phone
				"entry.1144585106": {
					required: false,
					minlength: 7
				},
				//email
				"entry.1743980726": {
					required: true,
					email: true
				},
				//more
				"entry.1365421559": {
					maxlength:10000
				},
				//title
				'entry.1629897663' : {
					required: true,
					maxlength: 200
				},
				//help-with
				'entry.1243490321' : {
					required: true,
					hebrew: true,
					maxlength: 600
				},
				//background
				'entry.1822079008' : {
					required: true,
					hebrew: true,
					maxlength: 600
				},
				//contact way
				'entry.1949401518' : {
					required: true,
					maxlength: 600
				}
			},
			messages: {
				//summary
				'entry.1593542857': {
					required: "שדה חובה",
					minlength: "מלא/י לפחות 30 תווים", 
					maxlength: "עד 600 תווים, הוסף/י את השאר בפרטים נוספים"
				},
				//name
				"entry.1415989532": {
					required: "הכנס/י שם איש קשר",
					minlength: "מלא/י לפחות 2 תווים", 
					maxlength: "עד 50 תווים"
				},
				//phone
				"entry.1144585106": {
					minlength: "לפחות 7 ספרות",
				},
				//email
				"entry.1743980726": {
					required: "שדה חובה",
					email: "אנא הכנס/י כתובת אימייל תקינה"
				},
				//more
				"entry.1365421559": {
					maxlength: "עד 1000 תווים"
				},
				//title
				'entry.1629897663' : {
					required: "שדה חובה",
					maxlength: "עד 200 תוים"
				},
				//help-with
				'entry.1243490321': {
					required: "שדה חובה",
					maxlength: "עד 600 תווים"
				},
				//background
				'entry.1822079008': {
					required: "שדה חובה",
					maxlength: "עד 600 תווים"
				},
				//contact way
				'entry.1949401518' : {
					required: "שדה חובה",
					maxlength: "עד 300 תווים"
				}
			}
		});
	});
	
	$(".section .btn-group, .section .article").hide();
	$(".matzov-for-matzov.section .spotlight-article").hide();
	//error messages for editor fields
	$("textarea.summary, textarea.background, textarea.help-with").after("<label class='error' style='display:none'></label>");
});
$('.btn-send').click(function() {//***
	var form = getForm($(this).parents(".section"));
	//if need to differ between spotlight and regular forms
	if ($(form).hasClass("matzov-for-matzov")){
		isSpotlight? $(".spotlight [name=submit]").click() : $(".matzov-for-matzov form:first [name=submit]").click();
		return false;
	}
	$(form).find("[name=submit]").click();
	return false;
});
var layoutBreakpoint = 992;
$(window).resize(setNewsFormPosition);
function setNewsFormPosition(){
	var isLarg = $(".news.form-container").parent().is(".news-l");
	if (isLarg && ($(window).width() < layoutBreakpoint)){
		console.log("change to small");
		$(".news.form-container").appendTo(".news-s");
	}
	else if(!isLarg && ($(window).width() >= layoutBreakpoint)){
		console.log("change to large");
		$(".news.form-container").appendTo(".news-l");
	}
}
function getForm(section){
	switch($(section).attr("class")) {
    case "section news col-md-6 col-sm-12":
        return $(".news.form-container");
    case "section matzov-for-matzov col-md-6 col-sm-12":
		return $(".matzov-for-matzov.form-container");
	case "section jobs col-md-12 col-sm-12":
        return $(".jobs.form-container");
    default:
        return null;
	}
}


$(".section").on("click", ".btn-form-display", function() {
	//show other sections' buttons
	$(".window-toggle").show();
	$(this).parents(".section").find(".window-toggle").hide();
	
	$(".form-container").hide();
	var form = getForm($(this).parents(".section"));
	$(form).show(300);
    $('html, body').animate({
        scrollTop: $(form).offset().top
	}, 400);
});


$(".form-container").on("click", ".btn-cancel", function(){
	//show section's toggle part
	var section = getSection($(this).parents(".form-container"));
	$(section).find(".window-toggle").show();
	$(section).find(".window-toggle .btn-form-display").show();
	$(section).find(".window-toggle .article, .window-toggle .btn-group").hide();
	
	$("html, body").animate({
		scrollTop: $(this).parentsUntil("#newsletter-container").last().prevAll(".section").first().offset().top
	}, 300);
	$(this).parents("form").trigger("reset");
	$(this).parents(".form-container").hide(300);
	return false;
})

function getSection(form){
	switch($(form).attr("class")) {
    case "form-container news col-md-12":
        return $(".news.section");
    case "form-container matzov-for-matzov col-md-12":
        return $(".matzov-for-matzov.section");
	case "form-container jobs col-md-12":
        return $(".jobs.section");
    default:
        return null;
	}
}

$(".form-container").on("click", ".btn-review", function(){
	//validate form
	$(this).parents("form").validate();
	//validate tinymce
	var validCount = 0;
	$(this).parents("form").find("textarea.summary").prevAll(".mce-tinymce").first().each(function(){
		var content = $(this).find("iframe").eq(0).contents().find("body").html();
		var label = $(this).nextAll(".error").first();
		if (!validateEditor(content, label)){validCount++;}
	});
	
	//if form is invalid, scroll to invalid field
	if (!$(this).parents("form").find("input, textarea").valid() || validCount !== 0){
		$("html, body").animate({
			scrollTop: $(this).parents("form").find("[aria-invalid=true]").first().offset().top
		}, 300);
		return false;
	}
	//create variables for section and form
	var section = getSection($(this).parents(".form-container"));
	var form = $(this).parents(".form-container");
	
	//if matzov article, don't show spotlight instead
	if($(section).hasClass("matzov-for-matzov")){
		$(".matzov-for-matzov.section .article").show();
		$(".matzov-for-matzov.section .spotlight-article").hide();
	}

	//take values from form
	var summary = $(form).find("iframe").eq(0).contents().find("body").html();
	var name = $(form).find(".name").val().toString();
	var phoneNumber = $(form).find(".phone").val().toString();
	var email = $(form).find(".email").val().toString();
	var moreHtml = $(form).find("iframe").eq(1).contents().find("body").html();
	var moreHref = $(moreHtml).text().trim();
	//determine if contact details are shown
	var displayContact = ($(form).find(".display-contact").is(":checked"));
	
	//append article
	$(section).find(".article").append(article);
	
	//put unique values in article
	if(!displayContact){
		$(section).find(".contact-details").hide();
	}
		
	//put values in form
	$(section).find(".summary").append(summary);
	$(section).find(".summary").linkify();
	$(section).find(".name").append(name);
	if(phoneNumber != ""){$(section).find(".phone").append(phoneNumber);}
	else {$(section).find(".phone").hide();}
	$(section).find(".name").attr('href', 'mailto:' + email);
	//is more empty?
	if(moreHref != ""){
		//if more is a link
		if ((moreHref.indexOf(" ") === -1) && !hebrewValidate(moreHref)){
			$(section).find(".toggle-more").attr("href", moreHref);
		}
		//if more is text
		else{
			$(section).find(".more").append(moreHtml);
			$(section).find(".more p").linkify();
			//bind the click function to לפרטים נוספים
			$(section).find(".toggle-more").click(function(){
				$(this).parents("li").find(".more").toggle(200);
				return false;
			})
		}
	}
	//if more is empty
	else{
		$(section).find(".toggle-more").hide();
	}
	$("p.more").hide();
	
	//hide and show elements accordingly
	$(section).find(".btn-form-display").hide();//btn-form-display
	$(this).parents(".form-container").hide(300);//form
	//scroll to article
	$("html, body").animate({
		scrollTop: $(section).find(".article").offset().top
	}, 300);
	//show section's toggle part
	$(section).find(".btn-group").show();//btn-group
	$(section).find(".article").show();//btn-group
	$(section).find(".window-toggle").show();
	
	//declare if article is from matzov section
	isSpotlight = false;
	return false;
})

$(".section").on("click", ".btn-change", function(){
	//show other sections' buttons
	$(".window-toggle").show();
	$(this).parents(".section").find(".window-toggle").hide();
	//get toggle buttons ready if shown
	$(this).find(".window-toggle .article, .window-toggle .btn-group").hide();
	$(this).find(".window-toggle .btn-form-display").show();
	//hide other forms
	$(".form-container").hide();
	var form = getForm($(this).parents(".section"));
	$(form).show(300);
	//remake article
	$(this).parents("li").find(".article").empty();
	isSpotlight? $(".matzov-for-matzov.form-container ul.nav a:last").click(): $(".matzov-for-matzov.form-container ul.nav a:first").click();
	$(form).show(300);
	$("html, body").animate({
		scrollTop: $(form).offset().top
	}, 300);
	return false;
})

var basicForm = $(".news form").clone();

function createArticle(section){
}
var article = '<span class="summary"></span>\
	<p><a href=# class="toggle-more" target="_blank"> לפרטים נוספים </a></p>\
	<span class="contact-details">איש קשר <a class="name" target="_blank"></a>\
	<span class="phone"> או בטלפון  </span></span>\
	<p class="more"></p>';

//move between matzov article and spotlight
$(".matzov-for-matzov.form-container").on("click", ".nav-tabs a", function(){
	var i = $(this).parent().index();
	$(".matzov-for-matzov.form-container form").hide();
	$(".matzov-for-matzov.form-container form").eq(i).show();
	$(".matzov-for-matzov.form-container .nav-tabs li").removeClass("active");
	$(this).parents("li").addClass("active");
	return false;
})

//is spotlight the active form
var isSpotlight = false;

//clone the spotlight article to reuse
var spotlightArticle = $(".spotlight-article").html();

$(".spotlight .btn-review-spotlight").click(function(){
	$(this).parents("form").validate();
	if (!$(this).parents("form").find("input, textarea").valid()){
		$("html, body").animate({
			scrollTop: $(this).parents("form").find("[aria-invalid=true]").first().offset().top
		}, 300);
		return false;
	}
	//add article
	$(".matzov-for-matzov .article").hide();
	$(".matzov-for-matzov .spotlight-article").show();
		
	//put empty copy in article
	$(".spotlight-article").empty();
	$(".spotlight-article").append(spotlightArticle);
	//fill the article with content
	$(".spotlight-article .name").append($(".spotlight .name").val().toString());
	$(".spotlight-article .title").append($(".spotlight .title").val().toString());
	$(".spotlight-article .background").append($(".spotlight .background").val().toString());
	$(".spotlight-article .help-with").append($(".spotlight .help-with").val().toString());
	$(".spotlight-article .contact-way").append($(".spotlight .contact-way").val().toString());
	//linkily
	$(".spotlight-article").linkify();
	
	//hide and show elements accordingly
	$(".matzov-for-matzov.section").find("li:last-child").show();
	$(".matzov-for-matzov.section").find(".btn-form-display").hide();
	$(".form-container.matzov-for-matzov").hide(300);
	$("html, body").animate({
		scrollTop: $(".matzov-for-matzov.section").find("li:last-child").offset().top
	}, 300);
	
	isSpotlight = true;
	
	return false;
})
$(".matzov-for-matzov.form-container ul.nav a:not(:first)").click(function(){
	var form = getForm($("div.matzov-for-matzov.section"));
    $('html, body').animate({
        scrollTop: ($(form).offset().top - 17)// 17 - the gap between the screen top and the form when using .scrollTop() and .show()
	}, 1);//make the scroll happen after the mce scroll!
})

//Hebrew validate
function hebrewValidate(html){
	if(html.search(/[א-ת]/) === -1){
		errorMessage = "תקציר הרשומה צריך להיות בעברית";
		return false;
	}
	return true;
}
//length validate
function lengthValidate(html, min, max){
	if($(html).text().length < min){
		errorMessage = "מלא/י לפחות " + min + " תוים.";
		return false;
	}
	if($(html).text().length >= max){
		errorMessage = "מלא/י לכל היותר " + max + " תוים.";
		return false;
	}
	return true;
}
//is the field empty?
function isContentFull(html){
	if($(html).text() === ""){
		errorMessage = "שדה נדרש";
		return false;
	}
	return true;
}

function validateEditor(content, errorLabel) {
					
					if (!isContentFull(content) || !lengthValidate(content, 30, 600) || !hebrewValidate(content)){
						$(errorLabel).empty();
						$(errorLabel).append(errorMessage);
						$(errorLabel).show();
						$(tinyMCE.activeEditor.getContainer()).attr("aria-invalid", "true");
						return false;
					}
					else{
						$(errorLabel).hide();
						$(errorLabel).empty();
						$(tinyMCE.activeEditor.getContainer()).attr("aria-invalid", "false");
						return true;
					}
                };