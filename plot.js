var scatterParams = {
    "parentDiv": "div.content",
    "svgClass": "default",
    "fullWidth": 890,
    "fullHeight": 420,
    "margin": {'top': 20, 'right' : 20, 'bottom': 50, 'left': 70},
    "color": ["#53E1EC"],
    "plotData": [],
    "xLabel": "X",
    "yLabel": "Y",
    "scatterSize": 3.5
};

var lineParams = {
    "parentDiv": "div.content",
    "svgClass": "default",
    "fullWidth": 890,
    "fullHeight": 420,
    "margin": {'top': 20, 'right' : 20, 'bottom': 50, 'left': 70},
    "color": ["steelblue"],
    "plotData": [],
    "xLabel": "X",
    "yLabel": "Y"
};

class ScatterPlot{

    constructor(scatterParams){
        this.content = d3.selectAll(scatterParams.parentDiv);
        this.fullWidth = scatterParams.fullWidth;
        this.fullHeight = scatterParams.fullHeight;
        this.svgClass = scatterParams.svgClass
        this.content.append('svg').attr("class", this.svgClass);
        
        this.margin = scatterParams.margin;
        this.width = this.fullWidth - this.margin.left - this.margin.right;
        this.height = this.fullHeight - this.margin.top - this.margin.bottom;

        this.x = d3.scaleLinear().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);

        this.color = scatterParams.color;
        var color = this.color;

        this.scatterSize = scatterParams.scatterSize;

        this.xAxis = d3.axisBottom(this.x);
        this.yAxis = d3.axisLeft(this.y);
        this.svg = d3.select('.' + this.svgClass)
            .attr("width", this.fullWidth)
            .attr("height", this.fullHeight)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + ',' + this.margin.top + ')')
        
        var plotData = scatterParams.plotData;

        //domain of data
        this.x.domain(d3.extent(plotData, function(d){return d.x;})).nice();
        this.y.domain(d3.extent(plotData, function(d){return d.y;})).nice();

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
            .attr("transform", "translate(" + this.width/2 + "," + (this.height+this.margin.bottom-10) + ")")
            .style("text-anchor", "middle")
            .text(scatterParams.xLabel);
        //y-axis
        this.svg.append("g")
            .attr("class", "y-axis")
            .call(this.yAxis);
        //y-label
        this.svg.append("text")
            .attr("class", "label")
            .attr("transform", "translate(" + (30 - this.margin.left) + "," + (this.height/2) + ") rotate(-90)")
            .style("text-anchor", "middle")
            .text(scatterParams.yLabel);

        //points
        this.svg.selectAll(".dot")
            .data(plotData)
        .enter().append("circle")
            .attr("class", "dot")
            .attr("r", this.scatterSize)
            .attr("cx", function(d){return x(d.x);})
            .attr("cy", function(d){return y(d.y);})
            .style("fill", function(d){return color[0];});
        }

    clear(){
        d3.selectAll("." + this.svgClass).selectAll(".dot").remove();
    }

    update(plotData){
        this.x.domain(d3.extent(plotData, function(d){return d.x;})).nice();
        this.y.domain(d3.extent(plotData, function(d){return d.y;})).nice();
        var svgTransition = this.svg.transition();
        var color = this.color;
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
            .attr("cx", function(d){return x(d.x);})
            .attr("cy", function(d){return y(d.y);})
            .style("fill", function(d){return color[0];})
            .style("opacity", 0)
            .transition()
            .delay(750)
            .style("opacity", 1);

    }
}

class LinePlot{

    constructor(scatterParams){
        this.content = d3.selectAll(scatterParams.parentDiv);
        this.fullWidth = scatterParams.fullWidth;
        this.fullHeight = scatterParams.fullHeight;
        this.svgClass = scatterParams.svgClass
        this.content.append('svg').attr("class", this.svgClass);
        
        this.margin = scatterParams.margin;
        this.width = this.fullWidth - this.margin.left - this.margin.right;
        this.height = this.fullHeight - this.margin.top - this.margin.bottom;

        this.x = d3.scaleLinear().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);

        this.color = scatterParams.color;
        var color = this.color;

        this.xAxis = d3.axisBottom(this.x);
        this.yAxis = d3.axisLeft(this.y);
        this.svg = d3.select('.' + this.svgClass)
            .attr("width", this.fullWidth)
            .attr("height", this.fullHeight)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + ',' + this.margin.top + ')')
        
        var plotData = scatterParams.plotData;

        //domain of data
        this.x.domain(d3.extent(plotData, function(d){return d.x;})).nice();
        this.y.domain(d3.extent(plotData, function(d){return d.y;})).nice();

        var x = this.x;
        var y = this.y;

        var valueLine = d3.line().x(function(d){return x(d.x);}).y(function(d){return y(d.y);})

        //x-axis
        this.svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(this.xAxis)
        //x-label
        this.svg.append("text")
            .attr("class", "label")
            .attr("transform", "translate(" + this.width/2 + "," + (this.height+this.margin.bottom-10) + ")")
            .style("text-anchor", "middle")
            .text(scatterParams.xLabel);
        //y-axis
        this.svg.append("g")
            .attr("class", "y-axis")
            .call(this.yAxis);
        //y-label
        this.svg.append("text")
            .attr("class", "label")
            .attr("transform", "translate(" + (30 - this.margin.left) + "," + (this.height/2) + ") rotate(-90)")
            .style("text-anchor", "middle")
            .text(scatterParams.yLabel);

        //path
        this.svg.append("path")
            .data([plotData])
            .attr("class", "line")
            .attr("d", valueLine)
            .style("stroke", color[0]);
        }

    clear(){
        d3.selectAll("." + this.svgClass).selectAll(".line").remove();
    }

    update(plotData){
        this.x.domain(d3.extent(plotData, function(d){return d.x;})).nice();
        this.y.domain(d3.extent(plotData, function(d){return d.y;})).nice();
        var svgTransition = this.svg.transition();
        var color = this.color;
        var x = this.x;
        var y = this.y;
        var valueLine = d3.line().x(function(d){return x(d.x);}).y(function(d){return y(d.y);})

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