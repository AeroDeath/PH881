var closeEnough = function(a, b, epsilon = 1e-10){
	return Math.abs(a-b) < epsilon
}

var genLinePlotData = function(foo, start, end, num_div = 100){
	var h = (end - start)/num_div;
	var plotData = [];
	for(var x = start; x<=end; x+=h){
		plotData.push({'x': x, 'y': foo(x)});
	}
	return plotData;
}

var subscripts = {
	'0': '₀',
	'1': '₁',
	'2': '₂',
	'3': '₃',
	'4': '₄',
	'5': '₅',
	'6': '₆',
	'7': '₇',
	'8': '₈',
	'9': '₉',
	'+': '₊',
	'-': '₋',
	'=': '₌',
	'(': '₍',
	')': '₎',
	'i': 'ᵢ'
}