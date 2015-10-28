

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
	$(".matzov-for-matzov.form-container").append($(basicForm).clone());
	$(".matzov-for-matzov.form-container h5").html("הגשת בקשה למהדורה הבאה");
	$(".matzov-for-matzov.form-container .article-type").val('מצו"ב בשביל מצו"ב');
	//create jobs form
	$(basicForm).clone().appendTo(".jobs.form-container");
	$(".jobs.form-container h5").html("הגשת הצעת עבודה למהדורה הבאה");
	$(".jobs.form-container .article-type").val("הצעות עבודה");
	//responsive
	setFormsPosition();
	
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
	
	$(".section .btn-group, .section .article, .spotlight-section .btn-group").hide();
	//error messages for editor fields
	$("textarea.summary, textarea.background, textarea.help-with").after("<label class='error' style='display:none'></label>");
});
$('.btn-send').click(function() {
	var form = getForm($(this).parents(".section, .spotlight-section"));
	$(form).find("[name=submit]").click();
	return false;
});

var basicForm = $(".news form").clone();

var article = '<span class="summary"></span>\
	<p><a href=# class="toggle-more" target="_blank"> לפרטים נוספים </a></p>\
	<span class="contact-details">איש קשר <a class="name" target="_blank"></a>\
	<span class="phone"> או בטלפון  </span></span>\
	<p class="more"></p>';

var layoutBreakpoint = 992;
$(window).resize(setFormsPosition);
function setFormsPosition(){
	var isLarg = $(".news.form-container").parent().is(".news-l");
	if (isLarg && ($(window).width() < layoutBreakpoint)){
		$(".news.form-container").appendTo(".news-s");
		$(".matzov-for-matzov.form-container").appendTo(".matzov-s");
	}
	else if(!isLarg && ($(window).width() >= layoutBreakpoint)){
		$(".news.form-container").appendTo(".news-l");
		$(".matzov-for-matzov.form-container").appendTo(".matzov-l");
	}
}

$(".section, .spotlight-section").on("click", ".btn-form-display", function() {
	//show other sections' buttons
	$(".window-toggle").show();
	$(this).parents(".section, .spotlight-section").find(".window-toggle").hide();
	
	$(".form-container").hide();
	var form = getForm($(this).parents(".section, .spotlight-section"));
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
	if($(section).hasClass("spotlight-section")){
		$(section).find(".spotlight-article").empty();
		$(section).find(".spotlight-article").append(spotlightArticle);
	}
	
	$("html, body").animate({
		scrollTop: $(section).offset().top
	}, 300);
	$(this).parents("form").trigger("reset");
	$(this).parents(".form-container").hide(300);
	return false;
})

function getSection(form){
	if($(form).hasClass("news")) {
        return $(".news.section");
	}
	else if($(form).hasClass("matzov-for-matzov")) {
        return $(".matzov-for-matzov.section");
	}
	else if ($(form).hasClass("spotlight")) {
        return $(".spotlight-section");
	}
	else if($(form).hasClass("jobs")) {
        return $(".jobs.section");
	}
    else{
        return null;
	}
}
function getForm(section){
	if($(section).hasClass("news")) {
        return $(".news.form-container");
	}
	else if($(section).hasClass("matzov-for-matzov")) {
        return $(".matzov-for-matzov.form-container");
	}
	else if ($(section).hasClass("spotlight-section")) {
        return $(".spotlight.form-container");
	}
	else if($(section).hasClass("jobs")) {
        return $(".jobs.form-container");
	}
    else{
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
	
	
	//take values from form
	var summary = $(form).find("iframe").eq(0).contents().find("body").html();
	var name = $(form).find(".name").val().toString();
	var phoneNumber = $(form).find(".phone").val().toString();
	var email = $(form).find(".email").val().toString();
	var moreHtml = $(form).find("iframe").eq(1).contents().find("body").html();
	var moreHref = $(moreHtml).text().trim();
	//determine if contact details are shown
	var displayContact = ($(form).find(".display-contact").is(":checked"));
	
	//create new article er
	$(section).find(".article").empty();
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
	
	return false;
})

$(".section, .spotlight-section").on("click", ".btn-change", function(){
	//show other sections' buttons
	$(".window-toggle").show();
	$(this).parents(".section, .spotlight-section").find(".window-toggle").hide();
	//get toggle buttons ready if shown
	$(this).find(".window-toggle .article, .window-toggle .btn-group").hide();
	$(this).find(".window-toggle .btn-form-display").show();
	//hide other forms
	$(".form-container").hide();
	var form = getForm($(this).parents(".section, .spotlight-section"));
	$(form).show(300);
	$("html, body").animate({
		scrollTop: $(form).offset().top
	}, 300);
	return false;
})


//clone the spotlight article to reuse
var spotlightArticle = "<div class='spotlight-article'>\
									<p class='name'><b>שם: </b></p>\
									<p class='title'><b>תפקיד: </b></p>\
									<p class='background'><b>רקע: \
									</b></p>\
									<p class='help-with'><b>אשמח לעזור עם: \
									</b></p>\
									<p class='contact-way'><b>הדרך הכי טובה ליצור איתי קשר: </b></p>\
								</div>";

$(".btn-review-spotlight").click(function(){
	$(this).parents("form").validate();
	if (!$(this).parents("form").find("input, textarea").valid()){
		$("html, body").animate({
			scrollTop: $(this).parents("form").find("[aria-invalid=true]").first().offset().top
		}, 300);
		return false;
	}
	//add article
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
	$(".spotlight-section").find(".window-toggle").show();
	$(".spotlight-section").find(".btn-group").show();
	$(".spotlight-section").find(".btn-form-display").hide();
	$(".form-container.spotlight").hide(300);
	$("html, body").animate({
		scrollTop: $(".spotlight-section").find(".spotlight-article").offset().top
	}, 300);
	
	return false;
})

//Hebrew validate
function hebrewValidate(html){
	if(html.search(/[א-ת]/) === -1){
		errorMessage = "אנא כתוב/כתבי בעברית";
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