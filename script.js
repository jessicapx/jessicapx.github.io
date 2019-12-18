$(document).ready(function() {

	$('h1').html(function() {
  		var txt = $(this).text();
  		return txt.substr(0, txt.length-2) + '<span>'+txt.slice(-2)+'</span>';
	});

	$("ul").hide();
	$("#other_links p").click(function() {
		$("ul").animate({width: 'toggle', opacity: 'toggle'});
	});

});
