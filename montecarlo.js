var montecarloIntegral = function(foo, xrange, yrange, num_trials = 1000){
    var num_inside = 0;
    var area = (xrange[1] - xrange[0]) * (yrange[1] - yrange[0]);
    var payload = {};
    payload['inside'] = [];
    payload['outside'] = [];
    for(var i=0; i<num_trials; i+=1){
        var x = Math.random() * (xrange[1] - xrange[0]) + xrange[0];
        var y = Math.random() * (yrange[1] - yrange[0]) + yrange[0];
        if(y < foo(x)){
            num_inside += 1;
            payload['inside'].push({'x': x, 'y': y});
        }
        else{
            payload['outside'].push({'x': x, 'y': y});
        }
        
    }
    payload['area'] = (num_inside/num_trials) * area;
    return payload;
}

var plottableMonteCarlo = function(inside, outside, colors){
    var plotData = [];
    for(var i=0; i<inside.length; i+=1){
        plotData.push({'x': inside[i].x, 'y': inside[i].y, 'color': colors['inside']});
    };
    for(var i=0; i<outside.length; i+=1){
        plotData.push({'x': outside[i].x, 'y': outside[i].y, 'color': colors['outside']});
    };
    return plotData;
}

var findingPi = function(num_trials = 1000){
    var num_inside = 0;
    var r = 0.5;
    var payload = {};
    payload['inside'] = [];
    payload['outside'] = [];
    for(var i=0; i<num_trials; i+=1){
        var x = Math.random();
        var y = Math.random();
        if(Math.pow((x-0.5), 2) + Math.pow((y-0.5), 2) < r*r){
            num_inside += 1;
            payload['inside'].push({'x': x, 'y': y});
        }
        else{
            payload['outside'].push({'x': x, 'y': y});
        }
        
    }
    payload['area'] = (num_inside/num_trials);
    payload['pi'] = payload['area']/(r*r);
    return payload;
}

var up_circle = function(x){
    return 0.5 + Math.sqrt(0.25 - (x-0.5)*(x-0.5))
}

var low_circle = function(x){
    return 0.5 - Math.sqrt(0.25 - (x-0.5)*(x-0.5))
}