var genLogisticMap = function(x0, r, num_iter){
    var data = [x0];
    for(var i=1; i<=num_iter; i+=1){
        data.push(data[i-1]*r*(1-data[i-1]));
    }
    return data;
}

var plottableMap = function(data){
    plotData = [];
    for(i = 0; i<data.length; i+=1){
        plotData.push({"x": i, "y": data[i]});
    }
    return plotData;
}

var genBifurcationTree = function(x0, rmin, rmax, num_div = 100, num_iter = 200, last_n = 50){
    var h = (rmax - rmin)/num_div;
    var plotData = []
    for(var r = rmin; r<=rmax; r+=h){
        var data = genLogisticMap(x0, r, num_iter);
        for(var i = num_iter-last_n; i<=num_iter; i+=1){
            plotData.push({"x": r, "y": data[i]});
        }
        // console.log(r);
    }
    return plotData;
}

var genPoincarePlot = function(r, num_div = 1000){
    var h = 1./num_div;
    var plotData = []
    for (var i=0; i<1.0; i= i+h){
        plotData.push({'x': i, 'y': i*r*(1-i) });
    }
    plotData.push({'x': 1, 'y': 0}); // takes care of 1 not being plotted
    return plotData;
}