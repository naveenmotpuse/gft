var DataStorage = DataStorage || function (ui) {
    var _DataMap = {
        woodcollectingHr: 0,
        fishcollectingHr: 0,
        _fishCals: 0,
        _woodsLbs: 0,
        day: 1,
        remFish: 0,
        remWood: 0,
        tradeData: {}
    };

    var _RetryDataCollection = [];
    var _DataCollection = [];
    var timeSpent = '';
    return {
        ModuleRetry: function () {
            _RetryDataCollection = $.extend(true, [], _DataCollection)
            _DataCollection = [];
        },
        ResetDataMap: function (jsonObj) {
            _DataMap = $(true, {}, _DataMap, jsonObj);
        },
        retry: function () {
            var pageid = _Navigator.GetCurrentPage().pageId;
            var i = _DataCollection.length
            while (i--) {
                if (_DataCollection[i].pageId == pageid) {
                    _DataCollection.splice(i, 1);
                }
            }
        },
        retryDay: function () {
            var pageid = _Navigator.GetCurrentPage().pageId;
            var i = _DataCollection.length
            while (i--) {
                if (_DataCollection[i].pageId == pageid && _DataCollection[i].day == _DataMap.day) {
                    _DataCollection.splice(i, 1);
                }
            }
        },
        getCurrentDay: function () {
            return _DataMap.day;
        },
        setWoodSliderVal: function (hrs) {
            //debugger;
            var currPage = _Navigator.GetCurrentPage();
            if (currPage.isFriday) {
                _DataMap._woodsLbs = Number(hrs) * AnimConfig.fridayWoodPerHr;
            } else {
                _DataMap._woodsLbs = Number(hrs) * AnimConfig.woodPerHr;
            }
            _DataMap.woodcollectingHr = hrs;
        },
        getWoodSliderVal: function () {
            return _DataMap.woodcollectingHr;
        },
        setFishSliderVal: function (hrs) {
            var currPage = _Navigator.GetCurrentPage();
            if (currPage.isFriday) {
                _DataMap._fishCals = Number(hrs) * AnimConfig.fridayFishPerHr;
            } else {
                _DataMap._fishCals = Number(hrs) * AnimConfig.fishPerHr;
            }
            _DataMap.fishcollectingHr = hrs;
        },
        getFishSliderVal: function () {
            return _DataMap.fishcollectingHr;
        },
        getSliderValue: function () {
            return {
                "wood": _DataMap.woodcollectingHr,
                "fish": _DataMap.fishcollectingHr
            }
        },
        getPotData: function () {
            return {
                "wood": _DataMap._woodsLbs + _DataMap.remWood,
                "fish": _DataMap._fishCals + _DataMap.remFish
            };
        },
        getProducedData: function () {
            return {
                "wood": _DataMap._woodsLbs,
                "fish": _DataMap._fishCals
            };
        },
        SetRemainingData: function (remdata) {
            _DataMap.remWood = remdata.wood;
            _DataMap.remFish = remdata.fish;
        },
        getRemainingPotData: function () {
            return {
                "wood": _DataMap.remWood,
                "fish": _DataMap.remFish
            }
        },
        getLastDayPotData: function () {
            return {
                "wood": _DataMap.remWood,
                "fish": _DataMap.remFish
            };
        },
        getAnim_Dur: function (type) {
            if (type === "fish") {
                return _DataMap.fishcollectingHr * AnimConfig.duration;
            } else if (type === "wood") {
                return _DataMap.woodcollectingHr * AnimConfig.duration;
            }
            return {
                "wood": _DataMap.woodcollectingHr * AnimConfig.duration,
                "fish": _DataMap.fishcollectingHr * AnimConfig.duration
            };
        },
        updateDay: function () {
            _DataMap.day += 1;
        },
        updateCollection: function (isComplete) {
            var copy = $.extend({}, _DataMap);
            copy.pageId = _Navigator.GetCurrentPage().pageId;
            copy.isComplete = true;
            _DataCollection.push(copy);
        },
        getCollection: function () {
            return _DataCollection;
        },
        SetTradeData: function () {
            _DataMap.tradeData.TS = $.extend(true, {}, _TradeSlider.GetTradeSettings());
            _DataMap.tradeData.TR = $.extend(true, {}, _TradeSlider.GetTradeResult());
        }
    }
}();

