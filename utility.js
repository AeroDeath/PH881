var closeEnough = function (a, b, epsilon = 1e-10) {
	return Math.abs(a - b) < epsilon
}

var genLinePlotData = function (foo, start, end, num_div = 100) {
	var h = (end - start) / num_div;
	var plotData = [];
	for (var i=0; i <= num_div; i+=1) {
		plotData.push({ 'x': start + i*h, 'y': foo(start + i*h) });
	}
	return plotData;
}

var addDuration = function (plotData, duration) {
	for (var i = 0; i < plotData.length; i += 1) {
		plotData[i]['duration'] = duration;
	}
	return plotData;
}

var animatePath = function (plot, animationPathData) {
	for (var i = 0; i < animationPathData.length; i += 1) {
		plot.svg.selectAll(".dot")
			.data([animationPathData[i]])
			.transition()
			.duration(function (d, i) { return d.duration })
			.attr("cx", function (d) { return plot.x(d.x) })
			.attr("cy", function (d) { return plot.y(d.y) })
	}
}

var getNumInput = function (identifier) {
	var value = Number(d3.select(identifier).node().value);
	var max = Number(d3.select(identifier).node().max)
	var min = Number(d3.select(identifier).node().min);
	if (value > max) {
		value = max;
	}
	else if (value < min) {
		value = min;
	}
	return value;
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