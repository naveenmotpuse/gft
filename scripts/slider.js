var ValidationProps = {
    wood: 0,
    fish: 0
}

var AnimConfig = {
    duration: 400,
    totalTime: 24,
    dayTime: 12,
    die: false,
    nightWoodValueDeduction: 32,
    nightFishValueDeduction: 2000,
    AnimType: "default", 
    toolTime: 0,
    woodPerHr: 8,
    fishPerHr: 250,
    isFriday:false,
    fridayWoodPerHr: 4,
    fridayFishPerHr: 500
}
var DataStorage = DataStorage || function (ui) {
    var _DataMap = {
        woodcollectingHr: 0,
        fishcollectingHr: 0,
        _fishCals: 0,
        _woodsLbs: 0,
        day: 1,
        remainingCals: 0,
        remainingLbs: 0
    };

    LevelData = {
        "Level0": {
            wood: 0,
            fish: 0,
            carry: false
        },
        "Level1": {
            wood: 0,
            fish: 0,
            carry: true
        },
        "Level2": {
            wood: 0,
            fish: 0,
            carry: true
        },
        "Level3": {
            wood: 0,
            fish: 0,
            carry: true
        }
    }

    var _DataCollections = [{ pageid: 5, _woodsLbs: 27, _fishCals: 4900, woodcollectingHr: 3, fishcollectingHr: 7 },
    { pageid: 7, _woodsLbs: 49, _fishCals: 2700, woodcollectingHr: 7, fishcollectingHr: 3 },
    { pageid: 9, _woodsLbs: 40, _fishCals: 4000, woodcollectingHr: 5, fishcollectingHr: 5 }];

    var _RetryDataCollection = [];
    var _DataCollection = [];
    var timeSpent = '';
    return {
        ModuleRetry: function () {
            _DataMap = { woodcollectingHr: 0, fishcollectingHr: 0, _fishCals: 0, _woodsLbs: 0, day: 1, remainingCals: 0, remainingLbs: 0 };
            LevelData = {
                "Level0": { wood: 0, fish: 0, carry: false },
                "Level1": { wood: 0, fish: 0, carry: true },
                "Level2": { wood: 0, fish: 0, carry: true },
                "Level3": { wood: 0, fish: 0, carry: true }
            }
            _RetryDataCollection = $.extend(true, [], _DataCollection)
            _DataCollection = [];            
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
        getCurrentDay: function () {
            return _DataMap.day;
        },
        setWoodSliderVal: function (hrs) {  
            if(AnimConfig.isFriday){
                _DataMap._woodsLbs = Number(hrs) * AnimConfig.fridayWoodPerHr;
                _DataMap.isFriday = true;                
            }   
            else{
                _DataMap._woodsLbs = Number(hrs) * AnimConfig.woodPerHr;
                _DataMap.isFriday = false;
            }            
            _DataMap.woodcollectingHr = hrs;
        },
        getWoodSliderVal: function () {
            return _DataMap.woodcollectingHr;
        },
        setFishSliderVal: function (hrs) {
            if(AnimConfig.isFriday){
                _DataMap._fishCals = Number(hrs) * AnimConfig.fridayFishPerHr;
                _DataMap.isFriday = true;
            }   
            else{
                _DataMap._fishCals = Number(hrs) * AnimConfig.fishPerHr;
                _DataMap.isFriday = false;
            }    
            _DataMap.fishcollectingHr = hrs;
        },
        getFishSliderVal: function () {
            return _DataMap.fishcollectingHr;
        },
        getSliderValue: function () {
            return { "wood": _DataMap.woodcollectingHr, "fish": _DataMap.fishcollectingHr }
        },
        getPotData: function () {
            return { "wood": _DataMap._woodsLbs + _DataMap.remainingLbs, "fish": _DataMap._fishCals + _DataMap.remainingCals };
        },
        getProducedData: function () {
            return { "wood": _DataMap._woodsLbs, "fish": _DataMap._fishCals };
        },
        setWoodRemaining: function (wood) {

            _DataMap.remainingLbs = wood;
        },
        setFishRemaining: function (fish) {

            _DataMap.remainingCals = fish;
        },
        getRemainingPotData: function () {
            return { "wood": _DataMap.remainingLbs, "fish": _DataMap.remainingCals }
        },
        getLastDayPotData: function () {
            return { "wood": _DataMap.remainingLbs, "fish": _DataMap.remainingCals };
        },
        getAnim_Dur: function (type) {
            if (type === "fish") {
                return _DataMap.fishcollectingHr * AnimConfig.duration;
            } else if (type === "wood") {
                return _DataMap.woodcollectingHr * AnimConfig.duration;
            }
            return { "wood": _DataMap.woodcollectingHr * AnimConfig.duration, "fish": _DataMap.fishcollectingHr * AnimConfig.duration };
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
        getCollection: function(){
            return _DataCollection;
        }
    }
}();

var _Slider = (function () {
    var ep_slider;
    return {
      
        StartScheduler: function () {
            debugger;
            $(".runtimeslider").show();
            $(".selecttimeslider").hide();
            $(".startbtnpanel").hide();

            //var potDataAsperSlider = DataStorage.getSliderValue();
            var potDataAsperSlider = DataStorage.getPotData();
            var calculatedData = { "wood": potDataAsperSlider.wood, "fish": potDataAsperSlider.fish };
            //var calculatedData = { "wood": 5, "fish": 5};
            if (AnimConfig.AnimType == "default") {
                  _Animation.collectWoodnfish(DataStorage.getAnim_Dur().wood, DataStorage.getAnim_Dur().fish, calculatedData, "");
            }
            // End  
            _Slider.sliderSchedule();

        },
        onAnimComplete: function () {
            debugger;
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
            $(".questionband").show();
            $(".questionband .tableInventory").show();
            $('.castawaySprites1, .fridaycastawaySprites').show();
            $(".questionband").removeClass("displaynone");
            $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000);
        },
        Reset: function () {
            DataStorage.setWoodSliderVal(0);
            DataStorage.setFishSliderVal(0);
        },

        UpdateSliderFromInput: function (slidertype, woodhrs, fishhrs) {
            debugger;
            if (slidertype == "wood") { } else { }
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
            // debugger;
            var workingSlider = $("#collect-wood .wood-slider");
            var val1 = DataStorage.getWoodSliderVal();
            var val2 = DataStorage.getFishSliderVal();
            console.log("wood:" + val1 + ", fish:" + val2);
            if (currentSlider != undefined && currentSlider != null) {
                workingSlider = currentSlider;
            }
            else {
                if (val1 > val2)
                    workingSlider = $("#collect-fish .fish-slider")
            }
            var current_slider_val = Number(workingSlider.val());
            var slidermax_val = AnimConfig.dayTime - AnimConfig.toolTime;
            var total = val1 + val2;
            if (total > slidermax_val) {
                if (workingSlider.hasClass("wood-slider")) {
                    val2 = slidermax_val - current_slider_val;
                    if (val2 < 0) { val2 = 0; val1 = slidermax_val; };
                    $("#collect-fish .fish-slider").val(val2);
                    $(".colorful-slider1").css("width", (val2 * (100 / AnimConfig.dayTime)) + "%");
                    $(".animate-slider1").css("width", (val2 * (100 / AnimConfig.dayTime)) + "%");

                    $("#f_val").text(val2);
                } else {
                    val1 = slidermax_val - current_slider_val;
                    if (val1 < 0) { val1 = 0; val2 = slidermax_val; }
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
            if ($("#inputtotalhrs").length > 0) {
                $("#inputtotalhrs").val(totalhrs);
            }
            _Slider.submitValidate();
            var _slidervalue = DataStorage.getSliderValue();
            _Slider.updateInputValue(_slidervalue.wood, _slidervalue.fish);

        },
        sliderSchedule: function () {
            var ep_slider1 = Number($(".animate-slider1").width());
            var ep_slider2 = Number($(".animate-slider2").width());
            ep_slider = Number($("#animation-slider").width() - 14);
            var duration = (AnimConfig.dayTime * AnimConfig.duration);
            $("#slider-arrow-day").animate({ left: ep_slider + "px" }, duration, "linear", function () {
                _Slider.onAnimComplete();
            });
        },
        nightSliderSchedule: function () {
            debugger;
            var duration = (AnimConfig.totalTime - AnimConfig.dayTime) * AnimConfig.duration;            
            $("#slider-arrow-night").css("left", "0px");
            $("#slider-arrow-night").animate({ left: ep_slider + "px" }, duration, "linear", function () {
                if (!AnimConfig.die) {
                    EventManager.onNightAnimComplete();
                }
            });            
        },
        InitSelectTimeSlider: function () {
            //  debugger;

            $(".selecttimeslider").removeAttr("tabindex");
            $(".selecttimeslider").removeAttr("role");
            $("#wood-range").attr("max", AnimConfig.dayTime);
            $("#fish-range").attr("max", AnimConfig.dayTime);

            $('#collect-wood .wood-slider').on("input", document, function (e) {
                // debugger;
                e.preventDefault();
                w_val = $(this).val();
                $('.wood').find('#w_val').text(w_val);
            });

            $('#collect-fish .fish-slider').on("input", document, function (e) {
                //  debugger;
                e.preventDefault();
                f_val = $(this).val();
                $('.fish').find('#f_val').text(f_val);
            });
            $('#collect-wood .wood-slider').on("change", document, function (e) {
                //  debugger;
                e.preventDefault();
                var val = $(this).val();
                $('.wood').find('#w_val').text(val);
                DataStorage.setWoodSliderVal(Number(val));
                _Slider.compare($(this));
            });

            $('#collect-fish .fish-slider').on("change", document, function (e) {
                //  debugger;
                e.preventDefault();
                var val = $(this).val();
                $('.fish').find('#f_val').text(val);
                DataStorage.setFishSliderVal(Number(val));
                _Slider.compare($(this));
            });

            _Slider.submitValidate();
            $(".selecttimeslider .k-element-text .h_right").html(AnimConfig.dayTime + " hr");
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
            debugger;
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

$(document).on("click", "#btnstartslider", function (event) {
    debugger;
    $(".questionband").hide();
    $('.castawaySprites1, .fridaycastawaySprites').hide();
    _Slider.setDefaultValue();
    _Slider.StartScheduler();
});