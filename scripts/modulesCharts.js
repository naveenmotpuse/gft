var _ModuleCharts = (function () {
    return {
        DrawQuestionChart: function (_data) {
            var _chartc_id = "questionchart";
            var ser1 = "defaultSeries";
            var ser2 = "new_series";
            Highcharts.chart(_chartc_id, {
                title: {
                    text: ''
                },
                tooltip: {
                    formatter: function () {
                        return this.x + ' logs (' + TimePPFTable[this.point.index][0] + ' hours), ' + this.y + ' cals (' + TimePPFTable[this.point.index][1] + ' hours)';
                    },
                    positioner: function (labelWidth, labelHeight, point) {
                        var tooltipX, tooltipY;
                        tooltipX = point.plotX;
                        tooltipY = point.plotY + 20;
                        return {
                            x: tooltipX,
                            y: tooltipY
                        }
                    },
                    snap: 0
                },
                plotOptions: {
                    series: {
                        stickyTracking: false
                    }
                },
                xAxis: {
                    title: {
                        text: 'Firewood (logs)'
                    },
                    min: 0,
                    max: 120,
                    gridLineWidth: 1,
                    tickInterval: 20,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: ColorCodes.gray
                    }]
                },
                yAxis: {
                    title: {
                        text: 'Fish (cals)'
                    },
                    labels: {
                        format: '{value}'
                    },
                    min: 0,
                    gridLineWidth: 1,
                    tickInterval: 500,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: ColorCodes.gray
                    }]
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    id: ser1,
                    name: ser1,
                    type: 'line',
                    lineWidth: 0,
                    data: _data,
                    color: ColorCodes.gray,
                    marker: {
                        enabled: true,
                        radius: 5,
                        symbol: "circle"
                    },
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                },
                {
                    id: ser2,
                    name: ser2,
                    type: 'line',
                    lineWidth: 0,
                    color: ColorCodes.blue,
                    marker: {
                        enabled: true,
                        radius: 5,
                        symbol: "circle"
                    },
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                }
                ]
            }, function () {
                _CustomPage.SetPageAccesibility();
            });
        },
        DrawL2QuestionIntroChart: function () {
            if ($("#questionIntro").length <= 0) return;
            Highcharts.chart('questionIntro', {
                title: {
                    //   text: 'Production Possibilities Frontier'
                    text: ' '
                },
                tooltip: {
                    formatter: function () {
                        return this.x + ' logs (' + TimePPFTable[this.point.index][0] + ' hours), ' + this.y + ' cals (' + TimePPFTable[this.point.index][1] + ' hours)';
                    },
                    snap: 0
                },
                plotOptions: {
                    series: {
                        stickyTracking: false
                    }
                },
                xAxis: {
                    title: {
                        text: 'Firewood (logs)'
                    },
                    min: 0,
                    max: 120,
                    gridLineWidth: 1,
                    tickInterval: 10,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: ColorCodes.gray
                    }]
                },
                yAxis: {
                    title: {
                        text: 'Fish (cals)'
                    },
                    labels: {
                        format: '{value}'
                    },
                    min: 0,
                    gridLineWidth: 1,
                    tickInterval: 1000,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: ColorCodes.gray
                    }]
                },
                legend: {
                    enabled: true,
                    align: 'center',
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    id: 'userppfser',
                    name: 'Your PPF',
                    type: 'spline',
                    lineWidth: 1,
                    data: userPPF,
                    color: ColorCodes.user,
                    marker: {
                        enabled: true,
                        radius: 7,
                        symbol: "circle"
                    },
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                },
                {
                    id: 'fridayppfser',
                    name: "Friday's PPF",
                    type: 'spline',
                    lineWidth: 1,
                    data: fridayPPF,
                    color: ColorCodes.friday,
                    marker: {
                        enabled: true,
                        radius: 5,
                        symbol: "circle"
                    },
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                },
                {
                    id: 'bothppfppoint',
                    name: "Both Student and Friday's Production Point",
                    type: 'spline',
                    lineWidth: 0,
                    data: [
                        [32, 2000]
                    ],
                    color: ColorCodes.transparent,
                    marker: {
                        fillOpacity: 0,
                        lineWidth: 2,
                        lineColor: ColorCodes.both,
                        radius: 10,
                    },
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                }
                ]
            }, function () {
                _CustomPage.SetPageAccesibility();
            });

        },
        DrawL4QuestionIntroChart: function () {
            if ($("#questionIntro").length <= 0) return;
            Highcharts.chart('questionIntro', {
                title: {
                    //   text: 'Production Possibilities Frontier'
                    text: ' '
                },
                tooltip: {
                    formatter: function () {
                        return this.x + ' logs (' + TimePPFTable[this.point.index][0] + ' hours), ' + this.y + ' cals (' + TimePPFTable[this.point.index][1] + ' hours)';
                    },
                    snap: 0
                },
                plotOptions: {
                    series: {
                        stickyTracking: false
                    }
                },
                xAxis: {
                    title: {
                        text: 'Firewood (logs)'
                    },
                    min: 0,
                    max: 120,
                    gridLineWidth: 1,
                    tickInterval: 10,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: ColorCodes.gray
                    }]
                },
                yAxis: {
                    title: {
                        text: 'Fish (cals)'
                    },
                    labels: {
                        format: '{value}'
                    },
                    min: 0,
                    gridLineWidth: 1,
                    tickInterval: 1000,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: ColorCodes.gray
                    }]
                },
                legend: {
                    enabled: true,
                    align: 'center',
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    id: 'userppfser',
                    name: 'Your PPF',
                    type: 'spline',
                    lineWidth: 1,
                    data: _Scenario.GetUserData(),
                    color: ColorCodes.user,
                    marker: {
                        enabled: true,
                        radius: 5,
                        symbol: "circle"
                    },
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                },
                {
                    id: 'fridayppfser',
                    name: "Friday's PPF",
                    type: 'spline',
                    lineWidth: 1,
                    data: _Scenario.GetFridayData(),
                    color: ColorCodes.friday,
                    marker: {
                        enabled: true,
                        radius: 5,
                        symbol: "circle"
                    },
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                }/*,
                    {
                        id: 'bothppfppoint',
                        name: "Both Student and Friday's Production Point",
                        type: 'spline',
                        lineWidth: 0,
                        data: [
                            [32, 2000]
                        ],
                        color: ColorCodes.transparent,
                        marker: {
                            fillOpacity: 0,
                            lineWidth: 2,
                            lineColor: ColorCodes.both,
                            radius: 10,
                        },
                        states: {
                            hover: {
                                lineWidthPlus: 0
                            }
                        }
                    }*/
                ]
            }, function () {
                _CustomPage.SetPageAccesibility();
            });

        },
        DrawSurplusChart: function () {
            Highcharts.chart('surpluschart_c', {
                title: {
                    // text: 'Supplies at start of day'
                    text: ' '
                },
                xAxis: [{
                    /*categories: [1,2,3],*/
                    crosshair: true,
                    title: {
                        text: 'Day',
                        style: {
                            color: ColorCodes.black
                        }
                    },
                    min: 0,
                    gridLineWidth: 1,
                    tickInterval: 1
                }],
                yAxis: [{ // Primary yAxis
                    categories: [0, 10, 20, 30, 40, 50, 60, 70],
                    min: 0,
                    max: 110,
                    gridLineWidth: 0,
                    tickInterval: 10,
                    labels: {
                        format: '{value}',
                        style: {
                            color: ColorCodes.wood
                        }
                    },
                    title: {
                        text: 'Wood (logs)',
                        style: {
                            color: ColorCodes.wood
                        }
                    },
                    opposite: true

                }, { // Secondary yAxis
                    categories: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000],
                    min: 0,
                    max: 11000,
                    gridLineWidth: 1,
                    tickInterval: 1000,
                    title: {
                        text: 'Fish (cals)',
                        style: {
                            color: ColorCodes.fish
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: ColorCodes.fish
                        }
                    }
                }],
                tooltip: {
                    formatter: function () {
                        var s = '<span><strong>Day ' + this.x + '</strong></span><br/>';
                        for (var i = 0; i < this.points.length; i++) {
                            var myPoint = this.points[i];
                            if (myPoint.series.name != "Goal") {
                                s += '<br/><span style="color:' + myPoint.series.color + '">\u25CF</span>' + myPoint.series.name + ': ';

                                if (myPoint.series.name == "Fish") {
                                    s += myPoint.y + ' (cals)';
                                } else {
                                    s += myPoint.y + ' (logs)';
                                }
                            }
                        }
                        return s;
                    },
                    shared: true
                },
                series: [{
                    id: 'Goal',
                    name: 'Goal',
                    type: 'spline',
                    color: ColorCodes.blue,
                    lineWidth: 2,
                    marker: {
                        enabled: true,
                        radius: 0,
                        symbol: "circle"
                    },
                    data: [90, 90, 90, 90, 90]
                }, {
                    id: 'Fish',
                    name: 'Fish',
                    type: 'spline',
                    lineWidth: 2,
                    yAxis: 1,
                    color: ColorCodes.user,
                    marker: {
                        enabled: true,
                        radius: 7,
                        symbol: "circle",
                    },
                    data: []
                }, {
                    id: 'Wood',
                    name: "Wood",
                    type: 'spline',
                    lineWidth: 2,
                    color: ColorCodes.friday,
                    dashStyle: "Dash",
                    marker: {
                        enabled: true,
                        radius: 5,
                        symbol: "circle"
                    },
                    data: []
                }]
            });
        },
        UpdateSurplusChartData: function (_fishdata, _wooddata) {
            var chart = $('#surpluschart_c').highcharts();
            if (chart.get('Fish') != undefined && chart.get('Fish') != null) {
                chart.get('Fish').setData(_fishdata)
            }
            if (chart.get('Wood') != undefined && chart.get('Wood') != null) {
                chart.get('Wood').setData(_wooddata)
            }
            _ModuleCharts.setSurplusChartAccessibility(_fishdata, _wooddata);
        },
        DrawPPFChart: function (_data) {
            Highcharts.chart('ppfchart_c', {
                title: {
                    //   text: 'Production Possibilities Frontier'
                    text: ' '

                },
                tooltip: {
                    formatter: function () {
                        return this.x + ' logs (' + TimePPFTable[this.point.index][0] + ' hours), ' + this.y + ' cals (' + TimePPFTable[this.point.index][1] + ' hours)';
                    },
                    snap: 0
                },
                plotOptions: {
                    series: {
                        stickyTracking: false
                    }
                },
                xAxis: {
                    title: {
                        text: 'Firewood (logs)'
                    },
                    min: 0,
                    max: 120,
                    gridLineWidth: 1,
                    tickInterval: 10,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: ColorCodes.gray
                    }]
                },
                yAxis: {
                    title: {
                        text: 'Fish (cals)'
                    },
                    labels: {
                        format: '{value}'
                    },
                    min: 0,
                    max:7000,
                    gridLineWidth: 1,
                    tickInterval: 1000,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: ColorCodes.gray
                    }]
                },
                legend: {
                    enabled: true,
                    align: 'center',
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    id: 'userppfser',
                    name: 'Your PPF',
                    type: 'spline',
                    lineWidth: 0,
                    data: [],
                    color: ColorCodes.user,
                    marker: {
                        enabled: true,
                        radius: 5,
                        symbol: "circle"
                    },
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                },
                {
                    id: 'fridayppfser',
                    name: "Friday's PPF",
                    type: 'spline',
                    lineWidth: 0,
                    data: [],
                    color: ColorCodes.friday,
                    marker: {
                        enabled: true,
                        radius: 5,
                        symbol: "circle"
                    },
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                }
                ]
            }, function () {
                _CustomPage.SetPageAccesibility();
            });
        },
        DrawTradeCharts: function () {
            var localUserPPF;
            var localfridayPPF;
            var usermax = 5000;
            var fridaymax = 8000;
            var currPage = _Navigator.GetCurrentPage();
            if (currPage.datalevel == 4) {
                localUserPPF = _Scenario.GetUserData();
                localfridayPPF = _Scenario.GetFridayData();
                if (_Scenario.GetScenarioIndex() == 0) {
                    usermax = 5000;
                    fridaymax = 5000;
                }
                else {
                    usermax = 8000;
                    fridaymax = 5000;
                }
            }
            else {
                localUserPPF = userPPF;
                localfridayPPF = fridayPPF;
            }
            Highcharts.chart('studenttradeGraph', {
                title: {
                    text: ' '
                },
                tooltip: {
                    formatter: function () {
                        return this.x + ' logs (' + TimePPFTable[this.point.index][0] + ' hours), ' + this.y + ' cals (' + TimePPFTable[this.point.index][1] + ' hours)';
                    },
                    snap: 0
                },
                plotOptions: {
                    series: {
                        stickyTracking: false
                    }
                },
                xAxis: {
                    title: {
                        text: 'Firewood (logs)'
                    },
                    min: 0,
                    max: 120,
                    gridLineWidth: 1,
                    tickInterval: 10,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: ColorCodes.gray
                    }]
                },
                yAxis: {
                    title: {
                        text: 'Fish (cals)'
                    },
                    labels: {
                        format: '{value}'
                    },
                    min: 0,
                    max: usermax,
                    gridLineWidth: 1,
                    tickInterval: 1000,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: ColorCodes.gray
                    }]
                },
                legend: {
                    enabled: true,
                    align: 'center',
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    id: 'userppfser',
                    name: 'Your PPF',
                    type: 'spline',
                    lineWidth: 1,
                    data: localUserPPF,
                    color: ColorCodes.user,
                    marker: {
                        enabled: true,
                        radius: 5,
                        symbol: "circle"
                    }
                }]
            }, function () {
                _CustomPage.SetPageAccesibility();
            });
            Highcharts.chart('fridaytradeGraph', {
                title: {
                    text: ' '
                },
                tooltip: {
                    formatter: function () {
                        return this.x + ' logs (' + TimePPFTable[this.point.index][0] + ' hours), ' + this.y + ' cals (' + TimePPFTable[this.point.index][1] + ' hours)';
                    },
                    snap: 0
                },
                plotOptions: {
                    series: {
                        stickyTracking: false
                    }
                },
                xAxis: {
                    title: {
                        text: 'Firewood (logs)'
                    },
                    min: 0,
                    max: 120,
                    gridLineWidth: 1,
                    tickInterval: 10,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: ColorCodes.gray
                    }]
                },
                yAxis: {
                    title: {
                        text: 'Fish (cals)'
                    },
                    labels: {
                        format: '{value}'
                    },
                    min: 0,
                    max: fridaymax,
                    gridLineWidth: 1,
                    tickInterval: 1000,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: ColorCodes.gray
                    }]
                },
                legend: {
                    enabled: true,
                    align: 'center',
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    id: 'fridayppfser',
                    name: "Friday's PPF",
                    type: 'spline',
                    lineWidth: 1,
                    data: localfridayPPF,
                    color: ColorCodes.friday,
                    marker: {
                        enabled: true,
                        radius: 5,
                        symbol: "circle"
                    }
                }]
            }, function () {
                _CustomPage.SetPageAccesibility();
            });
        },
        ShowSliderPoint: function (_data) {
            var chart = $('#ppfchart_c').highcharts();
            if (chart.get("sliderpointser") != undefined && chart.get("sliderpointser") != null) {
                chart.get("sliderpointser").remove()
            }
            if (_data != undefined) {
                chart.addSeries({
                    id: "sliderpointser",
                    name: "sliderpointser",
                    data: _data,
                    type: 'spline',
                    lineWidth: 0,
                    color: ColorCodes.transparent,
                    showInLegend: false,
                    marker: {
                        fillOpacity: 0,
                        lineWidth: 2,
                        lineColor: ColorCodes.sliderPoint,
                        radius: 6,
                        symbol: "circle"
                    },
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                });
            }
        },
        AddPointToPPFChart: function (seriesid, _point) {
            this.ShowSliderPoint(undefined);
            var chart = $('#ppfchart_c').highcharts();
            var series = chart.get(seriesid);
            series.addPoint(_point);
        },
        UpdatePPFChartSeries: function (seriesid, _data, _lineWidth) {
            this.ShowSliderPoint(undefined);
            var chart = $('#ppfchart_c').highcharts();
            chart.get(seriesid).setData(_data);
            chart.get(seriesid).update({
                lineWidth: typeof _lineWidth == 'undefined' ? 1 : _lineWidth
            });
        },
        setPlottedPointsAccessibility: function () {
            var chart = $('#questionchart').highcharts();
            var _currentPage = _Navigator.GetCurrentPage();
            var _currPageId = _currentPage.pageId;
            var _currPageQId = _Question.GetCurrentQuestion().Id;
            if (_currPageId == "l1p2" && _currPageQId == "Q3") {
                var s = chart.series[1].data[0].x + " Wood(logs) " + chart.series[1].data[0].y + " Fish(cals), " + chart.series[1].data[1].x + " Wood(logs) " + chart.series[1].data[1].y + " Fish(cals) ";
                //$("#questionchart").attr("aria-label", "Your Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories 0 Wood(logs) 3000 Fish(cals), 96 Wood(logs) 0 Fish(cals). Plotted points: " + s + ". Refer above table for more details.");
            
                this.IEGraphAccessibility("questionchart", "Your Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories 0 Wood(logs) 3000 Fish(cals), 96 Wood(logs) 0 Fish(cals). Plotted points: " + s + ". Refer above table for more details.");
            }
            if (_currPageId == "l1p4" && _currPageQId == "Q7") {
                var s = chart.series[1].data[0].x + " Wood(logs) " + chart.series[1].data[0].y + " Fish(cals), " + chart.series[1].data[1].x + " Wood(logs) " + chart.series[1].data[1].y + " Fish(cals) ";
                //$("#questionchart").attr("aria-label", "Friday's Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 6500 in calories. Plotted points: " + s + ". Refer above table for more details.");
            
                this.IEGraphAccessibility("questionchart", "Friday's Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 6500 in calories. Plotted points: " + s + ". Refer above table for more details.");
            }
            if (_currPageId == "l4p2" && _currPageQId == "Q18") {
                var s = chart.series[1].data[0].x + " Wood(logs) " + chart.series[1].data[0].y + " Fish(cals), " + chart.series[1].data[1].x + " Wood(logs) " + chart.series[1].data[1].y + " Fish(cals) ";
                //$("#questionchart").attr("aria-label", " Your Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 6500 in calories. Plotted points: " + s + ". Refer above table for more details.");
           
                this.IEGraphAccessibility("questionchart", " Your Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 6500 in calories. Plotted points: " + s + ". Refer above table for more details.");
            }
            if (_currPageId == "l4p3" && _currPageQId == "Q19") {
                //$("#questionchart").attr("aria-label", "Your Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 4500 in calories. Plotted points: " + s + ". Refer above table for more details.");
            
                this.IEGraphAccessibility("questionchart", "Your Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 4500 in calories. Plotted points: " + s + ". Refer above table for more details.");
            }
        },
        setSurplusChartAccessibility: function (fish, wood) {
            var _currPageQId = _Question.GetCurrentQuestion().Id;
            var s = "";
            for (var i = 0; i < fish.length; i++) {
                s += "Day " + fish[i][0] + ":" + " Fish: " + fish[i][1] + "(cals), Wood: " + wood[i][1] + "(logs) ";
            }
            //if (_currPageQId == "Q15" || _currPageQId == "Q16" || _currPageQId == "Q17" || _currPageQId == "Q22")
            if(s!=="") {
                //$("#surpluschart_c").attr("aria-label", "Surplus Inventory graph for inventory of fish and woods from day 0 t0 4. Goals: Wood: 90(logs) - Fish: 9000(cals). Plotted points: " + s + ". Refer table for more details.");
           
                this.IEGraphAccessibility("#surpluschart_c","Surplus Inventory graph for inventory of fish and woods from day 0 t0 4. Goals: Wood: 90(logs) - Fish: 9000(cals). Plotted points: " + s + ". Refer table for more details.");
            }
        },
        DrawPPFChartonBookmark: function () {
            //user ppf //
            var ppfdata = _Navigator.Get();
            if (ppfdata.l1p2.questions[2].isAnswered) {
                var questiondata = ppfdata.l1p2.questions[2];
                _ModuleCharts.UpdatePPFChartSeries("userppfser", questiondata.correctData)
                for (var i = 0; i < questiondata.correctData.length; i++) {
                    var point = questiondata.correctData[i];
                    $(".userppftable tbody tr:nth-child(" + (i + 1) + ") td:nth-child(3)").text(point[0])
                    $(".userppftable tbody tr:nth-child(" + (i + 1) + ") td:nth-child(4)").text(point[1])
                  //  $("#ppfchart_c").attr("aria-label", "Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Your PPF line has been drawn. Refer table for more details.");
                
                    this.IEGraphAccessibility("ppfchart_c","Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Your PPF line has been drawn. Refer table for more details.");
                }
            }
            else if (ppfdata.l1p2.questions[1].isAnswered) {
                //_ModuleCharts.AddPointToPPFChart("userppfser", [0, 3000]);
                _ModuleCharts.UpdatePPFChartSeries("userppfser", [[0, 3000], [96, 0]], 0);
                $(".userppftable tbody tr:nth-child(1) td:nth-child(3)").text(0)
                $(".userppftable tbody tr:nth-child(1) td:nth-child(4)").text(3000)
                $(".userppftable tbody tr:nth-child(13) td:nth-child(3)").text(96);
                $(".userppftable tbody tr:nth-child(13) td:nth-child(4)").text(0);

                //$("#ppfchart_c").attr("aria-label", "Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Plotted points: 0 Wood(logs) 3000 Fish(cals), 96 Wood(logs) 0 Fish(cals). Refer table for more details.");
           
                this.IEGraphAccessibility("ppfchart_c","Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Plotted points: 0 Wood(logs) 3000 Fish(cals), 96 Wood(logs) 0 Fish(cals). Refer table for more details.");
            }
            else if (ppfdata.l1p2.questions[0].isAnswered) {
                _ModuleCharts.AddPointToPPFChart("userppfser", [0, 3000])
                $(".userppftable tbody tr:nth-child(1) td:nth-child(3)").text(0)
                $(".userppftable tbody tr:nth-child(1) td:nth-child(4)").text(3000)
                //$("#ppfchart_c").attr("aria-label", "Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Plotted points: 0 Wood(logs) 3000 Fish(cals). Refer table for more details.");
            
                this.IEGraphAccessibility("ppfchart_c","Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Plotted points: 0 Wood(logs) 3000 Fish(cals). Refer table for more details.");
            }

            //Friday ppf//
            if (ppfdata.l1p4.questions[2].isAnswered) {
                var questiondata = ppfdata.l1p4.questions[2];
                _ModuleCharts.UpdatePPFChartSeries("fridayppfser", questiondata.correctData)
                for (var i = 0; i < questiondata.correctData.length; i++) {
                    var point = questiondata.correctData[i];
                    $(".fridayppftable tbody tr:nth-child(" + (i + 1) + ") td:nth-child(3)").text(point[0])
                    $(".fridayppftable tbody tr:nth-child(" + (i + 1) + ") td:nth-child(4)").text(point[1])
                  //  $("#ppfchart_c").attr("aria-label", "Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Both PPF lines are been drawn. Refer table for more details.");
                
                    this.IEGraphAccessibility("ppfchart_c","Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Both PPF lines are been drawn. Refer table for more details.");
                }
            }
            else if (ppfdata.l1p4.questions[1].isAnswered) {
                _ModuleCharts.UpdatePPFChartSeries("fridayppfser", [[0, 6000], [48, 0]], 0)
                $(".fridayppftable tbody tr:nth-child(1) td:nth-child(3)").text(0)
                $(".fridayppftable tbody tr:nth-child(1) td:nth-child(4)").text(6000)
                $(".fridayppftable tbody tr:nth-child(13) td:nth-child(3)").text(48)
                $(".fridayppftable tbody tr:nth-child(13) td:nth-child(4)").text(0)
                //$("#ppfchart_c").attr("aria-label", "Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Plotted points: 0 Wood(logs) 6000 Fish(cals), 48 Wood(logs) 0 Fish(cals). Refer table for more details.");
            
                this.IEGraphAccessibility("ppfchart_c","Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Plotted points: 0 Wood(logs) 6000 Fish(cals), 48 Wood(logs) 0 Fish(cals). Refer table for more details.");
            }
            else if (ppfdata.l1p4.questions[0].isAnswered) {
                $(".fridayppftable").closest(".tablewrapper").k_show();
                _ModuleCharts.AddPointToPPFChart("fridayppfser", [0, 6000])
                $(".fridayppftable tbody tr:nth-child(1) td:nth-child(3)").text(0)
                $(".fridayppftable tbody tr:nth-child(1) td:nth-child(4)").text(6000)
                //$("#ppfchart_c").attr("aria-label", "Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Plotted points: 0 Wood(logs) 6000 Fish(cals). Refer table for more details.");
               
                this.IEGraphAccessibility("ppfchart_c","Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Plotted points: 0 Wood(logs) 6000 Fish(cals). Refer table for more details.");
            }
            //this.IEGraphAccessibility("ppfchart_c",);
        },
        IEGraphAccessibility: function(id, lblText){
            if(isIE11version || isIEEdge){
                $("#" + id).append("<span style='height:0px;font-size:0px'>"+ lblText +"</span>");
            }
            else
            {
                $("#" + id).attr("aria-label", lblText);
            }
        }
    };
})();