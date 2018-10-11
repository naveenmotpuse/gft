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
            if (qs_sceanarioIndex != undefined) {
                scenarioIndex = qs_sceanarioIndex;
            }
            if (scenarioIndex == -1) {
                var indexarr = [1, 0, 0, 1, 1, 0, 1, 0, 1, 0];
                indexarr = indexarr.sort(function () {
                    return 0.5 - Math.random();
                });
                scenarioIndex = indexarr[0];
            }
        },
        SetScenarioIndex: function(_scenarioIndex){
            if(_scenarioIndex!=undefined){
                scenarioIndex = _scenarioIndex;
            }
        },
        GetScenarioIndex: function () {
            return scenarioIndex;
        },
        GetUserTable: function () {
            return userScenario[scenarioIndex].tableData;
        },
        GetUserData: function () {
            return userScenario[scenarioIndex].ppfData;
        },
        GetFridayTable: function () {
            return fridayScenario[scenarioIndex].tableData;
        },
        GetFridayData: function () {
            return fridayScenario[scenarioIndex].ppfData;
        },
        GetCurrentScenario: function () {
            var currPage = _Navigator.GetCurrentPage();
            if (currPage.isFriday == undefined || !currPage.isFriday) {
                return userScenario[scenarioIndex];
            } else {
                return fridayScenario[scenarioIndex];
            }
        },
        UpdateQuestionData: function () {
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
                    }, 500);
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
                    }, 500);
                }
            });
        }
    }

    function hideOtherChart(_type) {
        if (_type == "ppf") {
            if ($("#ppfchart:visible").length <= 0) return;
            _this = $("#linkppf")
            $("#ppfchart").k_hide();
        } else {
            if ($("#surpluschart:visible").length <= 0) return;
            _this = $("#linksurplus")
            $("#surpluschart").k_hide();
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
                //$(".imggraph").k_enable();
                $(".imggraph").attr("aria-expanded", "true");
                $(".imggraph").attr("aria-current", "true");

                $(".imgtable").addClass("custIdisabled");
                $(".imgtable").attr("aria-expanded", "false");
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
            $(".daytime_scheduler").load(pageUrl, function () { });
        },
        LoadNighttimeScheduler: function () {
            var pageUrl = "templates/nighttimescheduler.htm" + _Caching.GetUrlExtension();
            $(".nighttime_scheduler").load(pageUrl, function () { });
        },
        LoadTradeSlider: function () {
            var pageUrl = "templates/tradeslider.htm" + _Caching.GetUrlExtension();
            $(".trade_slider_wrapper").load(pageUrl, function () {
                var currPage = _Navigator.GetCurrentPage();
                //debugger;
                if (currPage.IsComplete == undefined || !currPage.IsComplete) {
                    _Slider.InitSelectTimeSlider();
                }
                _TradeSlider.InitSlider();
                _TradeSlider.ResetTimeSlider();

                if (currPage.pageId == "l2p3") {
                    $("#wood-range").k_disable()
                    $("#fish-range").k_disable()
                }
                if (currPage.pageId == "l3p2") {
                    var target = _TradeSlider.GetTarget();
                    if (target.goal == "book") {
                        $("li.c-idle span span").text("Reading");
                    }
                }
                if (currPage.pageId == "l4p5") {
                    if (_Scenario.GetScenarioIndex() == 1) {
                        $(".Scenario0").k_hide();
                        $(".Scenario1").k_show();
                    } else {
                        $(".Scenario0").k_show();
                        $(".Scenario1").k_hide();
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
        PrevAnswer: function () {
            var _currentQuestionObj = _Question.GetCurrentQuestion();
            if (_currentQuestionObj.type == "graph") {
                this.GraphPrevAnswer();
            } else if (_currentQuestionObj.type == "activity") {
                this.ActivityPrevAnswer();
            }
        },
        OnFeedbackLoad: function () {
            var currPage = _Navigator.GetCurrentPage();
            if (currPage.hasTradeSlider != undefined && currPage.hasTradeSlider) {
                EventManager.UpdateDayInFeedback();
            }
        },
        ActionAfterCheckAnswer: function () {
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
                $(".fridayppftable").closest(".tablewrapper").k_show();
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
            $("#graph-div").attr("aria-label", "Daytime Schedule Idle");
            if(qObj.Id == "Q15"){
                $("#graph-div").attr("aria-label", "Daytime Schedule Collect Wood 12 Hour Collect Fish 0 Hour Idle 0 Hour");
                $("#img-stranded-island").attr("alt","Friday rafts over to your island proposing that you could be better off through trade.");
            }
            if(qObj.Id == "Q16"){
                $("#graph-div").attr("aria-label", "Daytime Schedule Collect Wood 12 Hour Collect Fish 0 Hour Idle 0 Hour");
                $("#img-stranded-island").attr("alt","Friday rafts over to your island proposing that you could be better off through trade.");
            }
            if(qObj.Id == "Q17"){
                $("#graph-div").attr("aria-label", "Daytime Schedule Collect Wood 12 Hour Collect Fish 0 Hour Idle 0 Hour");
                $("#img-stranded-island").attr("alt","Friday rafts over to your island proposing that you could be better off through trade.");
            }
            if(qObj.Id == "Q22"){
                $("#graph-div").attr("aria-label", "Daytime Schedule Collect Wood 0 Hour Collect Fish 12 Hour Idle 0 Hour");
                $("#img-stranded-island").attr("alt","Friday rafts over to your island proposing that you could be better off through trade.");
            }
            if (qObj.Id == "Q18") {
                $("#woodPerHr").html(_Scenario.GetCurrentScenario().woodPerHr);
                $("#fishPerHr").html(_Scenario.GetCurrentScenario().fishPerHr);
                $("#woodPerDay").html(_Scenario.GetCurrentScenario().woodPerDay);
                $("#fishPerDay").html(_Scenario.GetCurrentScenario().fishPerDay);
                $("#q18TableBody").html(this.UpdateScenarioTable());

            }
            if (qObj.Id == "Q19") {
                $("#woodPerHr").html(_Scenario.GetCurrentScenario().woodPerHr);
                $("#fishPerHr").html(_Scenario.GetCurrentScenario().fishPerHr);
                $("#woodPerDay").html(_Scenario.GetCurrentScenario().woodPerDay);
                $("#fishPerDay").html(_Scenario.GetCurrentScenario().fishPerDay);
                $("#q19TableBody").html(this.UpdateScenarioTable());
            }
            if (qObj.Id == "Q21") {
                $("#youcalories").html(qObj.calories[0]);
                $("#fridaycalories").html(qObj.calories[1]);
            }      
            _CustomPage.SetPageAccesibility();      
        },
        UpdateScenarioTable: function () {
            var scenario = _Scenario.GetCurrentScenario().ppfData;
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
                    $(".assistive-text").text('');
                    $(".assistive-text").text("Production Possibility Frontier updated for points, wood "+ wood+" and fish "+ fish);
                    var chart = $('#questionchart').highcharts();
                    var series = chart.get("new_series");
                    //NM: Need to show feedback when user add same point twice.
                    //Point will not get added if the same point is added.			
                    /*for (var i = 0; i < series.data.length; i++) {
                        if ((series.data[i]['x'] == wood) && (series.data[i]['y'] == fish)) {
                            return;
                        }
                    }*/
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
            var isWorsen = false;
            var feedbackIndex = 0;
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
                feedbackIndex = 0;
                _Question.Loadfeedback(feedbackIndex);
                _currentQuestionObj.points = crrcount / valPoints;
                _currentQuestionObj.isAnswered = true;
                _currentQuestionObj.feedbackIndex = feedbackIndex;
                //Need to think on generic logic.
                _CustomQuestion.UpdateGraphSubmitStatus();
                _CustomQuestion.ActionAfterCheckAnswer();
                _Navigator.UpdateScore();
                $("#linknext").k_enable();
            } else {
                _currentQuestionObj.tryCount += 1;
                feedbackIndex = _currentQuestionObj.tryCount;
                //Incorrect Feedback
                if (_currentQuestionObj.tryCount < _currentQuestionObj.totalTry) {
                    //Show tryCount incorrect feedback                    
                    _Question.Loadfeedback(feedbackIndex);
                } else {
                    //best score
                    var pageId = _Navigator.GetCurrentPage().pageId;
                    var Qid = _currentQuestionObj.Qid; 
                    var attemptCurrentQuestionData = _Navigator.GetQuestionAttemptData(pageId, Qid);
                    if (attemptCurrentQuestionData != undefined) {
                        var attemptPoint1 = attemptCurrentQuestionData.selectedAnswer[0];
                        var attemptPoint2 = attemptCurrentQuestionData.selectedAnswer[1];
                        var newSerDataIndex = 2;
                        for (var i = 0; i < attemptCurrentQuestionData.selectedAnswer.length; i++) {
                            if (newSerData[i][0] != attemptCurrentQuestionData.selectedAnswer[i][0] && newSerData[i][1] != attemptCurrentQuestionData.selectedAnswer[i][1]) {
                                newSerData[newSerDataIndex] = [attemptCurrentQuestionData.selectedAnswer[i][0],attemptCurrentQuestionData.selectedAnswer[i][1]];
                                newSerDataIndex++;
                            }
                        }

                        var crrcount = 0;
                        var countval = 0;
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
                                _currentQuestionObj.selectedAnswer[countval] = [newSerData[i][0], newSerData[i][1]];
                                countval++;
                                isWorsen = true;                            
                            }
                        }

                    }

                    _currentQuestionObj.points = crrcount / valPoints;
                    _currentQuestionObj.isAnswered = true;
                    _currentQuestionObj.feedbackIndex = feedbackIndex;

                    _Question.Loadfeedback(feedbackIndex, isWorsen);
                    $("#linknext").k_enable();
                    _CustomQuestion.UpdateGraphSubmitStatus();
                    //Need to think on generic logic.
                    _CustomQuestion.ActionAfterCheckAnswer();
                    _Navigator.UpdateScore();
                }
            }

        },
        GraphPrevAnswer: function () {
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
            _Question.Loadfeedback(_currentQuestionObj.feedbackIndex);
            _CustomQuestion.UpdateGraphSubmitStatus();
            $(".graphbtncheckanswer").k_disable();
            $("#linknext").k_enable();
        },
        ActivityPrevAnswer: function () {
            console.log("ActivityPrevAnswer start");
            var currPage = _Navigator.GetCurrentPage();
            //var datacoll = DataStorage.getCollection();
            var activityDatacoll = DataStorage.getActivityData();
            var activityData = activityDatacoll[activityDatacoll.length - 1];

            if (currPage.hasTradeSlider != undefined && currPage.hasTradeSlider) {
                var target = activityData.tradeData.Target;
                if (target.goal == "survive") {
                    _Question.Loadfeedback(0);
                } else if (target.goal == "shelter") {
                    _Question.Loadfeedback(3);
                } else if (target.goal == "feast") {
                    _Question.Loadfeedback(4);
                } else if (target.goal == "book") {
                    _Question.Loadfeedback(5);
                } else if (target.goal == "wayoff") {
                    _Question.Loadfeedback(3);
                } else if (target.goal == "betteroff") {
                    _Question.Loadfeedback(1);
                }
                if (currPage.pageId == "l3p2") {
                    if (target.goal != "survive") {
                        $("p.goaldesc").k_hide();
                        $("p.goaldesc[goal='" + target.goal + "']").k_show()
                    }
                }
                $("#dayno").text(activityData.day);
                $(".fishcounter .count").text(activityData.remFish);
                $(".woodcounter .count").text(activityData.remWood);
                $("#onewoodfor-range").val(activityData.tradeData.TR.onewoodfor)
                $("#onewoodfor-fish").text(activityData.tradeData.TR.onewoodfor)
                $("#givewood-range").attr("max", activityData.tradeData.TR.consumptionwood + activityData.tradeData.TR.givewood)
                $("#givewood-range").val(activityData.tradeData.TR.givewood)
                $("#givewood-logs").text(activityData.tradeData.TR.givewood)
                $("#receivefish-cals").text(activityData.tradeData.TR.receivefish)

                $("#consumption-wood").text(activityData.tradeData.TR.consumptionwood)
                $(".consumption-wood.r_label").text(activityData.tradeData.TR.consumptionwood + activityData.tradeData.TR.givewood)
                $("#consumption-wood-range").attr("max", activityData.tradeData.TR.consumptionwood + activityData.tradeData.TR.givewood)
                $("#consumption-wood-range").val(activityData.tradeData.TR.consumptionwood);
                $("#consumption-fish").text(activityData.tradeData.TR.consumptionfish)
                $("#consumption-fish-range").attr("max", activityData.tradeData.TR.fridayconsumptionfish + activityData.tradeData.TR.receivefish)
                $("#consumption-fish-range").val(activityData.tradeData.TR.consumptionfish);
                $(".consumption-fish.r_label").text(activityData.tradeData.TR.fridayconsumptionfish + activityData.tradeData.TR.receivefish);

                _TradeSlider.ShowSliderPoint("studenttradeGraph", [activityData.tradeData.TR.consumptionwood, activityData.tradeData.TR.consumptionfish]);
                _TradeSlider.ShowSliderPoint("fridaytradeGraph", [activityData.tradeData.TR.fridayconsumptionwood, activityData.tradeData.TR.fridayconsumptionfish]);
                //_TradeSlider.SetTradeResult();
                $("#onewoodfor-range").k_disable();
                $("#givewood-range").k_disable();
                $(".tot-slider").addClass('disabled');
            } else {
                if (activityData.pageId == currPage.pageId) {
                    Table.setWood(activityData._woodsLbs, 0);
                    Table.setfish(activityData._fishCals, 0);
                }
                _Question.Loadfeedback(0);
            }

            $("#btnfindout").k_disable();
            $(".selecttimeslider").k_hide();
            $(".startbtnpanel").k_hide();
            $(".runtimeslider").k_hide();
            $(".nighttimeslider").k_show();
            $("#slider-arrow-night").css({
                "left": "96%"
            });
            $("#div_question").removeClass("displaynone").k_show();
            $(".findout").k_disable();
            $("#linknext").k_enable();

            console.log("ActivityPrevAnswer end");
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


            var newSerData = _currentQuestionObj.selectedAnswer;//chart.get('new_series').options.data;
            var refArray = [];
            for (var i = 0; i < newSerData.length; i++) {
                var currPoint = {
                    x: newSerData[i][0],
                    y: newSerData[i][1]
                };
                var isonline = this.IsPointOnLine(currPoint, point1, point2)
                if (!isonline) {
                    //debugger;
                    chart.get('new_series').data[i].graphic.attr({
                        fill: ColorCodes.red
                    });
                }
            }
        },
        GraphRetry: function () {
            _Question.UnloadFeedback();
            $("#div_question").find("input[type='text']").val("");
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
            var currPage = _Navigator.GetCurrentPage();
            if(true || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
                $('.exambtnsubmindiv').hide();
            }
            if (currPage.datalevel == 2) {
                _ModuleCharts.DrawL2QuestionIntroChart();
            }
            if (currPage.datalevel == 4) {
                _ModuleCharts.DrawL4QuestionIntroChart();
            }
            if (currPage.pageId == "summary") {
                for (var i = 1; i <= 4; i++) {
                    var levelscore = _Navigator.GetLevelScore(i);
                    $("#level" + i + "score").html(levelscore.toFixed(0));
                    if (Number(levelscore) >= 80) {
                        $("#imglevel" + i).attr("src", "assets/images/stars_3.png")
                        $("#imglevel" + i).attr("alt", "Level " + i + " : 3 star").attr("aria-label", "Level " + i + " : 3 star")
                    } else if (Number(levelscore) >= 50 && Number(levelscore) < 80) {
                        $("#imglevel" + i).attr("src", "assets/images/stars_2.png")
                        $("#imglevel" + i).attr("alt", "Level " + i + " : 2 star").attr("aria-label", "Level " + i + " : 2 star")
                    } else {
                        $("#imglevel" + i).attr("src", "assets/images/stars_1.png")
                        $("#imglevel" + i).attr("alt", "Level " + i + " : 1 star").attr("aria-label", "Level " + i + " : 1 star")
                    }
                }

                // set TPI completion
                _Module.PostFinalGrade();
                _Module.SaveSessionData();
                if(_LevelAccess.IsAllLevelsAttempted()){
                    $(".exambtnretry").k_disable();
                }else{
                    $(".exambtnretry").k_enable();
                }
            }
            if (currPage.hasTimeSlider != undefined && currPage.hasTimeSlider) {
                _Template.LoadRangeSlider();
                _Template.LoadDaytimeScheduler();
                _Template.LoadNighttimeScheduler();
            }
            if (currPage.hasAnimation != undefined && currPage.hasAnimation) {
                _Template.LoadAnimateArea();
            }
            var target = _TradeSlider.GetTarget();
            if (currPage.hasTradeSlider != undefined && currPage.hasTradeSlider) {
                _Template.LoadRangeSlider();
                _Template.LoadDaytimeScheduler();
                _Template.LoadNighttimeScheduler();
                _Template.LoadTradeSlider();

                if (currPage.pageId == "l2p3") {
                    _TradeSlider.SetSurviveTarget();
                } else if (currPage.pageId == "l3p3") {
                    _TradeSlider.SetWayOffTarget();
                } else if (currPage.datalevel == 4 && currPage.pageId == "l4p5") {
                    _TradeSlider.SetBetterOffTarget();
                }
                if (currPage.pageId == "l3p2") {
                    if (target.goal != "survive") {
                        $("p.goaldesc").k_hide();
                        $("p.goaldesc[goal='" + target.goal + "']").k_show()
                    }  
                    
                }
            }
            if (currPage.hasActivity != undefined && currPage.hasActivity) {
                if (currPage.IsComplete != undefined && currPage.IsComplete) {
                    $("#" + currPage.goal).attr('checked', 'checked');
                    _TradeSlider.ToggleGoal(currPage.goal);
                    _TradeSlider.UpdateTarget(currPage.goal)
                    $("p.goaldesc[goal='" + currPage.goal + "']").k_show();
                    $("input.goalRadio").k_disable();
                }
            }

            this.SetPageAccesibility();
        },
        //RA-6Sep18 - Function to set graph labels - start
        SetPageAccesibility:function(){
            //debugger;
            var _currentPage = _Navigator.GetCurrentPage();
            var _currPageId = _currentPage.pageId;
            var _currPageQId = '';
            if (_currentPage.questions.length > 0) {
                _currPageQId = _Question.GetCurrentQuestion().Id;
                //for (var n21 = 0; n21 < _currentPage.questions.length; n21++) {
                    //if (_currentPage.questions[n21].isCurrent) {
                        //_currPageQId = _currentPage.questions[n21].Id;
                    //}
                //}
            }
            
            if (_currentPage.isLevelStart == undefined) {
                if ($(".assistive-text").length == 0) {
                    if (isAndroid) {
                        $("main[role='main']").append('<span id="assist-txt" aria-live="assertive" class="assistive-text"></span>');
                    } else {
                        $("main[role='main']").append('<span id="assist-txt" aria-live="assertive" class="assistive-text"></span>');
                    }
                }
            }

            if (isIOS) {
                $("#ppfchart_c").attr({
                    "role": "text",
                    "aria-label": "Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Refer table for more details."
                });
                $("#surpluschart_c").attr({
                    "role": "text",
                    "aria-label": "Surplus Inventory graph for inventory of fish and woods from day 0 to 4."
                });

                if (_currPageId == "l1p2" && _currPageQId == "Q3") {
                    $("#questionchart").attr({
                        "role": "text",
                        "aria-label": "Your Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Refer above table for more details."
                    });
                }
                if (_currPageId == "l1p4" &&  (_currPageQId == "Q3" ||  _currPageQId == "Q7")) {
                    $("#questionIntro").attr({
                        "role": "text", 
                        "aria-label": "Friday's Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 6500 in calories. Refer above table for more details."
                    });
                }
                if (_currPageId == "l2p2" && (_currPageQId == "Q9" || _currPageQId == "Q10" || _currPageQId == "Q11" || _currPageQId == "Q12" || _currPageQId == "Q13" || _currPageQId == "Q14")) {
                    $("#questionIntro").attr({
                        "role": "text",
                        "aria-label": "Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 7000 in calories. Graph represents your PPF, Friday's PPF and Both Student and Friday's Production Point."
                    });
                }
                if (_currPageId == "l2p3" && _currPageQId == "Q15") {                    
                    $("#studenttradeGraph").attr({
                        "role": "text",
                        "aria-label": "Your Production Possibility graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 5000 in calories."
                    });
                    $("#fridaytradeGraph").attr({
                        "role": "text",
                        "aria-label": "Friday's Production Possibility Frontier graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 8000 in calories."
                    });
                }
                if (_currPageId == "l3p2" && _currPageQId == "Q16") {                    
                    $("#studenttradeGraph").attr({
                        "role": "text",
                        "aria-label": "Your Production Possibility graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 5000 in calories."
                    });
                    $("#fridaytradeGraph").attr({
                        "role": "text",
                        "aria-label": "Friday's Production Possibility Frontier graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 8000 in calories."
                    });
                }
                if (_currPageId == "l3p3" && _currPageQId == "Q17") {                    
                    $("#studenttradeGraph").attr({
                        "role": "text",
                        "aria-label": "Your Production Possibility graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 5000 in calories."
                    });
                    $("#fridaytradeGraph").attr({
                        "role": "text",
                        "aria-label": "Friday's Production Possibility Frontier graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 8000 in calories."
                    });
                }
                if (_currPageId == "l4p2" && _currPageQId == "Q18") {
                    $("#questionchart").attr({
                        "role": "text",
                        "aria-label": "Your Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 6500 in calories. Refer above table for more details."
                    });
                }
                if (_currPageId == "l4p3" && _currPageQId == "Q19") {
                    $("#questionchart").attr({
                        "role": "text",
                        "aria-label": "Your Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 4500 in calories. Refer above table for more details."
                    });
                }
                if (_currPageId == "l4p4" && (_currPageQId == "Q20" || _currPageQId == "Q21")) {
                    $("#questionIntro").attr({
                        "role":"text",
                        "aria-label": "Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 7000 in calories. Graph represents your PPF, Friday's PPF."
                    });
                }
                if (_currPageId == "l4p5" && _currPageQId == "Q22") {                    
                    $("#studenttradeGraph").attr({
                        "role":"text",
                        "aria-label": "Your Production Possibility graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 8000 in calories."
                    });
                    $("#fridaytradeGraph").attr({
                        "role":"text",
                        "aria-label": "Friday's Production Possibility Frontier graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 5000 in calories."
                    });
                }

            } else {
                $("#ppfchart_c").find(".highcharts-container").attr("aria-hidden", "true");
                $("#ppfchart_c").attr({
                    "aria-label": "Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Refer table for more details."
                });
                $("#surpluschart_c").find(".highcharts-container").attr("aria-hidden", "true");
                $("#surpluschart_c").attr({
                    "aria-label": "Surplus Inventory graph for inventory of fish and woods from day 0 to 4."
                });

                if (_currPageId == "l1p2" && _currPageQId == "Q3") {
                    $("#questionchart").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#questionchart").attr({
                        "aria-label": "Your Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 3500 in calories. Refer above table for more details."
                    });
                }
                if (_currPageId == "l1p4" &&  (_currPageQId == "Q3" ||  _currPageQId == "Q7")) {
                    $("#questionIntro").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#questionIntro").attr({
                        "aria-label": "Friday's Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 6500 in calories. Refer above table for more details."
                    });
                    
                }
                if (_currPageId == "l2p2" && (_currPageQId == "Q9" || _currPageQId == "Q10" || _currPageQId == "Q11" || _currPageQId == "Q12" || _currPageQId == "Q13" || _currPageQId == "Q14")) {
                    $("#questionIntro").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#questionIntro").attr({
                        "aria-label": "Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 7000 in calories. Graph represents your PPF, Friday's PPF and Both Student and Friday's Production Point."
                    });
                }
                debugger;
                if (_currPageId == "l2p3" && _currPageQId == "Q15") {  
                    $("#studenttradeGraph").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#studenttradeGraph").attr({
                        "aria-label": "Your Production Possibility graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 5000 in calories."
                    });
                    $("#fridaytradeGraph").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#fridaytradeGraph").attr({
                        "aria-label": "Friday's Production Possibility Frontier graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 8000 in calories."
                    });
                }
                if (_currPageId == "l3p2" && _currPageQId == "Q16") {  
                    $("#studenttradeGraph").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#studenttradeGraph").attr({
                        "aria-label": "Your Production Possibility graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 5000 in calories."
                    });
                    $("#fridaytradeGraph").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#fridaytradeGraph").attr({
                        "aria-label": "Friday's Production Possibility Frontier graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 8000 in calories."
                    });
                }
                if (_currPageId == "l3p3" && _currPageQId == "Q17") {  
                    $("#studenttradeGraph").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#studenttradeGraph").attr({
                        "aria-label": "Your Production Possibility graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 5000 in calories."
                    });
                    $("#fridaytradeGraph").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#fridaytradeGraph").attr({
                        "aria-label": "Friday's Production Possibility Frontier graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 8000 in calories."
                    });
                }
                if (_currPageId == "l4p2" && _currPageQId == "Q18") {
                    $("#questionchart").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#questionchart").attr({
                        "aria-label": "Your Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 6500 in calories. Refer above table for more details."
                    });
                }
                if (_currPageId == "l4p3" && _currPageQId == "Q19") {
                    $("#questionchart").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#questionchart").attr({
                        "aria-label": "Your Production Possibility Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 4500 in calories. Refer above table for more details."
                    });
                }
                if (_currPageId == "l4p4" && (_currPageQId == "Q20" || _currPageQId == "Q21")) {
                    $("#questionIntro").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#questionIntro").attr({
                        "aria-label": "Production Possibilities Frontier graph for Firewoods from 0 to 120 in logs vs. Fish from 0 to 7000 in calories. Graph represents your PPF, Friday's PPF."
                    });
                }
                if (_currPageId == "l4p5" && _currPageQId == "Q22") {  
                    $("#studenttradeGraph").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#studenttradeGraph").attr({
                        "aria-label": "Your Production Possibility graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 8000 in calories."
                    });
                    $("#fridaytradeGraph").find(".highcharts-container").attr("aria-hidden", "true");
                    $("#fridaytradeGraph").attr({
                        "aria-label": "Friday's Production Possibility Frontier graph for Firewoods from 0 to 110 in logs vs. Fish from 0 to 5000 in calories."
                    });
                }    
                /*Temp issue */ 
                if(_currPageId == "l2p1" || _currPageId == "l3p1" || _currPageId == "l4p1"){
                    /*$(document).on("load", "#img-stranded-island", function (event) {    
                        $("#img-stranded-island").attr("alt","Friday rafts over to your island proposing that you could be better off through trade.");
                    });
                    */
                    setTimeout(function(){
                        $("#img-stranded-island").attr("alt","Friday rafts over to your island proposing that you could be better off through trade.");
                    }, 1000)
                }
            }
        }        
    };
})();