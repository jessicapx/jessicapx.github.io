$(document).ready(function() {
	
	$('h1').html(function() {
  		var txt= $(this).text();
  		return txt.substr(0, txt.length-2) + '<span>'+txt.slice(-2)+'</span>';
	});
	
	var dropBtn = document.getElementById("drop_btn");
	var dropNav = document.getElementById("drop_nav");
	var dropLinks = 
document.getElementsByName("droplinks");
	
	$(dropNav).hide();
	$(dropBtn).click(function() {
		$(dropNav).slideToggle();
	});
	
});