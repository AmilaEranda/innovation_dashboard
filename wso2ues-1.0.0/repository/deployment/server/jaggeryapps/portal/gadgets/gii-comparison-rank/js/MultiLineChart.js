function MultiLineChart(area, data, options) {
    var cnfg = {
        marginTop: 40,
        marginRight: 20,
        marginBottom: 40,
        marginLeft: 50,
        chartTitle: "",
        xAxisTitle: "",
        yAxisTitle: "",
        lineColor: "#A52A2A",
        valuePrecision: 2,
        nanMessage: "Not available",
		cursorType: "auto",
		colors: ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#0099C6", "#DD4477", "#AAAA11", "#E67300", "#B77322", "#16D620", "#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#0099C6", "#DD4477", "#AAAA11", "#E67300", "#B77322", "#16D620"],
		legendPosition: "ne",
		legendHorizontalGap: 30,
		legendWidth: 100
    };

    if ('undefined' !== typeof options) {
        for (var i in options) {
            if ('undefined' !== typeof options[i]) {
                cnfg[i] = options[i];
            }
        }
    }

    var areaId = area.charAt(0) === "#" ? area : "#" + area;
    var chartMargin = {top: cnfg.marginTop, right: cnfg.marginRight, bottom: cnfg.marginBottom, left: cnfg.marginLeft};

    this.globalMultiLineNum = globalMultiLineNumber++;

    $("body").append('<div id="multiline-tooltip' + this.globalMultiLineNum + '" class="multiline-tooltip" style="-webkit-border-radius: 8px; -moz-border-radius: 8px; border-radius: 8px; "></div>');
    $("#multiline-tooltip" + this.globalMultiLineNum).css({"position": "absolute", "background": "rgba(0, 0, 0, 0.8)", "color": "white", "font-family": "Arial", "font-size": "14px", "font-weight": "lighter", "z-index": "100", "pointer-events": "none"});
    $("#multiline-tooltip" + this.globalMultiLineNum).append('<div id="multiline-tooltip-content' + this.globalMultiLineNum + '" style="padding: 5px 10px 5px 10px;">');
    $("#multiline-tooltip-content" + this.globalMultiLineNum).append('<span id="multiline-tooltip-title' + this.globalMultiLineNum + '" style="font-size: 16px; font-weight: bold;">title of tooltip</span><br/>');
    $("#multiline-tooltip-content" + this.globalMultiLineNum).append('<span id="multiline-tooltip-desc' + this.globalMultiLineNum + '" style="font-size: 12px;">desc of tooltip</span><br/>');
    $("#multiline-tooltip-content" + this.globalMultiLineNum).append('<span id="multiline-tooltip-value' + this.globalMultiLineNum + '" style="font-size: 14px;">12</span><span id="multiline-tooltip-rank' + this.globalMultiLineNum + '" style="font-size: 14px;">12</span>');

    //$("#multiline-tooltip" + this.globalMultiLineNum).append('<svg style="position: absolute; width: 12px; height: 12px;"><polygon points="0,0 12,0 6,10" style="background: black; fill: rgba(0, 0, 0, 0.8);"></polygon></svg>');

    $("#multiline-tooltip" + this.globalMultiLineNum).hide();

	/*
	var data = [{
			linename: "sri lanka",
			data: [{"name": "2011", value: 56}, {"name": "2012", value: 36}, {"name": "2013", value: 47}, {"name": "2014", value: 24}, {"name": "2015", value: 17}]
		}, {
			linename: "south asia",
			data: [{"name": "2011", value: 26}, {"name": "2012", value: 32}, {"name": "2013", value: 25}, {"name": "2014", value: 55}, {"name": "2015", value: 47}]
		}
	];
	*/
    this.dataArray = data;

    this.setData = function(newData) {
        this.dataArray = newData;
    };
    
    this.setOptions = function(newOptions) {
    	if ('undefined' !== typeof newOptions) {
            for (var i in newOptions) {
                if ('undefined' !== typeof newOptions[i]) {
                    cnfg[i] = newOptions[i];
                }
            }
        }
    };

    this.draw = function() {
        d3.select(areaId).select("svg").remove();
        var lineNum = this.globalMultiLineNum;
        var dataArray = this.dataArray;
		
		$("#multiline-tooltip" + parseInt(lineNum)).hide();

        var chartWidth = $(areaId).width() - chartMargin.left - chartMargin.right;
        var chartHeight = $(areaId).height() - chartMargin.top - chartMargin.bottom;

        var svg = d3.select(areaId)
                .append("svg")
                .attr("class", "d3-line-chart")
                .attr("width", chartWidth + chartMargin.left + chartMargin.right)
                .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
                .style("font-size", "10px")
                .style("font-family", "sans-serif");

        var lineChartGroup = svg.append("g")
                .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

		var oneLineData = dataArray[0].data;
        var xScale = d3.scale.ordinal()
                .domain(oneLineData.map(function(d) {
                    return d.name;
                }))
                .rangeRoundBands([0, chartWidth], 1, 0.3);
		
		var tempMinYValue = d3.min(dataArray, function(d) { 
			return d3.min(d.data, function(v) {
				return v.value;
			}); 
		});
		var minYValue = (tempMinYValue - 2) < 0 ? 0 : (tempMinYValue - 2);
		
		var maxYValue = d3.max(dataArray, function(d) { 
			return d3.max(d.data, function(v) {
				return v.value;
			}); 
		});
		maxYValue += 2;

        var yScale = d3.scale.linear()
                .domain([minYValue, maxYValue])
                .range([chartHeight, 0]);

        var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");

        var yAxis = d3.svg.axis()
				.tickFormat(d3.format("d"))
                .scale(yScale)
                .orient("left")
                .ticks(4);
		
		var zoom = d3.behavior.zoom()
				.x(xScale)
				.y(yScale)
				.scaleExtent([1, 10])
				.on("zoom", zoomed);

        var line = d3.svg.line()
                .x(function(d, i) {
                    return xScale(d.name);
                })
                .y(function(d, i) {
                    return yScale(d.value);
                })
                .interpolate("linear");

        lineChartGroup.append("g")
                .selectAll("g.rule")
                .data(yScale.ticks())
                .enter()
                .append("g")
                .attr("class", "rule")
                .append("line")
                .style("stroke", "#dddddd")
                .style("shape-rendering", "crispEdges")
                .attr("y1", yScale)
                .attr("y2", yScale)
                .attr("x1", 0)
                .attr("x2", chartWidth);

        lineChartGroup.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (chartHeight) + ")")
                .call(xAxis)
                .selectAll(".tick text")
                .call(wrapLineText, xScale.rangeBand());

        lineChartGroup.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -35)
                .attr("dy", "0em")
                .style("text-anchor", "end")
				.style("font-size", "12px")
                .text(cnfg.yAxisTitle);

        // chart title
        lineChartGroup.append("text")
                .attr("x", (chartWidth / 2))
                .attr("y", 5 - (chartMargin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .style("font-weight", "bold")
                .text(cnfg.chartTitle);
				
		var lineGroup = lineChartGroup.selectAll(".dataline")
			.data(dataArray)
			.enter()
			.append("g");
			
        lineGroup.append("path")
                .style("stroke", function(d, i){
					return cnfg.colors[i];
				})
                .style("stroke-width", "4px")
                .style("fill", "none")
                .attr("d", function(d) {
					return line(d.data); 
				})
                .transition()
                .duration(500)
                .ease("linear")
                .attrTween("stroke-dasharray", tweenDash);
			
		var pointsLine = lineChartGroup.selectAll('.line-points')
				.data(dataArray)
				.enter()
				.append("g")
				.attr("class", "line-points");
		
		var points =  pointsLine.selectAll('.dot')
				.data(function(d, index){
					var a = [];
					d.data.forEach(function(point, i) {
						a.push({'index': index, 'point': point, 'linename': d.linename});
					});
					return a;
				})
				.enter()
				.append('circle')
				//.attr('class','dot')
				//.attr("r", 2.5)
				.attr("fill", function(d, i){
					return cnfg.colors[d.index % cnfg.colors.length];
				})
				.style("cursor", cnfg.cursorType)
                .attr("fill-opacity", 1)
                .attr("stroke", function(d, i){
					return cnfg.colors[d.index % cnfg.colors.length];
				})
                .attr("stroke-opacity", 0.2)
                .attr("r", 0)
                .attr("stroke-width", 0)
				.attr("transform", function(d) {
					return "translate(" + xScale(d.point.name) + "," + yScale(d.point.value) + ")"; 
				});
		points.transition()
                .delay(200)
                .duration(500)
				.attr("transform", function(d) {
					return "translate(" + xScale(d.point.name) + "," + yScale(d.point.value) + ")"; 
				})
                .attr("r", function(d, i) {
                    if (isNaN(d.point.value)) {
                        return 2;
                    }
                    return 3;
                })
                .attr("stroke-width", function(d, i) {
                    if (isNaN(d.point.value)) {
                        return 4;
                    }
                    return 6;
                });
		points.on("mouseover", function(d, i) {
				var tipValue = 0;
				var pointR = 0;
				
				if (isNaN(d.point.value)) {
					tipValue = cnfg.nanMessage;
					pointR = 2;
				} else {
					tipValue = (Number(d.point.value)).toFixed(cnfg.valuePrecision);
					tipValue = +tipValue; // drops any "extra" zeroes at the end
					pointR = 8;
				}

				d3.select(this)
						.transition()
						.duration(250)
						.attr("r", pointR);

				var posX = d3.event.pageX - d3.mouse(this)[0] + Number(d3.select(this).attr("cx")) - 6;
				var posY = d3.event.pageY - d3.mouse(this)[1] + Number(d3.select(this).attr("cy")) - 90;

				d3.select("#multiline-tooltip-title" + lineNum).text(d.linename);
				d3.select("#multiline-tooltip-desc" + lineNum).text(d.point.name);
				d3.select("#multiline-tooltip-value" + lineNum).text("Rank: " + tipValue);
				d3.select("#multiline-tooltip-rank" + lineNum).text(", Score: " + d.point.score);
				
				if (d3.event.pageY < 100) {
					posY += 96;
				}
				if ((svg.attr("width") - d3.event.pageX) < 130){
					posX -= 150;
				}
				
				d3.select("#multiline-tooltip" + lineNum)
                    .transition()
                    .style("display", "block")
                    .style("left", posX + "px")
                    .style("top", posY + "px");
        })
		.on("mouseout", function(d, i) {
                    var pointR = 0;

                    if (isNaN(d.point.value)) {
                        pointR = 2;
                    } else {
                        pointR = 3;
                    }

                    d3.select(this)
                            .transition()
                            .duration(250)
                            .attr("r", pointR);

                    d3.select("#multiline-tooltip" + lineNum)
                            .transition()
                            .style("display", "none");
                })
		.on("click", function(d, i){
			
		});
		
		// legend
		var legendHorizontalGap = cnfg.legendHorizontalGap;
		var legendWidth = cnfg.legendWidth;
		var legend = lineChartGroup.append("g")
				.attr("class", "legend")
				.attr("transform", function() {
					var xPos = 0;
					var yPos = 0;
					var legPos = cnfg.legendPosition;
					if (legPos === "ne") {
						xPos = chartWidth - legendWidth;
						yPos = 0;
					} else if (legPos === "e") {
						xPos = chartWidth - legendWidth;
						yPos = (chartHeight / 2) - (dataArray.length * legendHorizontalGap / 2);
					} else if (legPos === "se") {
						xPos = chartWidth - legendWidth;
						yPos = chartHeight - (dataArray.length * legendHorizontalGap);
					} 
					return "translate(" + xPos + ", " + yPos + ")";
                });
		
		var legendRectWidth = 20;
		var legendItem = legend.selectAll('.legend-item')
				.data(dataArray)
				.enter()
				.append("g")
				.attr("class", "legend-item")
                .attr("transform", function(d, i) {
					return "translate(" + 0 + "," + i * legendHorizontalGap + ")";
                });
		legendItem.append("rect")
                .attr("x", function(){
					var xPos = 0;
					var legPos = cnfg.legendPosition;
					if (legPos === "ne") {
						xPos = legendWidth - legendRectWidth;
					} else {
						xPos = legendWidth - legendRectWidth;
					} 
					return xPos;
				})
                .attr("width", 16)
                .attr("height", 16)
                .attr("stroke", function(d, i) {
                    return cnfg.colors[i];
                })
                .attr("stroke-width", "1px")
                .style("fill", function(d, i) {
                    return cnfg.colors[i];
                });
		legendItem.append("text")
                .attr("x", function(){
					var xPos = 0;
					var legPos = cnfg.legendPosition;
					if (legPos === "ne") {
						xPos = legendWidth - legendRectWidth - 5;
					} else {
						xPos = legendWidth - legendRectWidth - 5;
					} 
					return xPos;
				})
                .attr("y", 8)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
				.style("font-size", "12px")
				.style("pointer-events", "none")
                .text(function(d) {
                    return d.linename;
                });
		

        // function to animate line chart
        function tweenDash() {
        	var l;
        	try {
        		l = this.getTotalLength();
        	} catch(err){
        		l = 0;
        	}
            var i = d3.interpolateString("0," + l, l + "," + l);
            return function(t) {
                return i(t);
            };
        }

        // function to wrap x axis tick lables
        function wrapLineText(text, width) {
            text.each(function() {
                var text = d3.select(this),
                        words = text.text().split(/\s+/).reverse(),
                        word,
                        line = [],
                        lineNumber = 0,
                        lineHeight = 1.1, // ems
                        y = text.attr("y"),
                        dy = parseFloat(text.attr("dy")),
                        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");

                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }
                }
            });
        }
		
		// 
		function zoomed() {
			svg.select(".x.axis").call(xAxis);
			svg.select(".y.axis").call(yAxis);   
			svg.selectAll('path.line').attr('d', line);  

			points.selectAll('circle').attr("transform", function(d) { 
				return "translate(" + x(d.point.x) + "," + y(d.point.y) + ")"; }
			);
		}

    };
}

var globalMultiLineNumber = 0;