var _Scenario = (function () {
    var scenarioIndex = -1;

    var userScenario = [{
        woodPerHr: 8,
        fishPerHr: 250,
        woodPerDay: 32,
        fishPerDay: 2000,
        tableData: userPPFTable_ScenarioSeen_1,
        ppfData: userPPF_ScenarioSeen_1
    }, {
        woodPerHr: 4,
        fishPerHr: 500,
        woodPerDay: 32,
        fishPerDay: 2000,
        tableData: userPPFTable_ScenarioSeen_2,
        ppfData: userPPF_ScenarioSeen_2
    }]

    var fridayScenario = [{
        woodPerHr: 4,
        fishPerHr: 225,
        woodPerDay: 40,
        fishPerDay: 450,
        tableData: fridayPPFTable_ScenarioSeen_1,
        ppfData: fridayPPF_ScenarioSeen_1
    }, {
        woodPerHr: 3.5,
        fishPerHr: 350,
        woodPerDay: 7,
        fishPerDay: 3500,
        tableData: fridayPPFTable_ScenarioSeen_2,
        ppfData: fridayPPF_ScenarioSeen_2
    }]

    var scenario_q20 = [
        [250, 8, 31.25, 225, 4, 56.25],
        [500, 4, 125, 350, 3.5, 100]
    ];
    var scenario_q21 = [
        ["radio1"],
        ["radio2"]
    ]
    var calories_q21 = [
        [31.25, 56.25],
        [125, 100]
    ]

    return {
        ShuffleScenario: function () {            
            var qs_sceanarioIndex = $.url('?si');
            if(qs_sceanarioIndex!=undefined){
                scenarioIndex = qs_sceanarioIndex;
            }
            if (scenarioIndex == -1) {
                var indexarr = [1, 0];
                indexarr = indexarr.sort(function () {
                    return .5 - Math.random();
                });
                scenarioIndex = indexarr[0];
            }
        },
        getScenarioIndex: function(){
            return scenarioIndex;
        },
        getUserTable: function(){
            return userScenario[scenarioIndex].tableData;
        },
        getUserData: function(){
            return userScenario[scenarioIndex].ppfData;
        },
        getFridayTable: function(){
            return fridayScenario[scenarioIndex].tableData;
        },
        getFridayData: function(){
            return fridayScenario[scenarioIndex].ppfData;
        },
        getCurrentScenario: function () {
            var pageobj = _Navigator.GetCurrentPage();
            if (pageobj.isFriday == undefined || !pageobj.isFriday) {
                return userScenario[scenarioIndex];
            } else {
                return fridayScenario[scenarioIndex];
            }
        },
        updateQuestionData: function () {            
            _QData.Q18.graphData[0] = userScenario[scenarioIndex].ppfData[0];
            _QData.Q18.graphData[1] = userScenario[scenarioIndex].ppfData[userScenario[scenarioIndex].ppfData.length - 1];
            _QData.Q18.correctData = userScenario[scenarioIndex].ppfData;

            _QData.Q19.graphData[0] = fridayScenario[scenarioIndex].ppfData[0];
            _QData.Q19.graphData[1] = fridayScenario[scenarioIndex].ppfData[fridayScenario[scenarioIndex].ppfData.length - 1];
            _QData.Q19.correctData = fridayScenario[scenarioIndex].ppfData;
            for (var i = 0; i < _QData.Q20.options.length; i++) {
                _QData.Q20.options[i].answer = scenario_q20[scenarioIndex][i];
            }
            for (var i = 0; i < _QData.Q21.options.length; i++) {
                _QData.Q21.options[i].answerId = scenario_q21[scenarioIndex][i];
                _QData.Q21.calories = calories_q21[scenarioIndex];
            }
        }
    }
})();

