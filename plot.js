var multiScatterParams = {
    "parentDiv": "div.content",
    "svgClass": "default",
    "fullWidth": 890,
    "fullHeight": 420,
    "margin": { 'top': 20, 'right': 20, 'bottom': 50, 'left': 70 },
    "plotData": [],
    "xLabel": "X",
    "yLabel": "Y",
    "scatterSize": 3.5
}

var lineParams = {
    "parentDiv": "div.content",
    "svgClass": "default",
    "fullWidth": 890,
    "fullHeight": 420,
    "margin": { 'top': 20, 'right': 20, 'bottom': 50, 'left': 70 },
    "color": ["steelblue"],
    "plotData": [],
    "xLabel": "X",
    "yLabel": "Y"
};

var fixedDomainMultiParams = {
    "parentDiv": "div.content",
    "svgClass": "default",
    "fullWidth": 890,
    "fullHeight": 420,
    "margin": { 'top': 20, 'right': 20, 'bottom': 50, 'left': 70 },
    "plotDatasets": [],
    "xLabel": "X",
    "yLabel": "Y"
}

class MultiScatterPlot {

    constructor(params) {
        this.content = d3.selectAll(params.parentDiv);
        this.fullWidth = params.fullWidth;
        this.fullHeight = params.fullHeight;
        this.svgClass = params.svgClass
        this.content.append('svg').attr("class", this.svgClass);

        this.margin = params.margin;
        this.width = this.fullWidth - this.margin.left - this.margin.right;
        this.height = this.fullHeight - this.margin.top - this.margin.bottom;

        this.x = d3.scaleLinear().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);

        this.scatterSize = params.scatterSize;

        this.xAxis = d3.axisBottom(this.x);
        this.yAxis = d3.axisLeft(this.y);
        this.svg = d3.select('.' + this.svgClass)
            .attr("width", this.fullWidth)
            .attr("height", this.fullHeight)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + ',' + this.margin.top + ')')

        var plotData = params.plotData;

        //domain of data
        this.x.domain(d3.extent(plotData, function (d) { return d.x; })).nice();
        this.y.domain(d3.extent(plotData, function (d) { return d.y; })).nice();

        var x = this.x;
        var y = this.y;

        //x-axis
        this.svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(this.xAxis)
        //x-label
        this.svg.append("text")
            .attr("class", "label")
            .attr("transform", "translate(" + this.width / 2 + "," + (this.height + this.margin.bottom - 10) + ")")
            .style("text-anchor", "middle")
            .text(params.xLabel);
        //y-axis
        this.svg.append("g")
            .attr("class", "y-axis")
            .call(this.yAxis);
        //y-label
        this.svg.append("text")
            .attr("class", "label")
            .attr("transform", "translate(" + (30 - this.margin.left) + "," + (this.height / 2) + ") rotate(-90)")
            .style("text-anchor", "middle")
            .text(params.yLabel);

        //points
        this.svg.selectAll(".dot")
            .data(plotData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", this.scatterSize)
            .attr("cx", function (d) { return x(d.x); })
            .attr("cy", function (d) { return y(d.y); })
            .style("fill", function (d) { return d.color; });
    }

    clear() {
        d3.selectAll("." + this.svgClass).selectAll(".dot").remove();
    }

    update(plotData) {
        this.x.domain(d3.extent(plotData, function (d) { return d.x; })).nice();
        this.y.domain(d3.extent(plotData, function (d) { return d.y; })).nice();
        var svgTransition = this.svg.transition();
        var x = this.x;
        var y = this.y;

        this.clear();

        svgTransition.select(".x-axis")
            .duration(750)
            .call(this.xAxis);

        svgTransition.select(".y-axis")
            .duration(750)
            .call(this.yAxis);

        this.svg.selectAll(".dot")
            .data(plotData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", this.scatterSize)
            .attr("cx", function (d) { return x(d.x); })
            .attr("cy", function (d) { return y(d.y); })
            .style("fill", function (d) { return d.color; })
            .style("opacity", 0)
            .transition()
            .delay(750)
            .style("opacity", 1);

    }
}

class LinePlot {

    constructor(params) {
        this.content = d3.selectAll(params.parentDiv);
        this.fullWidth = params.fullWidth;
        this.fullHeight = params.fullHeight;
        this.svgClass = params.svgClass
        this.content.append('svg').attr("class", this.svgClass);

        this.margin = params.margin;
        this.width = this.fullWidth - this.margin.left - this.margin.right;
        this.height = this.fullHeight - this.margin.top - this.margin.bottom;

        this.x = d3.scaleLinear().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);

        this.color = params.color;
        var color = this.color;

