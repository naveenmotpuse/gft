var _ModuleCharts = (function () {
    return {
        DrawQuestionChart: function (_data) {
            var _chartc_id = "questionchart";
            var ser1 = "defaultSeries";
            var ser2 = "new_series";
            Highcharts.chart(_chartc_id, {
                title: {
                    text: 'Production Possibilities Frontier'
                },
                tooltip: {
                    formatter: function () {
                        return this.x + ' logs, ' + this.y + ' Cals';
                    },
                    positioner: function (labelWidth, labelHeight, point) {
                        var tooltipX, tooltipY;
                        tooltipX = point.plotX;
                        tooltipY = point.plotY + 80;
                        return {
                            x: tooltipX,
                            y: tooltipY
                        };
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
                        text: 'Fish (Cals)'
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
                        lineWidth: 1,
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
            });
        },
        DrawL2P2QuestionChart: function () {
            Highcharts.chart('l2p2graph', {
                title: {
                    //   text: 'Production Possibilities Frontier'
                    text: ' '
                },
                tooltip: {
                    formatter: function () {
                        return this.x + ' logs, ' + this.y + ' Cals';
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
                        text: 'Fish (Cals)'
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
                    categories: [0, 10, 20, 30, 40, 50, 60, 70, 80],
                    min: 0,
                    max: 80,
                    gridLineWidth: 0,
                    tickInterval: 10,
                    labels: {
                        format: '{value}',

                        style: {
                            color: ColorCodes.wood
                        }
                    },
                    title: {
                        text: 'Wood (lbs)',
                        style: {
                            color: ColorCodes.wood
                        }
                    },
                    opposite: true

                }, { // Secondary yAxis
                    categories: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
                    min: 0,
                    max: 8000,
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
                                    s += myPoint.y + ' (lbs)';
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
                    data: [30, 30, 30, 30, 30]
                }, {
                    id: 'Fish',
                    name: 'Fish',
                    type: 'spline',
                    lineWidth: 2,
                    yAxis: 1,
                    color: ColorCodes.fish,
                    marker: {
                        enabled: true,
                        radius: 10,
                        symbol: "circle",
                    },
                    data: []
                }, {
                    id: 'Wood',
                    name: 'Wood',
                    type: 'spline',
                    lineWidth: 2,
                    color: ColorCodes.wood,
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
        DrawPPFChart: function () {
            Highcharts.chart('ppfchart_c', {
                title: {
                    //   text: 'Production Possibilities Frontier'
                    text: ' '
                },
                tooltip: {
                    formatter: function () {
                        return this.x + ' logs, ' + this.y + ' Cals';
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
                        text: 'Fish (Cals)'
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
            });
        },
        DrawTradeCharts: function () {
            Highcharts.chart('studenttradeGraph', {
                title: {                    
                    text: ' '
                },
                tooltip: {
                    formatter: function () {
                        return this.x + ' logs, ' + this.y + ' Cals';
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
                        text: 'Fish (Cals)'
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
                        radius: 5,
                        symbol: "circle"
                    }
                }]
            });
            Highcharts.chart('fridaytradeGraph', {
                title: {
                    text: ' '
                },
                tooltip: {
                    formatter: function () {
                        return this.x + ' logs, ' + this.y + ' Cals';
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
                        text: 'Fish (Cals)'
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
                    }
                }]
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
        UpdatePPFChartSeries: function (seriesid, _data) {
            this.ShowSliderPoint(undefined);
            var chart = $('#ppfchart_c').highcharts();
            chart.get(seriesid).setData(_data);
            chart.get(seriesid).update({
                lineWidth: 1
            });
        }
    };
})();