var _Slider = (function () {
    var ep_slider;
    return {
        StartScheduler: function () {
            $(".runtimeslider").show();
            $(".selecttimeslider").hide();
            $(".startbtnpanel").hide();
            var potDataAsperSlider = DataStorage.getPotData();
            var calculatedData = {
                "wood": potDataAsperSlider.wood,
                "fish": potDataAsperSlider.fish
            };
            if (AnimConfig.AnimType == "default") {
                _Animation.collectWoodnfish(DataStorage.getAnim_Dur().wood, DataStorage.getAnim_Dur().fish, calculatedData, "");
            }
            _Slider.sliderSchedule();
        },
        UpdateSliderFromInput: function (slidertype, woodhrs, fishhrs) {
            if (slidertype == "wood") {} else {}
            $("#w_val").text(woodhrs);
            $("#f_val").text(fishhrs);
            $("#collect-wood .wood-slider").val(woodhrs);
            $("#collect-fish .fish-slider").val(fishhrs);
            $(".colorful-slider1").css("width", (fishhrs * 10) + "%");
            $(".animate-slider1").css("width", (fishhrs * 10) + "%");
            $(".colorful-slider2").css("width", (woodhrs * 10) + "%");
            $(".animate-slider2").css("width", (woodhrs * 10) + "%");
        },
        compare: function (currentSlider) {
            var currPage = _Navigator.GetCurrentPage();
            var workingSlider = $("#collect-wood .wood-slider");
            var val1 = DataStorage.getWoodSliderVal();
            var val2 = DataStorage.getFishSliderVal();
            //console.log("wood:" + val1 + ", fish:" + val2);
            if (currentSlider != undefined && currentSlider != null) {
                workingSlider = currentSlider;
            } else {
                if (val1 > val2)
                    workingSlider = $("#collect-fish .fish-slider")
            }
            var current_slider_val = Number(workingSlider.val());
            var slidermax_val = AnimConfig.dayTime - AnimConfig.toolTime;
            var total = val1 + val2;
            if (total > slidermax_val) {
                if (workingSlider.hasClass("wood-slider")) {
                    val2 = slidermax_val - current_slider_val;
                    if (val2 < 0) {
                        val2 = 0;
                        val1 = slidermax_val;
                    };
                    $("#collect-fish .fish-slider").val(val2);
                    $(".colorful-slider1").css("width", (val2 * (100 / AnimConfig.dayTime)) + "%");
                    $(".animate-slider1").css("width", (val2 * (100 / AnimConfig.dayTime)) + "%");

                    $("#f_val").text(val2);
                } else {
                    val1 = slidermax_val - current_slider_val;
                    if (val1 < 0) {
                        val1 = 0;
                        val2 = slidermax_val;
                    }
                    $("#collect-wood .wood-slider").val(val1);
                    $(".colorful-slider2").css("width", (val1 * (100 / AnimConfig.dayTime)) + "%");
                    $(".animate-slider2").css("width", (val1 * (100 / AnimConfig.dayTime)) + "%");
                    $("#w_val").text(val1);
                }
                DataStorage.setFishSliderVal(Number(val2));
                DataStorage.setWoodSliderVal(Number(val1));
            }

            $(".colorful-slider1").css("width", (val1 * (100 / AnimConfig.dayTime)) + "%");
            $(".animate-slider1").css("width", (val1 * (100 / AnimConfig.dayTime)) + "%");
            $(".colorful-slider2").css("width", (val2 * (100 / AnimConfig.dayTime)) + "%");
            $(".animate-slider2").css("width", (val2 * (100 / AnimConfig.dayTime)) + "%");
            $(".animate-slider3").css("width", (AnimConfig.toolTime * (100 / AnimConfig.dayTime)) + "%");
            $(".colorful-slider3").css("width", (AnimConfig.toolTime * (100 / AnimConfig.dayTime)) + "%");

            var totalhrs = val1 + val2;

            if (currPage.isFriday) {
                _ModuleCharts.ShowSliderPoint([
                    [fridayPPFTable[val1][0], fridayPPFTable[val2][1]]
                ]);
            } else {
                _ModuleCharts.ShowSliderPoint([
                    [userPPFTable[val1][0], userPPFTable[val2][1]]
                ]);
            }
            _Slider.submitValidate();

            if (currPage.hasTradeSlider) {
                _TradeSlider.UpdateTradeSettings();
            }
        },
        sliderSchedule: function () {
            var ep_slider1 = Number($(".animate-slider1").width());
            var ep_slider2 = Number($(".animate-slider2").width());
            ep_slider = Number($("#animation-slider").width() - 14);
            var duration = (AnimConfig.dayTime * AnimConfig.duration);
            $("#slider-arrow-day").animate({
                left: ep_slider + "px"
            }, duration, "linear", function () {
                EventManager.onAnimComplete();
            });
        },
        nightSliderSchedule: function () {
            var duration = (AnimConfig.totalTime - AnimConfig.dayTime) * AnimConfig.duration;
            $("#slider-arrow-night").css("left", "0px");
            $("#slider-arrow-night").animate({
                left: ep_slider + "px"
            }, duration, "linear", function () {
                EventManager.onNightAnimComplete();
            });
        },
        InitSelectTimeSlider: function () {
            $("#wood-range").attr("max", AnimConfig.dayTime);
            $("#fish-range").attr("max", AnimConfig.dayTime);

            $('#collect-wood .wood-slider').on("input", document, function (event) {
                event.preventDefault();
                w_val = $(this).val();
                $('.wood').find('#w_val').text(w_val);
            });

            $('#collect-fish .fish-slider').on("input", document, function (event) {
                event.preventDefault();
                f_val = $(this).val();
                $('.fish').find('#f_val').text(f_val);
            });
            $('#collect-wood .wood-slider').on("change", document, function (event) {
                event.preventDefault();
                var val = $(this).val();
                $('.wood').find('#w_val').text(val);
                DataStorage.setWoodSliderVal(Number(val));
                _Slider.compare($(this));
            });

            $('#collect-fish .fish-slider').on("change", document, function (event) {
                event.preventDefault();
                var val = $(this).val();
                $('.fish').find('#f_val').text(val);
                DataStorage.setFishSliderVal(Number(val));
                _Slider.compare($(this));
            });

            _Slider.submitValidate();
            $(".selecttimeslider .h_right").html(AnimConfig.dayTime + " hr");
        },
        setSlidervalue: function (wood, fish) {
            $("#collect-wood .wood-slider").val(wood);
            $("#collect-fish .fish-slider").val(fish);
        },
        InitTimeScheduler: function () {
            this.InitDayTimeScheduler();
            this.InitNightTimeScheduler();
        },
        setDefaultValue: function () {
            var val1 = Number(DataStorage.getWoodSliderVal());
            var val2 = Number(DataStorage.getFishSliderVal());
            $(".animate-slider1").css("width", (val1 * (100 / AnimConfig.dayTime)) + "%");
            $(".animate-slider2").css("width", (val2 * (100 / AnimConfig.dayTime)) + "%");
            $("#slider-arrow-day").css("left", "8px");
            $("#slider-arrow-night").css("left", "8px");
        },
        setAnimSliderValue: function (val1, val2) {
            $(".animate-slider1").css("width", (val1 * (100 / AnimConfig.dayTime)) + "%");
            $(".animate-slider2").css("width", (val2 * (100 / AnimConfig.dayTime)) + "%");
            $("#slider-arrow-day").css("left", "8px");
            $("#slider-arrow-night").css("left", "8px");
        },
        updateInputValue: function (wood, fish) {
            if ($("#inputwood").length > 0) {
                $("#inputwood").val(wood);
                $("#inputfish").val(fish);
            }
        },
        submitValidate: function () {
            var submitButton = "#btnstartslider";
            var _slidervalue = DataStorage.getSliderValue();
            if (_slidervalue.wood == ValidationProps.wood && _slidervalue.fish === ValidationProps.fish) {
                $(submitButton).k_disable()
            } else {
                $(submitButton).k_enable()
            }
        }
    }
})();

