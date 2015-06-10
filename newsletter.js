$(document).ready(function(){
	$(".form-container").hide();
	createNewsForm($(".news.form-container"));
	createMatzovForm($(".matzov-for-matzov.form-container"));
	createJobsForm($(".jobs.form-container"));
	setNewsFormPosition();
	//validate
	$("form").each(function(){
		$(this).validate({
			rules: {
				summary: {
					required: true,
					minlength: 30, 
					maxlength: 600
				},
				name: {
					required: true,
					minlength: 2,
					maxlength: 50
				},
				phone: {
					required: false,
					minlength: 7,
					maxlength: 10,
					number:true
				},
				email: {
					required: true,
					email: true
				},
				more: {
					maxlength:10000
				},
				title: {
					required: true
				},
				company: {
					required: true
				}
			},
			messages: {
				summary: {
					required: "שדה חובה",
					minlength: "מלא/י לפחות 30 תווים", 
					maxlength: "עד 600 תווים, הוסף/י את השאר בפרטים נוספים"
				},
				name: {
					required: "הכנס/י שם איש קשר",
					minlength: "מלא/י לפחות 2 תווים", 
					maxlength: "עד 50 תווים"
				},
				phone: {
					minlength: "בין 7 ל10 ספרות",
					maxlength: "בין 7 ל10 ספרות",
					number:"אנא הכנס/י רק ספרות בין 0 ל9"
				},
				email: {
					required: "שדה חובה",
					email: "אנא הכנס/י כתובת אימייל תקינה"
				},
				more: {
					maxlength: "עד 1000 תווים"
				},
				title: {
					required: "אנא מלא/י שם תפקיד"
				},
				company: {
					required: "אנא מלא/י שם חברה"
				}
			}
		});
	});
	
	$(".section li:last-child").hide();
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
	$(".form-container").hide();
	var form = getForm($(this).parents(".section"));
	$(form).show(300);
    $('html, body').animate({
        scrollTop: $(form).offset().top
	}, 400);
});


$(".form-container").on("click", ".btn-cancel", function(){
	$("html, body").animate({
		scrollTop: $(this).parentsUntil("#newsletter-container").last().prevAll(".section").first().offset().top
	}, 300);
	$(this).parents("form").trigger("reset");
	$(this).parents(".form-container").hide(300);
	$(this).parents(".form-container").find(".btn-form-display").show(300);
	return false;
})
//form variables
var summary = "";
var name = "";
var phoneNumber = "";
var displayContact = true;
var email = "";
var title = "";
var company = "";
var more = "";

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
	$(this).parents("form").validate();
	//if invalid
	if (!$(this).parents("form").find("input, textarea").valid()){
		$("html, body").animate({
			scrollTop: $(this).parents(".form-container").find("[aria-invalid=true]").first().offset().top
		}, 300);
		return false;
	}
	//create variables for section and form
	var section = getSection($(this).parents(".form-container"));
	var form = $(this).parents(".form-container");
	
	//take common values from form
	summary = $(form).find("[name=summary]").val().toString();
	name = $(form).find("[name=name]").val().toString();
	phoneNumber = $(form).find("[name=phone]").val().toString();
	email = $(form).find("[name=email]").val().toString();
	more = $(form).find("[name=more]").val().toString();
	
	//take and put unique values separately
	$(section).hasClass("jobs")?  
		createJobsArticle() : createBasicArticle(section);
		
	//put common values in form
	$(section).find(".summary").append(summary);
	$(section).find(".summary").linkify();
	$(section).find(".name").append(name);
	if(phoneNumber != ""){$(section).find(".phone").append().append(phoneNumber);}
	$(section).find(".email").append().append(email);
	$(section).find(".email").linkify();
	if(more != ""){
		$(section).find("p.more").append(more);
		$(section).find("p.more").linkify();
	}
	else{
		$(section).find(".toggle-more").hide();
	}
	$("p.more").hide();
	
	//hide and show elements accordingly
	$(section).find("li:last-child").show();
	$(section).find(".btn-form-display").hide();
	$(this).parents(".form-container").hide(300);
	$("html, body").animate({
		scrollTop: $(section).find("li:last-child").offset().top
	}, 300);
	return false;
})

