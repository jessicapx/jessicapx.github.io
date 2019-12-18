/*	  _,  _, __, _ __, ___   __,  _,
	 (_  / ` |_) | |_)  |   , |  (_
	 ,_) \_, | \ | |    | , (_|  ,_)
	 ///////////////////////////////
*/

// Generate random
// hexadecimal value
function hexRandom() {
	var hex = "";
	const hexArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
		"A", "B", "C", "D", "E", "F"];

	for (var i = 0; i < 6; i++) {
		var rand = Math.floor(Math.random() * 16);
		hex += hexArr[rand];
	}

	return hex;
}

// // // // // // // // // //

// get red, green, and blue
// color values from each
// hexadecimal set
function redInt(hex) {
	var red = parseInt(hex.substring(0, 2), 16);

	return red;
}

function greenInt(hex) {
	var green = parseInt(hex.substring(2, 4), 16);

	return green;
}

function blueInt(hex) {
	var blue = parseInt(
		hex.substring(4, 6), 16);

	return blue;
}

function rgb(hex) {
	var r = redInt(hex);
	var g = greenInt(hex);
	var b = blueInt(hex);

	return {red : r, green : g, blue : b};
}

// // // // // // // // // //

// access r, g, and b values
// of triadic rgb colors
function triadic1(r, g, b) {
	var red = g;
	var green = b;
	var blue = r;

	return {red : red, green : green, blue : blue};
}

function triadic2(r, g, b) {
	var red = b;
	var green = r;
	var blue = g;

	return {red : red, green : green, blue : blue};
}

// // // // // // // // // //

// format rgb(255, 255, 255)
// for css reference
function rgbFormat(r, g, b) {
	var format = "rgb(" + r + ", " + g + ", " + b + ")";

	return format;
}

// // // // // // // // // //

//	multiplies rgb values by
//	increments of 0.25 for even
// 	palette array
//	0.25|0.5|0.75 | 1 | 1.25|1.5|1.75
var x = 0;
// converts rgb back to
// hexadecimal value
function rgbToHex(r, g, b) {
	var rgb = b | (g << 8) | (r << 16);
	return '#' + (0x1000000 + rgb).toString(16).slice(1);
}

// // // // // // // // // //

/*
	Begin jQuery
*/

$(function () {

// 	If textarea is empty or only contains whitespace:
//  return a random hex value. Else: return hex input
function getInput() {
	var hex = "";
	// 	if empty, including whitespace
	// 	textarea element
	if (!$.trim($("#hexInput").val())) {
		hex = hexRandom();
	}

	else {
		hex = $("#hexInput").val();
	}
	// 	clear textarea
	$("#hexInput").val('');

	return hex;
}

// // // // // // // // // // //

//	main button div return main
//	r, g, and b values
function createButton(r, g, b, hex) {
	// 	format rgb(255, 255, 255)
	var rgb = rgbFormat(r, g, b);
	// 	format (255, 255, 255)
	var rgbTxt = rgbFormat(r, g, b).substring(3);
	$("#btnTxt").html('#' + hex + "<br>" + rgbTxt);
	$("#button").css("background-color" , rgb);
} 	//	createButton

// // // // // // // // // //

// style triadic text boxes
function triadTd(r, g, b, tTxt, triHex) {
	//	format rgb(255, 255, 255)
	var rgb = rgbFormat(r, g, b);
	//	paragraph format (255, 255, 255)
	$(tTxt).html(triHex + "<br>" + rgb.substring(3)).addClass("triad").css({
		"background-color" : rgb
	});
}	//	triadTd

function createTriadTable(r, g, b, t1, t2) {
	// 	paragraph tag
	var txt1 = $("#triadP1");
	var txt2 = $("#triadP2");
	// 	{ object }
	// 	triad hex values
	var hex1 = rgbToHex(t1.red, t1.green, t1.blue);
	var hex2 = rgbToHex(t2.red, t2.green, t2.blue);
	//	input hex and triadic rgb values into paragraph,
	// 	input hex and rgb values into triadBox function
	triadTd(t1.red, t1.green, t1.blue, txt1, hex1);
	triadTd(t2.red, t2.green, t2.blue, txt2, hex2);
}	//	createTriadicTable

// // // // // // // // // //

// 	inputs r, g, and b values, paints palette
function createPalette(r, g, b, p) {
	// 	<tr> children
	var palette = $(p).children();
	//  for each <td> in <tr>
	for (var i = 0; i < palette.length; ++i) {
		x += 0.28; // 255/9 colors
		var red = Math.round(r*x);
		var green = Math.round(g*x);
		var blue = Math.round(b*x);

		var rgb = rgbFormat(red, green, blue);
		$(palette[i]).css({
			"background-color" : rgb
		});
	}
	// 	reset shade increment
	x = 0;
}

function createPalettes(r, g, b, t1, t2) {
	// 	create main color palette
	// 	and two triadic color palettes
	var p = document.getElementById("mainPalette");
	var p1 = document.getElementById("tPalette1");
	var p2 = document.getElementById("tPalette2");

	createPalette(r, g, b, p);
	createPalette(t1.red, t1.green, t1.blue, p1);
	createPalette(t2.red, t2.green, t2.blue, p2);
}

// // // // // // // // // //

function mainButton() {
	var hex = getInput();
	var Rgb = rgb(hex);
	var r = Rgb.red;
	var g = Rgb.green;
	var b = Rgb.blue;

	//	{ object }
	// 	triadic rgb values
	var t1 = triadic1(r, g, b);
	var t2 = triadic2(r, g, b);

	createButton(r, g, b, hex);
	createTriadTable(r, g, b, t1, t2);
	createPalettes(r, g, b, t1, t2);

	return {red : r, green : g, blue : b};
}

$("#hexInput").on("keyup", function(e) {
	this.value = this.value.replace(/\s/g, "");
  if (e.keyCode === 13) {
		mainButton();
  }
});

$("#button").click(function() {
	mainButton();

	return;

});	//	click

// // // // // // // // // //

}); // end jquery