var _TradeSlider = (function () {
    var TradeSettings = {
        yourwoodlogs: 96,
        yourfishcals: 0,
        fridaywoodlogs: 0,
        fridayfishCals: 6000,
        youridlehours: 0
    }
    var TradeResults = {
        onewoodfor: 250,
        givewood: 5,
        receivefish: 1250,
        consumptionwood: (96 - 5),
        consumptionfish: 1250,
        fridayconsumptionfish: (6000 - 1250),
        fridayconsumptionwood: 5,
        remData: {
            wood: 0,
            fish: 0,
            fridaywood: 0,
            fridayfish: 0,
            idlehours:0
        },
    }
    var Target = {
        tool: "shelter",
        goallbs: 90,
        goalcals:2000,
        goalhours:undefined        
    }
    return {
        InitSlider: function () {
            $("#onewoodfor-range").on("input", document, function (event) {
                event.preventDefault();
                var onewoodfor = Number($(this).val());
                TradeResults.onewoodfor = onewoodfor;
                _TradeSlider.SetTradeResult();
            });

            $("#givewood-range").on("input", document, function (event) {
                event.preventDefault();
                var givewood = Number($(this).val());
                TradeResults.givewood = givewood;
                _TradeSlider.SetTradeResult();
            });

            _ModuleCharts.DrawTradeCharts();
            //Complete Reset
            this.Reset();            
        },
        Reset: function(){
            TradeResults = {
                onewoodfor: 250,
                givewood: 5,
                receivefish: 1250,
                consumptionwood: (96 - 5),
                consumptionfish: 1250,
                fridayconsumptionfish: (6000 - 1250),
                fridayconsumptionwood: 5,
                remData: {
                    wood: 0,
                    fish: 0,
                    fridaywood: 0,
                    fridayfish: 0,
                    idlehours:0
                },
            }
            //Default Initialisation of sliders.            
            $("#onewoodfor-range").val(250);
            $("#givewood-range").val(5);
            TradeResults.onewoodfor = 250;
            TradeResults.givewood = 5;
            _TradeSlider.SetTradeResult();
        },
        ResetTradeSlider() {
            $("#onewoodfor-range").val(250);
            $("#givewood-range").val(5);
            TradeResults.onewoodfor = 250;
            TradeResults.givewood = 5;
            _TradeSlider.SetTradeResult();
        },
        UpdateTradeSettings: function () {
            debugger;
            TradeSettings.yourwoodlogs = userPPFTable[Number($("#wood-range").val())][0];
            TradeSettings.yourfishcals = userPPFTable[Number($("#fish-range").val())][1];
            TradeSettings.youridlehours = AnimConfig.dayTime - (Number($("#wood-range").val()) + Number($("#fish-range").val()));
            
            this.SetTradeResult();
        },
        SetTradeResult: function () {
            debugger;
            TradeResults.receivefish = TradeResults.givewood * TradeResults.onewoodfor;
            TradeResults.consumptionwood = (TradeSettings.yourwoodlogs + TradeResults.remData.wood) - TradeResults.givewood;
            TradeResults.consumptionfish = (TradeSettings.yourfishcals + TradeResults.remData.wood) + (TradeResults.givewood * TradeResults.onewoodfor);
            TradeResults.fridayconsumptionwood = (TradeSettings.fridaywoodlogs + TradeResults.remData.fridaywood) + TradeResults.givewood;
            TradeResults.fridayconsumptionfish = (TradeSettings.fridayfishCals + TradeResults.remData.fridayfish) - (TradeResults.givewood * TradeResults.onewoodfor);
            $("#givewood-range").attr("max", (TradeSettings.yourwoodlogs + TradeResults.remData.wood));
            $("#consumption-wood-range").attr("max", (TradeSettings.yourwoodlogs + TradeResults.remData.wood));
            $(".consumption-wood.r_label").text((TradeSettings.yourwoodlogs + TradeResults.remData.wood));
            $(".givewood.r_label").text((TradeSettings.yourwoodlogs + TradeResults.remData.wood));

            $("#consumption-fish-range").attr("max", (TradeSettings.fridayfishCals + TradeResults.remData.fridayfish));
            $(".consumption-fish.r_label").text((TradeSettings.fridayfishCals + TradeResults.remData.fridayfish));
            this.ShowTradeResult()
        },
        GetTradeSettings: function () {
            return TradeSettings;
        },
        GetTradeResult: function () {
            return TradeResults;
        },
        GetTarget: function () {
            return Target;
        },
        SetRemTradeData: function (_remdata) {
            TradeResults.remData.wood = _remdata.wood;
            TradeResults.remData.fish = _remdata.fish;
            TradeResults.remData.fridaywood = _remdata.fridaywood;
            TradeResults.remData.fridayfish = _remdata.fridayfish;
            TradeResults.remData.idlehours += TradeSettings.youridlehours;
        },
        ShowTradeResult: function () {
            $("#onewoodfor-fish").text(TradeResults.onewoodfor);
            $("#givewood-lbs").text(TradeResults.givewood);
            $("#receivefish-cals").text(TradeResults.receivefish);
            $("#consumption-wood").text(TradeResults.consumptionwood);
            $("#consumption-fish").text(TradeResults.consumptionfish);
            $("#consumption-wood-range").val(TradeResults.consumptionwood);
            $("#consumption-fish-range").val(TradeResults.consumptionfish);
            this.ShowSliderPoint("studenttradeGraph",[TradeResults.consumptionwood, TradeResults.consumptionfish]);
            this.ShowSliderPoint("fridaytradeGraph",[TradeResults.fridayconsumptionwood, TradeResults.fridayconsumptionfish]);
        },
        ShowSliderPoint: function (_chartid, point2) {            
            var chart = $('#' + _chartid).highcharts();
            if (chart.get("sliderpointser") != undefined && chart.get("sliderpointser") != null) {
                chart.get("sliderpointser").remove()
            }
            if (chart.get("sliderpointser1") != undefined && chart.get("sliderpointser1") != null) {
                chart.get("sliderpointser1").remove()
            }
            var point1 = userPPF[userPPF.length-1]
            if(_chartid == "fridaytradeGraph")
            {
                point1 = fridayPPF[0];
            }     
             var x1 = point1[0]; 
             var x2 = point1[1]; 
             var y1 = point2[0]; 
             var y2 = point2[1]; 
            // var Len = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))     
            // var dx = (x2-x1) / Len;
            // var dy = (y2-y1) / Len;
            // var x3 = Math.ceil(x1 + 10  dx);
            // var y3 = Math.ceil(y1 + 10  dy);

            var Slope = (y2 - y1) / (x2 - x1)
            var Intercept = (x2) - (Slope * x1)
            var z1 = 0 ;
            var z2 = Slope * z1 + Intercept;
            var point3=[z1,z2];
            var _data = [point1,point2];            
            if (_data != undefined) {
                chart.addSeries({
                    id: "sliderpointser1",
                    name: "sliderpointser1",
                    data: [point1,point2],
                    type: 'spline', 
                    dashStyle:"Longdash",
                    lineWidth: 1,
                    color: ColorCodes.sliderPoint, 
                    showInLegend: false,
                    marker: {
                        fillOpacity: 0,
                        lineWidth: 0,
                        lineColor: ColorCodes.sliderPoint,
                        radius: 0,
                        symbol: "circle"
                    },                    
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                });
                chart.addSeries({
                    id: "sliderpointser",
                    name: "sliderpointser",
                    data: [point2],
                    type: 'spline',                    
                    lineWidth: 1,
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
        UpdateTarget: function (_goal) {
            pageobj = _Navigator.GetCurrentPage();
            pageobj.isAnswered = true;            
            if (_goal == "shelter") {
                Target.goal = _goal;
                Target.goallbs = 90;
                Target.goalcals = 2000;                
            } else if (_goal == "feast") {
                Target.goal = _goal;
                Target.goallbs = 90;
                Target.goalcals = 5000;                 
            } else if (_goal == "book") {
                Target.goal = _goal;
                Target.goallbs = 90;
                Target.goalcals = 2000;  
                Target.goalhours = 10;                
            }
            $("#linknext").k_enable();
        },
        SetWayOffTarget: function(){
            Target.goal = "wayoff";
            Target.goallbs = 64;
            Target.goalcals = 4000;  
            Target.fridaygoallbs = 32;  
            Target.fridaygoalcals = 2000;
        },
        SetBetterOffTarget: function(){
            Target.goal = "betteroff";
            if(_Scenario.getScenarioIndex()==0){
                Target.goallbs = 32;
                Target.goalcals = 2000;  
                Target.fridaygoallbs = 40;  
                Target.fridaygoalcals = 450;
            }
            else{
                Target.goallbs = 32;
                Target.goalcals = 2000;  
                Target.fridaygoallbs = 7;  
                Target.fridaygoalcals = 3500;
            }
        },
        IsTargetComplete() {
            var retobj ={}
            var returnVal = false;            
            if(TradeResults.remData.wood == Target.goallbs
            && TradeResults.remData.fish == Target.goalcals) {
                if(Target.goal == "book"){
                    if(TradeResults.remData.idlehours == Target.goalhours){
                        returnVal=true;
                    }
                }
                else if(Target.goal == "wayoff" || Target.goal == "betteroff" ){
                    if(TradeResults.remData.fridaywood == Target.fridaygoallbs
                    && TradeResults.remData.fridayfish == Target.fridaygoalcals){
                        returnVal = true;
                    }
                }                
                else{
                    returnVal = true;
                }
            }
            return returnVal;
        }
    }
})();