var _TopSlider = (function () {
    function toggleImage(_this, _type) {
        if ($(_this).find("img").length > 0) {
            if ($(_this).find("img").attr("src").indexOf("down-chevron.png") > 0) {
                $(_this).find("img").attr("src", "assets/images/up-chevron.png")
                $(_this).attr("aria-expanded", "true").attr("aria-current", "true");
                $('body').animate({
                    scrollTop: 0
                }, 1000);
            } else {
                $(_this).find("img").attr("src", "assets/images/down-chevron.png")
                $(_this).attr("aria-expanded", "false").attr("aria-current", "false");
            }
        }
        if (_type == "ppf") {
            hideOtherChart("surplus")
            $("#ppfchart").slideToggle("slow", function () {
                if ($(this).is(":visible")) {
                    //console.log("ppf visible")
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
                    //console.log("surplus visible")
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
                $(_this).attr("aria-expanded", "true").attr("aria-current", "true");
            } else {
                $(_this).find("img").attr("src", "assets/images/down-chevron.png");
                $(_this).attr("aria-expanded", "false").attr("aria-current", "false");
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
                $(".imggraph").k_disable();
                $(".imggraph").attr("aria-expanded","true");
                $(".imggraph").attr("aria-current", "true");

                $(".imgtable").k_enable();
                $(".imgtable").attr("aria-expanded","false");        
                $(".imgtable").attr("aria-current", "false");
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
                _Slider.InitSelectTimeSlider();
                _TradeSlider.InitSlider();
                var pageobj = _Navigator.GetCurrentPage();
                if (pageobj.pageId == "l2p3") {
                    $("#wood-range").val(AnimConfig.dayTime)
                    $('.wood').find('#w_val').text(AnimConfig.dayTime);
                    DataStorage.setWoodSliderVal(Number(AnimConfig.dayTime));
                    _Slider.compare($("#wood-range"))
                    $("#wood-range").k_disable()
                    $("#fish-range").k_disable()
                }
                if (pageobj.pageId == "l4p5") {
                    if(_Scenario.getScenarioIndex() == 1){
                        $(".Scenario0").hide();
                        $(".Scenario1").show();                        
                    }
                }
                $("#consumption-wood-range").k_disable()
                $("#consumption-fish-range").k_disable()

            });
        }
    }
})();

var _CustomQuestion = (function () {
    return {
        OnFeedbackLoad: function () {
            var currPage = _Navigator.GetCurrentPage();
            if (currPage.hasTradeSlider != undefined && currPage.hasTradeSlider) {
                EventManager.UpdateDayInFeedback();
            }
        },
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
            if (qObj.Id == "Q18") {
                $("#woodPerHr").html(_Scenario.getCurrentScenario().woodPerHr);
                $("#fishPerHr").html(_Scenario.getCurrentScenario().fishPerHr);
                $("#woodPerDay").html(_Scenario.getCurrentScenario().woodPerDay);
                $("#fishPerDay").html(_Scenario.getCurrentScenario().fishPerDay);
                $("#q18TableBody").html(this.UpdateScenarioTable());

            }
            if (qObj.Id == "Q19") {
                $("#woodPerHr").html(_Scenario.getCurrentScenario().woodPerHr);
                $("#fishPerHr").html(_Scenario.getCurrentScenario().fishPerHr);
                $("#woodPerDay").html(_Scenario.getCurrentScenario().woodPerDay);
                $("#fishPerDay").html(_Scenario.getCurrentScenario().fishPerDay);
                $("#q19TableBody").html(this.UpdateScenarioTable());
            }
            if (qObj.Id == "Q21") {
                $("#youcalories").html(qObj.calories[0]);
                $("#fridaycalories").html(qObj.calories[1]);
            }
        },
        UpdateScenarioTable: function () {
            
            var scenario = _Scenario.getCurrentScenario().ppfData;
            var tbody = "";
            for (var i = 0; i < TimePPFTable.length; i++) {
                tbody = tbody + '<tr><td>' + TimePPFTable[i][0] + '</td><td>' + TimePPFTable[i][1] + '</td><td>' + scenario[i][0] + '</td><td>' + scenario[i][1] + '</td></tr>'
            }
            return tbody;
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
                $("#linknext").k_enable();
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
            
        },
        PrevGraphAnswer: function () {
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

            this.AddGraphPoints(selectedAnswer_point1.x, selectedAnswer_point1.y, 2);
            this.AddGraphPoints(selectedAnswer_point2.x, selectedAnswer_point2.y, 2);
            _Question.Loadfeedback(_currentQuestionObj.fNo);
            _CustomQuestion.UpdateGraphSubmitStatus();
            $("#linknext").k_enable();
        },
        UpdateGraphSubmitStatus: function () {
            var _currentQuestionObj = _Question.GetCurrentQuestion();
            var chart = $('#questionchart').highcharts();
            chart.get('defaultSeries').setData(_currentQuestionObj.correctData)
            chart.get('defaultSeries').update({
                color: ColorCodes.green,
                lineWidth: 1
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
                var currPoint = {
                    x: newSerData[i][0],
                    y: newSerData[i][1]
                };
                var isonline = this.IsPointOnLine(currPoint, point1, point2)
                if (!isonline) {
                    chart.get('new_series').data[i].graphic.attr({
                        fill: ColorCodes.red
                    });
                }
            }
        },
        GraphRetry: function () {
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
                var currPoint = {
                    x: newSerData[i][0],
                    y: newSerData[i][1]
                };
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
            var pageobj = _Navigator.GetCurrentPage();
            if (pageobj.datalevel == 2) {
                _ModuleCharts.DrawL2QuestionIntroChart();
            } 
            if (pageobj.datalevel == 4) {
                _ModuleCharts.DrawL4QuestionIntroChart();
            }    
                              
            if(pageobj.pageId=="summary")
            {
                //_Navigator.GetLevels();
               var level1 = _Navigator.GetLevelScore(1);
               var level2 = _Navigator.GetLevelScore(2);
               var level3 = _Navigator.GetLevelScore(3);
               var level4 = _Navigator.GetLevelScore(4);
               $("#level1score").html(level1);
               $("#level2score").html(level2);
               $("#level3score").html(level3);
               $("#level4score").html(level4);               
            }            
            if (pageobj.hasTimeSlider != undefined && pageobj.hasTimeSlider) {
                _Template.LoadRangeSlider();
                _Template.LoadDaytimeScheduler();
                _Template.LoadNighttimeScheduler();
            }
            if (pageobj.hasAnimation != undefined && pageobj.hasAnimation) {
                _Template.LoadAnimateArea();
            }

            if (pageobj.hasTradeSlider != undefined && pageobj.hasTradeSlider) {
                _Template.LoadRangeSlider();
                _Template.LoadDaytimeScheduler();
                _Template.LoadNighttimeScheduler();
                _Template.LoadTradeSlider();

                if (pageobj.pageId == "l3p3") {
                    _TradeSlider.SetWayOffTarget();
                }                
                var target = _TradeSlider.GetTarget();
                if (target.goal != "notarget") {
                    $("p.goaldesc").hide();
                    $("p.goaldesc[goal='" + target.goal + "']").show()
                }               
            }  
            if (pageobj.hasActivity != undefined && pageobj.hasActivity) {
                if (pageobj.isAnswered != undefined && pageobj.isAnswered) {
                    $("#" + target.goal).attr('checked', 'checked');
                }
            }          
        }
    };
})();