        this.xAxis = d3.axisBottom(this.x);
        this.yAxis = d3.axisLeft(this.y);
        this.svg = d3.select('.' + this.svgClass)
            .attr("width", this.fullWidth)
            .attr("height", this.fullHeight)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + ',' + this.margin.top + ')')

        var plotData = params.plotData;

        //domain of data
        this.x.domain(d3.extent(plotData, function (d) { return d.x; })).nice();
        this.y.domain(d3.extent(plotData, function (d) { return d.y; })).nice();

        var x = this.x;
        var y = this.y;

        var valueLine = d3.line().x(function (d) { return x(d.x); }).y(function (d) { return y(d.y); })

        //x-axis
        this.svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(this.xAxis)
        //x-label
        this.svg.append("text")
            .attr("class", "label")
            .attr("transform", "translate(" + this.width / 2 + "," + (this.height + this.margin.bottom - 10) + ")")
            .style("text-anchor", "middle")
            .text(params.xLabel);
        //y-axis
        this.svg.append("g")
            .attr("class", "y-axis")
            .call(this.yAxis);
        //y-label
        this.svg.append("text")
            .attr("class", "label")
            .attr("transform", "translate(" + (30 - this.margin.left) + "," + (this.height / 2) + ") rotate(-90)")
            .style("text-anchor", "middle")
            .text(params.yLabel);

        //path
        this.svg.append("path")
            .data([plotData])
            .attr("class", "line")
            .attr("d", valueLine)
            .style("stroke", color[0]);
    }

    clear() {
        d3.selectAll("." + this.svgClass).selectAll(".line").remove();
    }

    update(plotData) {
        this.x.domain(d3.extent(plotData, function (d) { return d.x; })).nice();
        this.y.domain(d3.extent(plotData, function (d) { return d.y; })).nice();
        var svgTransition = this.svg.transition();
        var color = this.color;
        var x = this.x;
        var y = this.y;
        var valueLine = d3.line().x(function (d) { return x(d.x); }).y(function (d) { return y(d.y); })

        this.clear();

        svgTransition.select(".x-axis")
            .duration(750)
            .call(this.xAxis);

        svgTransition.select(".y-axis")
            .duration(750)
            .call(this.yAxis);

        this.svg.append("path")
            .data([plotData])
            .attr("class", "line")
            .attr("d", valueLine)
            .style("stroke", color[0])
            .style("opacity", 0)
            .transition()
            .delay(750)
            .style("opacity", 1);

    }
}

class FixedDomainMultiPlot {
    constructor(params) {
        this.content = d3.selectAll(params.parentDiv);
        this.fullWidth = params.fullWidth;
        this.fullHeight = params.fullHeight;
        this.svgClass = params.svgClass
        this.content.append('svg').attr("class", this.svgClass);

        this.margin = params.margin;
        this.width = this.fullWidth - this.margin.left - this.margin.right;
        this.height = this.fullHeight - this.margin.top - this.margin.bottom;

        this.x = d3.scaleLinear().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);

        this.xAxis = d3.axisBottom(this.x);
        this.yAxis = d3.axisLeft(this.y);
        this.svg = d3.select('.' + this.svgClass)
            .attr("width", this.fullWidth)
            .attr("height", this.fullHeight)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + ',' + this.margin.top + ')')

        var plotDatasets = params.plotDatasets;
        var domains = this.getDomain(plotDatasets);

        this.x.domain(domains['x']).nice();
        this.y.domain(domains['y']).nice();

        // var x = this.x;
        // var y = this.y;

        //x-axis
        this.svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(this.xAxis)
        //x-label
        this.svg.append("text")
            .attr("class", "label")
            .attr("transform", "translate(" + this.width / 2 + "," + (this.height + this.margin.bottom - 10) + ")")
            .style("text-anchor", "middle")
            .text(params.xLabel);
        //y-axis
        this.svg.append("g")
            .attr("class", "y-axis")
            .call(this.yAxis);
        //y-label
        this.svg.append("text")
            .attr("class", "label")
            .attr("transform", "translate(" + (30 - this.margin.left) + "," + (this.height / 2) + ") rotate(-90)")
            .style("text-anchor", "middle")
            .text(params.yLabel);
        
        this.addPlots(plotDatasets);
    }

    getDomain(plotDatasets) {
        var min_x = Infinity;
        var max_x = -Infinity;
        var min_y = Infinity;
        var max_y = -Infinity;

        for (var i = 0; i < plotDatasets.length; i += 1) {
            var plotData = plotDatasets[i]['data'];
            for (var j = 0; j < plotData.length; j += 1) {
                if (plotData[j]['x'] < min_x) {
                    min_x = plotData[j]['x'];
                }
                else if (plotData[j]['x'] > max_x) {
                    max_x = plotData[j]['x'];
                }
                if (plotData[j]['y'] < min_y) {
                    min_y = plotData[j]['y'];
                }
                else if (plotData[j]['y'] > max_y) {
                    max_y = plotData[j]['y'];
                }
            }
        }
        return {'x': [min_x, max_x], 'y': [min_y, max_y]};
    }

    addPlots(plotDatasets){
        for(var i=0; i<plotDatasets.length; i+=1){
            var plotData = plotDatasets[i];
            if(plotData['kind'] == 'scatter'){
                this.addScatter(plotData['data'], plotData['scatterSize'], plotData['clear']);
            }
            else if(plotData['kind'] == 'line'){
                this.addLine(plotData['data'], plotData['color'], plotData['clear']);
            }
        }
    }

    addLine(plotData, color, clearable){
        var x = this.x;
        var y = this.y;

        var valueLine = d3.line().x(function (d) { return x(d.x); }).y(function (d) { return y(d.y); });

        this.svg.append("path")
            .data([plotData])
            .attr("class", "line")
            .attr("clear", clearable)
            .attr("d", valueLine)
            .style("stroke", color);



    }

    addScatter(plotData, scatterSize, clearable){
        var x = this.x;
        var y = this.y;

        this.svg.selectAll(".dot")
            .data(plotData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("clear", clearable)
            .attr("r", scatterSize)
            .attr("cx", function (d) { return x(d.x); })
            .attr("cy", function (d) { return y(d.y); })
            .style("fill", function (d) { return d.color; });
    }

    clear(){
        this.svg.selectAll("[clear=true]").remove();
    }

    update(plotDatasets){
        this.clear();
        this.addPlots(plotDatasets);
    }
}