$(".section").on("click", ".btn-change", function(){
	$(this).parents("li").find(".article").empty();
	$(this).parents("li").hide();
	var form = getForm($(this).parents(".section"));
	$(form).show(300);
	$("html, body").animate({
		scrollTop: $(form).offset().top
	}, 300);
	return false;
})
$("#newsletter-container").on("click", ".toggle-more", function(){
	$(this).parents("li").find(".more").toggle(200);
	return false;
})
var basicForm = '<form role="form" class="form-horizontal"><h5></h5>\
					<hr>\
					<div class="form-group"> \
						<label for="summary" class="control-label">בקיצור</label>\
						<textarea class="form-control" rows="5" placeholder=" ספר/י בקצרה על הנושא (בעברית)" name="summary"></textarea>\
						<span class="help-block">שדה זה יופיע במייל התפוצה של העיתון.</span>\
					</div>\
					<div class="form-group">\
						<label for="name" class="control-label col-sm-2" style="float:right">איש קשר</label>\
						<div class="col-sm-5">\
							<input type="text" class="form-control" name="name"></input>\
						</div>\
					</div>\
					<div class="form-group">\
						<label for="phone" class="control-label col-sm-2" style="float:right">מספר טלפון</label>\
						<div class="col-sm-5">\
							<input type="text" class="form-control" name="phone"></input>\
							<span class="help-block">טלפון איש קשר (רשות)</span>\
						</div>\
					</div>\
					<div class="form-group">\
						<label for="email" class="control-label col-sm-2" style="float:right">דוא"ל</label>\
						<div class="col-sm-5">\
							<input type="email" class="form-control" name="email"></input>\
						</div>\
					</div>\
					<div class="form-group">\
						<label for="more" class="control-label">פרטים נוספים</label>\
						<textarea class="form-control" rows="7" placeholder="פרט/י" name="more"></textarea>\
						<span class="help-block">שדה זה יופיע למתעניינים שילחצו "לפרטים נוספים", ניתן להכניס טקסט או קישור (רשות)</span>\
					</div>\
					<div class="form-group">\
						<label for="remarks" class="control-label">הערות לעורך</label>\
						<textarea class="form-control" rows="3" placeholder="עוד משהו שתרצה/י להוסיף?" name="remarks"></textarea>\
						<span class="help-block">שדה זה ישלח לעורך בלבד</span>\
					</div>\
					<button type="submit" class="btn btn-default btn-review">הצג כתבה</button>\
					<button class="btn btn-default btn-cancel">בטל</button>\
				</form>';

function createBasicArticle(section){
	var form = getForm(section);
	//take unique values from form
	displayContact = ($(form).find("[name=display-contact]").is(":checked"));
	//append article
	$(section).find(".article").append(basicArticle);
	//put unique values in article
	if(!displayContact){
		$(section).find(".name").hide();
		$(section).find(".phone").hide();
	}
}
var basicArticle = '<span class="summary"></span>\
	<a href=# class="toggle-more"> לפרטים נוספים </a>\
	<br><span class="name"></span>\
	<span class="phone"> </span>\
	<span class="email"> </span>\
	<p class="more"></p>'
var contactDisplayCheckbox = '<div class="form-group">\
								<label><input type="checkbox" name="display-contact" checked>הצג איש קשר</label>\
								<span class="help-block">במקרה שאיש הקשר לא יוצג, השם והטלפון יראו רק בפני עורך העלון</span>\
							</div>'
function formToNewsOrMatzov(form){
	$(form).find("[name=phone]").parents(".form-group").after(contactDisplayCheckbox);
}
function createJobsArticle(){
	//take values from form
	title = $(".jobs.form-container [name=title]").val().toString();
	company = $(".jobs.form-container [name=company]").val().toString();
	//append article
	$(".jobs.section").find(".article").append(jobsArticle);
	//put values in article
	$(".jobs.section").find(".title").append(title);
	$(".jobs.section").find(".company").append(company);
}
var jobDetails =	'<div class="form-group">\
						<label for="title" class="control-label col-sm-2" style="float:right">תפקיד</label>\
						<div class="col-sm-5">\
							<input type="text" class="form-control" name="title"></input>\
						</div>\
					</div>\
					<div class="form-group">\
						<label for="company" class="control-label col-sm-2" style="float:right">חברה</label>\
						<div class="col-sm-5">\
							<input type="text" class="form-control" name="company"></input>\
						</div>\
					</div>';
function formToJobs(){
	var nameFeild = $(".jobs.form-container [name=name]").parents(".form-group");
	$(".jobs.form-container hr").after(nameFeild);
	$(".jobs.form-container [name=name]").parents(".form-group").after(jobDetails);
}

var jobsArticle = '<span class="name"></span>\
	<span class="title"> מחפש/ת </span> \
	<span class="company"> בחברה </span>.\
	<br>\
	<span class="summary"> </span>\
	<a href=# class="toggle-more"> לפרטים נוספים</a>\
	<br>\
	<span class="email"> </span>\
	<span class="phone"> </span>\
	<p class="more"></p>'
function createNewsForm(){
	$(".news.form-container").append(basicForm);
	formToNewsOrMatzov($(".news.form-container"));
	$(".news.form-container h5").append("הגשת כתבה למהדורה הבאה");
}
var formTabs = '<ul class="nav nav-tabs">\
				  <li role="presentation" class="active"><a href="#">הגשת בקשה</a></li>\
				  <li role="presentation"><a href="#">בוגר החודש</a></li>\
				</ul>';
function createMatzovForm(){
	$(".matzov-for-matzov.form-container").prepend(basicForm);
	$(".matzov-for-matzov.form-container").prepend(formTabs);
	formToNewsOrMatzov($(".matzov-for-matzov.form-container"));
	$(".matzov-for-matzov.form-container h5").append("הגשת בקשה למהדורה הבאה");
}
function createJobsForm(){
	$(".jobs.form-container").append(basicForm);
	formToJobs($(".jobs.form-container"));
	$(".jobs.form-container h5").append("הגשת הצעת עבודה למהדורה הבאה");
}
$(".matzov-for-matzov.form-container").on("click", ".nav-tabs a", function(){
	var i = $(this).parent().index();
	$(".matzov-for-matzov.form-container form").hide();
	$(".matzov-for-matzov.form-container form").eq(i).show();
	$(".matzov-for-matzov.form-container .nav-tabs li").removeClass("active");
	$(this).parents("li").addClass("active");
	return false;
})