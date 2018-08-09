var _TopSlider = (function () {
    function toggleImage(_this, _type) {
        if ($(_this).find("img").length > 0) {
            if ($(_this).find("img").attr("src").indexOf("down-chevron.png") > 0) {
                $(_this).find("img").attr("src", "assets/images/up-chevron.png")
                $('html,body').animate({
                    scrollTop: 0
                }, 1000);
            } else {
                $(_this).find("img").attr("src", "assets/images/down-chevron.png")
            }
        }
        if (_type == "ppf") {
            hideOtherChart("surplus")
            $("#ppfchart").slideToggle("slow", function () {
                if ($(this).is(":visible")) {
                    console.log("ppf visible")
                    setTimeout(function () {
                        $("#linkppf").focus();
                    }, 100);
                } else {
                    setTimeout(function () {
                        $(".questionband .headinglevel2div").focus();
                    }, 100);
                }
            });
        } else if (_type == "surplus") {
            hideOtherChart("ppf")
            $("#surpluschart").slideToggle("slow", function () {
                if ($(this).is(":visible")) {
                    console.log("surplus visible")
                    setTimeout(function () {
                        $("#linksurplus").focus();
                    }, 100);
                }
            });
        }
    }

    function hideOtherChart(_type) {
        if (_type == "ppf") {
            if ($("#ppfchart:visible").length <= 0) return;
            _this = $("#linkppf")
            $("#ppfchart").hide();
        } else {
            if ($("#surpluschart:visible").length <= 0) return;
            _this = $("#linksurplus")
            $("#surpluschart").hide();
        }
        if ($(_this).find("img").length > 0) {
            if ($(_this).find("img").attr("src").indexOf("down-chevron.png") > 0) {
                $(_this).find("img").attr("src", "assets/images/up-chevron.png");
            } else {
                $(_this).find("img").attr("src", "assets/images/down-chevron.png");
            }
        }
    }
    return {
        OnLoad: function () {
            if ($("#ppfchart").is(":visible")) {
                this.TogglePPf($("#linkppf"));
            }
            if ($("#surpluschart").is(":visible")) {
                this.ToggleSurplus($("#linksurplus"));
            }
        },
        TogglePPf: function (_this) {
            toggleImage(_this, "ppf");
        },
        ToggleSurplus: function (_this) {
            toggleImage(_this, "surplus");
        }
    };
})();

var _Template = (function () {
    return {
        LoadTopSlider: function () {
            var pageUrl = "templates/topslider.htm" + _Caching.GetUrlExtension();
            $(".top-slider").load(pageUrl, function () {
                //onload callback
                _ModuleCharts.DrawSurplusChart();
                _ModuleCharts.DrawPPFChart();
            });
        },
        LoadAnimateArea: function () {
            var pageUrl = "templates/animate.htm" + _Caching.GetUrlExtension();
            $(".t_animation_c").load(pageUrl, function () {
                //onload callback                
                _Animation.MngAnimationEle();
            });
        },
        LoadRangeSlider: function () {
            var pageUrl = "templates/slider.htm" + _Caching.GetUrlExtension();
            $(".t_range-slider_c").load(pageUrl, function () {
                _Slider.InitSelectTimeSlider();


            });
        },
        LoadDaytimeScheduler: function () {
            var pageUrl = "templates/daytimescheduler.htm" + _Caching.GetUrlExtension();
            $(".daytime_scheduler").load(pageUrl, function () {});
        },
        LoadNighttimeScheduler: function () {
            var pageUrl = "templates/nighttimescheduler.htm" + _Caching.GetUrlExtension();
            $(".nighttime_scheduler").load(pageUrl, function () {});
        },
        LoadTradeSlider: function () {
            var pageUrl = "templates/tradeslider.htm" + _Caching.GetUrlExtension();
            $(".trade_slider_wrapper").load(pageUrl, function () {
                TradeSlider.InitSlider();
                _ModuleCharts.DrawTradeCharts();
            });
        }
    }
})();

