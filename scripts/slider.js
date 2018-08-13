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
        ResetDataMap: function(jsonObj){
            _DataMap = $(true,{},_DataMap,jsonObj);
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
        retryDay: function(){
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
            if (AnimConfig.isFriday) {
                _DataMap._woodsLbs = Number(hrs) * AnimConfig.fridayWoodPerHr;
                _DataMap.isFriday = true;
            } else {
                _DataMap._woodsLbs = Number(hrs) * AnimConfig.woodPerHr;
                _DataMap.isFriday = false;
            }
            _DataMap.woodcollectingHr = hrs;
        },
        getWoodSliderVal: function () {
            return _DataMap.woodcollectingHr;
        },
        setFishSliderVal: function (hrs) {
            if (AnimConfig.isFriday) {
                _DataMap._fishCals = Number(hrs) * AnimConfig.fridayFishPerHr;
                _DataMap.isFriday = true;
            } else {
                _DataMap._fishCals = Number(hrs) * AnimConfig.fishPerHr;
                _DataMap.isFriday = false;
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
            if (remdata.fridaywood != undefined) {
                _DataMap.fridayRemWood = remdata.fridaywood;
                _DataMap.fridayRemFish = remdata.fridayfish;
            }
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
            copy.isComplete = isComplete;
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
        onAnimComplete: function () {
            var pageobj = _Navigator.GetCurrentPage();
            var fish = DataStorage.getPotData().fish;
            var wood = DataStorage.getPotData().wood;
            if (fish < 0) {
                fish = 0;
            }
            if (wood < 0) {
                wood = 0;
            }
            Table.setfish(DataStorage.getProducedData().fish, fish);
            Table.setWood(DataStorage.getProducedData().wood, wood);
            DataStorage.updateCollection();
            if (pageobj.hasTradeSlider != undefined && pageobj.hasTradeSlider) {
                $('.startbtnpanel').hide();
                $('.castawaySprites1, .fridaycastawaySprites').show();
                _Animation.LadyComeWithFish();
                setTimeout(function () {
                    $("p#firstpara").hide();
                    $("p#secondpara").show();
                    $(".trade_slider_wrapper").show()
                    _ModuleCharts.DrawTradeCharts();
                    $(".questionband").show();
                    $(".questionband").removeClass("displaynone");
                    $('.castawaySprites').removeClass('castawaySprites').addClass('castawaySprites1');
                    $('body').animate({
                        scrollTop: 0
                    }, 1000);
                }, 2500)
            } else {
                $('.startbtnpanel').hide();
                $(".questionband").show();
                $(".questionband .tableInventory").show();
                $('body').animate({
                    scrollTop: document.body.scrollHeight
                }, 1000);

                $('.castawaySprites1, .fridaycastawaySprites').show();
                $(".questionband").removeClass("displaynone");
                setTimeout(function (){
                    $('.castawaySprites').removeClass('castawaySprites').addClass('castawaySprites1');
                },2500);
            }
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
            if (AnimConfig.isFriday) {
                _ModuleCharts.ShowSliderPoint([
                    [fridayPPFTable[val1][0], fridayPPFTable[val2][1]]
                ]);
            } else {
                _ModuleCharts.ShowSliderPoint([
                    [userPPFTable[val1][0], userPPFTable[val2][1]]
                ]);
            }            
            _Slider.submitValidate();            
        },
        sliderSchedule: function () {
            var ep_slider1 = Number($(".animate-slider1").width());
            var ep_slider2 = Number($(".animate-slider2").width());
            ep_slider = Number($("#animation-slider").width() - 14);
            var duration = (AnimConfig.dayTime * AnimConfig.duration);
            $("#slider-arrow-day").animate({
                left: ep_slider + "px"
            }, duration, "linear", function () {
                _Slider.onAnimComplete();
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
        onewoodfor: 250,
        givewood: 5
    }
    var TradeResults = {
        receivefish: 1250,
        consumptionwood: (96 - 5),
        consumptionfish: 1250,
        fridayconsumtionfish: (6000 - 1250),
        fridayconsumptionwood: 5
    }
    var ToolDetails = {
        tool: "shelter",
        goal: 90,
        unit: "logs"
    }
    return {
        InitSlider: function () {
            $("#onewoodfor-range").on("input", document, function (event) {
                event.preventDefault();
                var onewoodfor = Number($(this).val());
                TradeSettings.onewoodfor = onewoodfor;
                _TradeSlider.SetTradeResult();
            });

            $("#givewood-range").on("input", document, function (event) {
                event.preventDefault();
                var givewood = Number($(this).val());
                TradeSettings.givewood = givewood;
                _TradeSlider.SetTradeResult();
            });
        },
        SetTradeResult: function () {
            TradeResults.receivefish = TradeSettings.givewood * TradeSettings.onewoodfor;
            TradeResults.consumptionwood = TradeSettings.yourwoodlogs - TradeSettings.givewood;
            TradeResults.consumptionfish = TradeSettings.yourfishcals + (TradeSettings.givewood * TradeSettings.onewoodfor);
            TradeResults.fridayconsumptionwood = TradeSettings.fridaywoodlogs + TradeSettings.givewood;
            TradeResults.fridayconsumtionfish = TradeSettings.fridayfishCals - (TradeSettings.givewood * TradeSettings.onewoodfor);
            this.ShowTradeResult()
        },
        GetTradeSettings: function () {
            return TradeSettings;
        },
        GetTradeResult: function () {
            return TradeResults;
        },
        GetToolDetails: function(){
            return ToolDetails;
        },
        ShowTradeResult: function () {
            $("#onewoodfor-fish").text(TradeSettings.onewoodfor);
            $("#givewood-lbs").text(TradeSettings.givewood);
            $("#receivefish-cals").text(TradeResults.receivefish);
            $("#consumption-wood").text(TradeResults.consumptionwood);
            $("#consumption-fish").text(TradeResults.consumptionfish);
            $("#consumption-wood-range").val(TradeResults.consumptionwood);
            $("#consumption-fish-range").val(TradeResults.consumptionfish);            
            this.ShowSliderPoint("studenttradeGraph",[[TradeResults.consumptionwood,TradeResults.consumptionfish]]);  
            this.ShowSliderPoint("fridaytradeGraph",[[TradeResults.fridayconsumptionwood,TradeResults.fridayconsumtionfish]]); 
           
        },
        ShowSliderPoint: function (chartid, data) {
            var chart = $('#' + _chartid).highcharts();
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
        UpdateToolProps: function (toolval) {
            pageobj = _Navigator.GetCurrentPage();
            pageobj.isAnswered = true;
            //ToolDetails ={}
            if (toolval == "shelter") {
                ToolDetails.tool = toolval;
                ToolDetails.goal = 90;
                ToolDetails.unit = "logs";
            } else if (toolval == "feast") {
                ToolDetails.tool = toolval;
                ToolDetails.goal = 5000;
                ToolDetails.unit = "cals";
            } else if (toolval == "book") {
                ToolDetails.tool = toolval;
                ToolDetails.goal = 10;
                ToolDetails.unit = "hrs";
            }                       
            $("#linknext").k_enable();
        }
    }
})();