var _CustomQuestion = (function () {
    return {
        OnCheckAnswer: function () {
            
            var _currentQuestionObj = _Question.GetCurrentQuestion();
            if (_currentQuestionObj.Id == "Q1") {
                _ModuleCharts.AddPointToPPFChart("userppfser", [0, 3000])
                $(".userppftable tbody tr:nth-child(1) td:nth-child(3)").text(0)
                $(".userppftable tbody tr:nth-child(1) td:nth-child(4)").text(3000)
            } else if (_currentQuestionObj.Id == "Q2") {
                _ModuleCharts.AddPointToPPFChart("userppfser", [96, 0])
                $(".userppftable tbody tr:nth-child(13) td:nth-child(3)").text(96)
                $(".userppftable tbody tr:nth-child(13) td:nth-child(4)").text(0)
            } else if (_currentQuestionObj.Id == "Q3") {
                
                _ModuleCharts.UpdatePPFChartSeries("userppfser", _currentQuestionObj.correctData)
                for (var i = 0; i < _currentQuestionObj.correctData.length; i++) {
                    var point = _currentQuestionObj.correctData[i];
                    $(".userppftable tbody tr:nth-child(" + (i + 1) + ") td:nth-child(3)").text(point[0])
                    $(".userppftable tbody tr:nth-child(" + (i + 1) + ") td:nth-child(4)").text(point[1])
                }
            } else if (_currentQuestionObj.Id == "Q5") {
                $(".fridayppftable").closest(".tablewrapper").show();
                _ModuleCharts.AddPointToPPFChart("fridayppfser", [0, 6000])
                $(".fridayppftable tbody tr:nth-child(1) td:nth-child(3)").text(0)
                $(".fridayppftable tbody tr:nth-child(1) td:nth-child(4)").text(6000)
            } else if (_currentQuestionObj.Id == "Q6") {
                _ModuleCharts.AddPointToPPFChart("fridayppfser", [48, 0])
                $(".fridayppftable tbody tr:nth-child(13) td:nth-child(3)").text(48)
                $(".fridayppftable tbody tr:nth-child(13) td:nth-child(4)").text(0)
            } else if (_currentQuestionObj.Id == "Q7") {
                _ModuleCharts.UpdatePPFChartSeries("fridayppfser", _currentQuestionObj.correctData)
                var j = _currentQuestionObj.correctData.length;
                for (var i = 0; i < _currentQuestionObj.correctData.length; i++) {
                    var point = _currentQuestionObj.correctData[i];
                    $(".fridayppftable tbody tr:nth-child(" + (i + 1) + ") td:nth-child(3)").text(point[0])
                    $(".fridayppftable tbody tr:nth-child(" + (i + 1) + ") td:nth-child(4)").text(point[1])
                }
            }
        },
        OnQuestionLoad: function () {
            var qObj = _Question.GetCurrentQuestion();
            if (qObj.type != undefined && qObj.type == "graph") {
                _ModuleCharts.DrawQuestionChart(qObj.graphData);
                $(".graphbtncheckanswer").k_disable();
            }
        },
        AddGraphPoints: function (wood, fish, valPoints) {
            if ($.trim(fish) != "" && $.trim(wood) != "") {
                if (isNaN(fish) || isNaN(wood)) {
                    //Validation failed.
                } else {
                    //Add Point                    
                    var chart = $('#questionchart').highcharts();
                    var series = chart.get("new_series");
                    //NM: Need to show feedback when user add same point twice.
                    //Point will not get added if the same point is added.			
                    for (var i = 0; i < series.data.length; i++) {
                        if ((series.data[i]['x'] == wood) && (series.data[i]['y'] == fish)) {
                            return;
                        }
                    }
                    if (series.data.length < valPoints) {
                        series.addPoint([Number(wood), Number(fish)]);
                        //point grap
                        var allliesonline = true;
                        for (var i = 0; i < series.length; i++) {
                            var currPoint = {
                                x: series[i][0],
                                y: series[i][1]
                            };
                            var isonline = this.IsPointOnLine(currPoint, [Number(wood), Number(fish)])
                            if (!isonline) {
                                allliesonline = false;
                                break;
                            }
                        }
                        $(".graphbtncheckanswer").k_disable();
                        $("#woodlogtools").val("");
                        $("#fishlogtools").val("");
                        if (series.data.length >= valPoints) {
                            $("#addpointbtn").k_disable()
                            $("#woodlogtools").k_disable()
                            $("#fishlogtools").k_disable()
                            $(".graphbtncheckanswer").k_enable()
                            //$("html, body").animate({ scrollTop: $(document).height() }, 1000);
                        } else {
                            $("#woodlogtools").focus();
                        }
                    }
                }
            }
        },
        IsPointOnLine: function (currPoint, point1, point2) {
            dxc = currPoint.x - point1.x;
            dyc = currPoint.y - point1.y;
            dxl = point2.x - point1.x;
            dyl = point2.y - point1.y;
            cross = dxc * dyl - dyc * dxl;
            if (cross != 0)
                return false;
            else
                return true;
        },
        CheckGraphAnswer: function (valPoints) {
            $(".graphbtncheckanswer").k_disable();
            var point1 = {}
            var _currentQuestionObj = _Question.GetCurrentQuestion();
            point1.x = _currentQuestionObj.graphData[0][0];
            point1.y = _currentQuestionObj.graphData[0][1];
            var point2 = {}
            point2.x = _currentQuestionObj.graphData[1][0];
            point2.y = _currentQuestionObj.graphData[1][1];

            var chart = $('#questionchart').highcharts();
            var newSerData = chart.get('new_series').options.data;
            if (newSerData.length < valPoints) {
                //Alert Feedback
                _Question.LoadAlertFeedback();
                return;
            }
            _currentQuestionObj.selectedAnswer = [newSerData[0], newSerData[1]];
            var allliesonline = true;
            var crrcount = 0;
            for (var i = 0; i < newSerData.length; i++) {
                var currPoint = {
                    x: newSerData[i][0],
                    y: newSerData[i][1]
                };
                var isonline = this.IsPointOnLine(currPoint, point1, point2)
                if (!isonline) {
                    allliesonline = false;
                } else {
                    crrcount++;
                }
            }

            if (allliesonline) {
                //Show Correct Feedback
                fNo = 0;
                _Question.Loadfeedback(fNo);
                _currentQuestionObj.points = crrcount / valPoints;
                _currentQuestionObj.isAnswered = true;
                _currentQuestionObj.fNo = fNo;
                //Need to think on generic logic.
                _CustomQuestion.UpdateGraphSubmitStatus();
                _CustomQuestion.OnCheckAnswer();
                _Navigator.UpdateScore();
            } else {
                _currentQuestionObj.tryCount += 1;
                var fNo = _currentQuestionObj.tryCount;
                //Incorrect Feedback
                if (_currentQuestionObj.tryCount < _currentQuestionObj.totalTry) {
                    //Show tryCount incorrect feedback
                    _Question.Loadfeedback(fNo);
                } else {
                    _Question.Loadfeedback(fNo);
                    _currentQuestionObj.points = crrcount / valPoints;
                    _currentQuestionObj.isAnswered = true;
                    _currentQuestionObj.fNo = fNo;
                    $("#linknext").k_enable();
                    _CustomQuestion.UpdateGraphSubmitStatus();
                    //Need to think on generic logic.
                    _CustomQuestion.OnCheckAnswer();
                    _Navigator.UpdateScore();
                }
            }
            $("#linknext").k_enable();
        },
        PrevGraphAnswer: function(){
            var point1 = {}
            var _currentQuestionObj = _Question.GetCurrentQuestion();
            point1.x = _currentQuestionObj.graphData[0][0];
            point1.y = _currentQuestionObj.graphData[0][1];
            var point2 = {}
            point2.x = _currentQuestionObj.graphData[1][0];
            point2.y = _currentQuestionObj.graphData[1][1];
            
            var selectedAnswer_point1 = {}
            selectedAnswer_point1.x = _currentQuestionObj.selectedAnswer[0][0];
            selectedAnswer_point1.y = _currentQuestionObj.selectedAnswer[0][1];
            var selectedAnswer_point2 = {}
            selectedAnswer_point2.x = _currentQuestionObj.selectedAnswer[1][0];
            selectedAnswer_point2.y = _currentQuestionObj.selectedAnswer[1][1];        
            
            this.AddGraphPoints(selectedAnswer_point1.x,selectedAnswer_point1.y,2);
            this.AddGraphPoints(selectedAnswer_point2.x,selectedAnswer_point2.y,2);   
            _Question.Loadfeedback(_currentQuestionObj.fNo);            
            _CustomQuestion.UpdateGraphSubmitStatus();    
            $("#linknext").k_enable();
        },
        FindOutComplete: function(jsonObj) {
            var _currentQuestionObj = _Question.GetCurrentQuestion();
            
            if (jsonObj.IsAlive) {
                _currentQuestionObj.isAnswered = true;
                _currentQuestionObj.points = parseFloat(_currentQuestionObj.totalPoints);
                _Question.Loadfeedback(0);
            }
            else if (jsonObj.DiedReason == "less_fish") {
                _currentQuestionObj.isAnswered = true;
                _currentQuestionObj.points = 0.0;
                _Question.Loadfeedback(1);
            }
            else if (jsonObj.DiedReason == "less_wood") {
                _currentQuestionObj.isAnswered = true;
                _currentQuestionObj.points = 0.0;
                _Question.Loadfeedback(2);
            }
        },
        UpdateGraphSubmitStatus: function() {
            var _currentQuestionObj = _Question.GetCurrentQuestion();
            var chart = $('#questionchart').highcharts();
            chart.get('defaultSeries').setData(_currentQuestionObj.correctData)
            chart.get('defaultSeries').update({
                color: ColorCodes.green
            });
            var point1 = {}    
            point1.x = _currentQuestionObj.graphData[0][0];
            point1.y = _currentQuestionObj.graphData[0][1];
            var point2 = {}
            point2.x = _currentQuestionObj.graphData[1][0];
            point2.y = _currentQuestionObj.graphData[1][1];
        
            
            var newSerData = chart.get('new_series').options.data;
            var refArray = [];
            for (var i = 0; i < newSerData.length; i++) {
                var currPoint = { x: newSerData[i][0], y: newSerData[i][1] };
                var isonline = this.IsPointOnLine(currPoint, point1, point2)
                if (!isonline) {
                    chart.get('new_series').data[i].graphic.attr({ fill: ColorCodes.red });
                }
            }    
        },
        GraphRetry: function() {
            _Question.UnloadFeedback();
            $("#div_question").find("input[type='number']").val("");    
            $("#addpointbtn").k_enable()
            $("#woodlogtools").k_enable()
            $("#fishlogtools").k_enable()
            $(".graphbtncheckanswer").k_disable();
            var point1 = {}
            var _currentQuestionObj = _Question.GetCurrentQuestion();
            point1.x = _currentQuestionObj.graphData[0][0];
            point1.y = _currentQuestionObj.graphData[0][1];
            var point2 = {}
            point2.x = _currentQuestionObj.graphData[1][0];
            point2.y = _currentQuestionObj.graphData[1][1];
        
            var chart = $('#questionchart').highcharts();
            var newSerData = chart.get('new_series').options.data;
            var refArray = [];
            for (var i = 0; i < newSerData.length; i++) {
                var currPoint = { x: newSerData[i][0], y: newSerData[i][1] };
                var isonline = this.IsPointOnLine(currPoint, point1, point2)
                if (!isonline) {
                    refArray.push(chart.get('new_series').data[i]);
                }
            }
            for (var i = 0; i < refArray.length; i++) {
                refArray[i].remove(true);
            }
            chart.redraw();
        }
    };
})();

var _CustomPage = (function () {
    return {
        OnPageLoad: function () {
            pageobj = _Navigator.GetCurrentPage();
            if (pageobj.pageId == "l2p2") {
                _ModuleCharts.DrawL2P2QuestionChart();
            }
            if (pageobj.hasTimeSlider != undefined && pageobj.hasTimeSlider) {
                _Template.LoadRangeSlider();
                _Template.LoadDaytimeScheduler();
                _Template.LoadNighttimeScheduler();
            }
            if (pageobj.hasAnimation != undefined && pageobj.hasAnimation) {
                _Template.LoadAnimateArea();
            }
            if (pageobj.isFriday != undefined && pageobj.isFriday) {
                AnimConfig.isFriday = true;
            }
            if (pageobj.hasTradeSlider != undefined && pageobj.hasTradeSlider) {
                _Template.LoadRangeSlider();
                _Template.LoadDaytimeScheduler();
                _Template.LoadNighttimeScheduler();
                _Template.LoadTradeSlider();
            } else {
                AnimConfig.isFriday = false;
            }
            if (pageobj.hasActivity != undefined && pageobj.hasActivity) {
                if (pageobj.isAnswered != undefined && pageobj.isAnswered) {
                    $("#" + ToolProps.tool).attr('checked', 'checked');
                }
            }
        }
    };
})();