// var round = function (val) {
//     if (!Number.isNaN(val) && Math.round(val) !== val) {
//         val = Number(val.toFixed(0));
//     } else {
//         // if value is invalid then set to 0 by default
//         val = 0;
//     }
//     return val;
// }
var round = function (val) {
    if (Math.round(val) !== val) {
        val = Number(val.toFixed(0));
    }
    return val;
}

var AnimationPlace = "#img-stranded-island";
var _Animation = (function () {
    var getDiv = function () {
        return "<div></div>";
    }
    var getImage = function () {
        return new Image();
    };

    var _delay = function (_ele, _dur, callback) {
        $(_ele).k_show().delay(_dur).queue(function (nxt) {
            $(this).dequeue();
            callback();
        });
    }
    var _staticImages = function () {
        var div = getDiv();
        //var _potData = DataStorage.getPotData()
        var _potData = DataStorage.getLastDayPotData()
        var _stickpot = $(div).addClass("stickBarrelRaft");
        var _stickpottext = $(div).attr('aria-live', 'polite').addClass("woodcounter OpenSansFont12px").append("Wood : <span class='count'>" + round(_potData.wood) + "</span> logs");
        var _fishpot = $(div).addClass("fishBarrelRaft");
        var _fishpottext = $(div).attr('aria-live', 'polite').addClass("fishcounter OpenSansFont12px").append("Fish : <span class='count'>" + round(_potData.fish) + "</span> cals");
        var _sticksbrush = $(div).addClass("brush");
        var _firepot = $(div).addClass("firePit");
        var _pondFish = $(div).addClass("pondFish").k_hide();
        var _casteway = $(div).addClass("castawaySprites");

        var _dummy = $(getDiv()).addClass("dummy");
        $(_dummy).insertAfter(AnimationPlace);

        $(_casteway).insertAfter(AnimationPlace);
        $(_stickpot).insertAfter(AnimationPlace);
        $(_stickpottext).insertAfter(AnimationPlace);
        $(_fishpot).insertAfter(AnimationPlace);
        $(_fishpottext).insertAfter(AnimationPlace);
        $(_sticksbrush).insertAfter(AnimationPlace);
        $(_firepot).insertAfter(AnimationPlace);
        $(_pondFish).insertAfter(AnimationPlace);
        // night 
        var _overlay = $(div).addClass("overlay");
        var _firePit2 = $(div).addClass("firePit2").k_hide();

        $(_firePit2).insertAfter(AnimationPlace);
        $(_overlay).insertAfter(AnimationPlace);
        _setimgaccessibility();
    }
    var _gatheringWood = function (_dur, data) {
        var div = getDiv();
        if (_Navigator.GetCurrentPage().isFriday) {
            var _gatheringwood = $(div).addClass("fridaygatheringSprites").k_hide();
            $(_gatheringwood).insertAfter(AnimationPlace);
            _SetWood(data, _dur);
            _delay(".fridaygatheringSprites", _dur, function () {
                $(".fridaygatheringSprites").remove();
            })
        } else {
            var _gatheringwood = $(div).addClass("gatheringSprites").k_hide();
            $(_gatheringwood).insertAfter(AnimationPlace);
            _SetWood(data, _dur);
            _delay(".gatheringSprites", _dur, function () {
                $(".gatheringSprites").remove();
            });
        }
    }
    var _chopping = function (_dur, data) {
        var div = getDiv();
        var _gatheringwood = $(div).addClass("chopping").k_hide();
        $(_gatheringwood).insertAfter(AnimationPlace);
        _SetWood(data, _dur);
        _delay(".chopping", _dur, function () {
            $(".chopping").remove();
        })
    }
    var _fishing = function (_dur, data) {
        var div = getDiv();
        if (_Navigator.GetCurrentPage().isFriday) {
            var _gatheringwood = $(div).addClass("fridayfishing1Sprites").k_hide();
            $(_gatheringwood).insertAfter(AnimationPlace);
            _SetFish(data, _dur);
            _delay(".fridayfishing1Sprites,.pondFish", _dur, function () {
                $(".fridayfishing1Sprites").remove();
                $(".pondFish").k_hide();
            });
        } else {
            var _gatheringwood = $(div).addClass("fishing1Sprites").k_hide();
            $(_gatheringwood).insertAfter(AnimationPlace);
            _SetFish(data, _dur);
            _delay(".fishing1Sprites,.pondFish", _dur, function () {
                $(".fishing1Sprites").remove();
                $(".pondFish").k_hide();
            });
        }
    }
    var _fishingNet = function (_dur, data) {
        var div = getDiv();
        var _gatheringwood = $(div).addClass("fishingNet").k_hide();
        $(_gatheringwood).insertAfter(AnimationPlace);
        _SetFish(data, _dur);
        _delay(".fishingNet,.pondFish", _dur, function () {
            $(".fishingNet").remove();
            $(".pondFish").k_hide();
        });
    }
    var _SetWood = function (val, dur) {

        var _dur = dur || 1000;
        if (val < 0) {
            val = 0;
        }
        $('.woodcounter .count').each(function () {
            $(this).prop('Counter', $(this).text()).animate({
                Counter: val
            }, {
                duration: _dur,
                easing: 'swing',
                step: function (now) {
                    $(this).text(round(now))
                }
            })
        });
        _setimgaccessibility();
    }
    var _SetFish = function (val, dur) {
        var _dur = dur || 1000;
        if (val < 0) {
            val = 0;
        }
        $('.fishcounter .count').each(function () {
            $(this).prop('Counter', $(this).text()).animate({
                Counter: val
            }, {
                duration: _dur,
                easing: 'swing',
                step: function (now) {
                    $(this).text(round(now))
                }
            })
        });
        _setimgaccessibility();
    }
    var _SetFridayWood = function (val, dur) {}
    var _SetFridayFish = function (val, dur) {}
    var _setimgaccessibility = function () {
        /*if (AnimationPlace != undefined && AnimationPlace != "" && $('.woodcounter .count').length > 0 && $('.fishcounter .count').length > 0) {
            $(AnimationPlace).attr("alt", "wood " + $('.woodcounter .count').text() + " logs, fish " + $('.fishcounter .count').text() + " cals")
        }*/
    }
    var _Night = function () {
        var div = getDiv();
        var _flameHiSprites = $(div).addClass("flameHiSprites").k_hide();
        var _flameLoSprites = $(div).addClass("flamelow").k_hide();

        $(_flameLoSprites).insertAfter(AnimationPlace);
        $(_flameHiSprites).insertAfter(AnimationPlace);

        $(".flamelow").k_show();
        _delay(".flamelow", 500, function () {
            $(".flamelow").k_hide();

            $(".firePit2").k_show();
            _delay(".flameHiSprites", 500, function () {
                $(".overlay").removeClass("dayTime").addClass("nightTime");
                $(".flameHiSprites").k_show();
                $(".firePit2").css("backgroundImage", "url(" + _Settings.dataRoot + "'firePitGlow3.png')");
            })
        });
    }
    var _Die = function () {
        //_Day();
    }
    var _Day = function () {
        $(".flameHiSprites").k_hide();
        _delay(".flamelow", 500, function () {
            $(".flamelow").remove();
            $(".firePit2").css("backgroundImage", "url(" + _Settings.dataRoot + "'firePitGlow2.png')");
            $(".firePit2").k_hide();
            $(".overlay").removeClass("nightTime").addClass("dayTime");
        });
    }
    return {
        Init: function () {
            _staticImages();
        },
        night: function () {
            _Night();
        },
        day: function () {
            _Day();
        },
        die: function () {
            _Die();
        },
        collectWoodnfish: function (_dur1, _dur2, potData, callback) {

            $(".castawaySprites").k_hide();
            //console.time("wood");
            $(".woodcounter").addClass("activecounter")
            _gatheringWood(_dur1, potData.wood);
            _delay(".dummy", _dur1, function () {
                $(".woodcounter").removeClass("activecounter")
                $(".fishcounter").addClass("activecounter")
                _fishing(_dur2, potData.fish);
                _delay(".dummy", (_dur2), function () {
                    $(".fishcounter").removeClass("activecounter")
                });
                //console.timeEnd("wood");
                if (typeof callback == "function") {
                    _delay(".dummy", (_dur2), function () {
                        $(".castawaySprites").k_show();
                        callback();
                        //console.timeEnd("wood");
                    });
                }
            });
        },
        choppingNfishing: function (_dur1, _dur2, potData, callback) {
            $(".castawaySprites").k_hide();
            //console.time("wood");
            $(".woodcounter").addClass("activecounter")
            _chopping(_dur1, potData.wood);
            _delay(".dummy", _dur1, function () {
                $(".woodcounter").removeClass("activecounter")
                $(".fishcounter").addClass("activecounter")
                _fishing(_dur2, potData.fish);
                _delay(".dummy", (_dur2), function () {
                    $(".fishcounter").removeClass("activecounter")
                });
                //console.timeEnd("wood");
                if (typeof callback == "function") {
                    _delay(".dummy", (_dur2), function () {
                        $(".castawaySprites").k_show();
                        callback();
                        //console.timeEnd("wood");
                    });
                }
            });
        },
        collectWoodNfishingNet: function (_dur1, _dur2, potData, callback) {
            $(".castawaySprites").k_hide();
            //console.time("wood");
            $(".woodcounter").addClass("activecounter")
            _gatheringWood(_dur1, potData.wood);
            _delay(".dummy", _dur1, function () {
                $(".woodcounter").removeClass("activecounter")
                $(".fishcounter").addClass("activecounter")
                _fishingNet(_dur2, potData.fish);
                _delay(".dummy", (_dur2), function () {
                    $(".fishcounter").removeClass("activecounter");
                });
                if (typeof callback == "function") {
                    _delay(".dummy", (_dur2), function () {
                        $(".castawaySprites").k_show();
                        callback();
                    });
                }
            });
        },
        SetWoodCountValue: function (val, dur) {
            _SetWood(val, dur)
        },
        SetFishCountValue: function (val, dur) {
            _SetFish(val, dur)
        },
        show: function () {
            var div = getDiv();
            var _gatheringwood = $(div).addClass("chopping");
            $(_gatheringwood).insertAfter(AnimationPlace);
            var _gatheringwood = $(div).addClass("fishingNet");
            $(_gatheringwood).insertAfter(AnimationPlace);
        },
        MngAnimationEle: function () {
            var currPage = _Navigator.GetCurrentPage();
            if (currPage.pageId == 'l1p1' || currPage.pageId == 'l1p2' || currPage.pageId == 'l1p3') {
                $('.friday-raftSprites, .fridaySprites, .stickBarrelRaft2, .fishBarrelRaft2').k_hide();
            } else if (currPage.pageId == 'l1p4' || currPage.pageId == 'l1p5') {
                $('.friday-raftSprites, .fridaySprites, .stickBarrelRaft2, .fishBarrelRaft2').k_hide();
                $('.castawaySprites1').removeClass('castawaySprites1').addClass('fridaycastawaySprites');
            } else if (currPage.pageId == "l2p1") {
                $('.stickBarrelRaft2, .fishBarrelRaft2').k_hide();
                $('.castawaySprites1').removeClass('castawaySprites1').addClass('castawaySprites');
                $('.friday-raftSprites, .fridaySprites').k_show();
                    setTimeout(function(){
                        if (isIpad) {
                            _Common.SetReader(_Settings.hiddenAnchor, "progress");
                        } else {
                            _Common.SetReader(_Settings.hiddenAnchor, "progress_bar");
                        }
                  },3000);
            } else if (currPage.hasTradeSlider != undefined && currPage.hasTradeSlider) {
                if (currPage.pageId == "l2p3") {
                    $("#btnstartslider").k_disable();
                } else if (currPage.pageId == 'l4p5') {
                    $('.friday-raftSprites2').removeClass('friday-raftSprites2').addClass('friday-raftSprites');
                    $('.friday-raftSprites').removeClass('friday-raftSprites2');
                    $('.fridaySprites2').removeClass('fridaySprites2').addClass('fridaySprites');
                }
                $('.fishBarrelRaft2').k_hide();
                $('.castawaySprites1').removeClass('castawaySprites1').addClass('castawaySprites');
                setTimeout(function () {
                    $('.castawaySprites').removeClass('castawaySprites').addClass('castawaySprites1');
                    if (currPage.pageId == "l2p3") {
                        $("#btnstartslider").k_enable();
                    }
                }, 2500)
            } else if (currPage.pageId == 'l3p2') {
                $('.fishBarrelRaft2').k_hide();
            } else if( currPage.pageId == 'l3p1' || currPage.pageId == 'l4p1'){
                 $('.fishBarrelRaft2').k_hide();
                //Added for on level start page giving focus after animation completion
                 setTimeout(function(){
                    if (isIpad) {
                        _Common.SetReader(_Settings.hiddenAnchor, "progress");
                    } else {
                        _Common.SetReader(_Settings.hiddenAnchor, "progress_bar");
                    }
                },3000);
            }
        },
        LadyComeWithFish: function () {
            $('.stickBarrelRaft2').removeClass('stickBarrelRaft2').addClass('fishBarrelRaft2');
            $('.castawaySprites1').removeClass('castawaySprites1').addClass('castawaySprites');
            $('.friday-raftSprites2').removeClass('friday-raftSprites2').addClass('friday-raftSprites');
            $('.fishBarrelRaft2').k_show();
            $('.fridaySprites2').removeClass('fridaySprites2').addClass('fridaySprites');
            setTimeout(function () {
                $('.castawaySprites').removeClass('castawaySprites').addClass('castawaySprites1');
            }, 2500);
        },
        LadyGoWithWood: function () {
            $(".fishBarrelRaft2").removeClass("fishBarrelRaft2").addClass("stickBarrelRaft2");
            $(".fridaySprites").removeClass("fridaySprites").addClass("fridaySprites2");
            $('.castawaySprites1').removeClass('castawaySprites1').addClass('castawaySprites');
            $(".friday-raftSprites").removeClass(".friday-raftSprites").addClass("friday-raftSprites2");
            setTimeout(function () {
                $('.castawaySprites').removeClass('castawaySprites').addClass('castawaySprites1');
            }, 2500)
        },
        LadyComeWithWood: function () {
            $('.fishBarrelRaft3').removeClass('fishBarrelRaft3').addClass('stickBarrelRaft3');
            $('.fishBarrelRaft2').removeClass('fishBarrelRaft2').addClass('stickBarrelRaft3');
            $('.castawaySprites1').removeClass('castawaySprites1').addClass('castawaySprites');
            $('.friday-raftSprites2').removeClass('friday-raftSprites2').addClass('friday-raftSprites');
            $('.stickBarrelRaft3').k_show();
            $('.fridaySprites2').removeClass('fridaySprites2').addClass('fridaySprites');
            setTimeout(function () {
                $('.castawaySprites').removeClass('castawaySprites').addClass('castawaySprites1');
            }, 2500);
        },
        LadyGoWithFish: function () {
            $(".stickBarrelRaft3").removeClass("stickBarrelRaft3").addClass("fishBarrelRaft3");
            $(".fridaySprites").removeClass("fridaySprites").addClass("fridaySprites2");
            $('.castawaySprites1').removeClass('castawaySprites1').addClass('castawaySprites');
            $(".friday-raftSprites").removeClass(".friday-raftSprites").addClass("friday-raftSprites2");
            setTimeout(function () {
                $('.castawaySprites').removeClass('castawaySprites').addClass('castawaySprites1');
            }, 2500)
        }
    }
})();

var EventManager = function () {
    return {
        onStart: function () {
            $("#linkprevious").k_disable();
            $("#appmenu").k_disable();
            $("#assist-txt").attr("aria-hidden","false");
            $('body').animate({
                scrollTop: $(".t_animation_c").position().top - _Settings.topMargin
            }, 200, function () {                
                var currPage = _Navigator.GetCurrentPage();
                if (currPage.hasTradeSlider != undefined && currPage.hasTradeSlider) {
                    $(".assistive-text").text('');
                    $(".assistive-text").text("Daytime Schedule calculation in progress");
                    $('.friday-raftSprites').removeClass('friday-raftSprites').addClass('friday-raftSprites2');
                    $('.fridaySprites').removeClass('fridaySprites').addClass('fridaySprites2');
                    $('.castawaySprites1').removeClass('castawaySprites1').addClass('castawaySprites');
                    $(".runtimeslider").k_show();
                    $(".selecttimeslider").k_hide();
                    $(".startbtnpanel").k_hide();
                    $("#onewoodfor-range").k_disable()
                    $("#givewood-range").k_disable()
                    $("#givefish-range").k_disable()
                    setTimeout(function () {
                        $('.castawaySprites').removeClass('castawaySprites').addClass('castawaySprites1');
                        $('.castawaySprites1').k_hide();
                        _Slider.setDefaultValue();
                        _Slider.StartScheduler();
                    }, 2000)
                } else {
                    $(".assistive-text").text('');
                    $(".assistive-text").text("Daytime Schedule calculation in progress");
                    $(".questionband").k_hide();
                    $('.castawaySprites1, .fridaycastawaySprites').k_hide();
                    _Slider.setDefaultValue();
                    _Slider.StartScheduler();
                }
            });
        },
        onFind: function () {
            $("#assist-txt").attr("aria-hidden","false");
            $('body').animate({
                scrollTop: $(".t_animation_c").position().top - _Settings.topMargin
            }, 200, null, function () {
                $(".assistive-text").text('');
                $(".assistive-text").text("Night time Schedule calculation in progress");
                var currPage = _Navigator.GetCurrentPage();
                var fish = 0;
                var wood = 0;
                var animInterval = 0;
                if (currPage.hasTradeSlider != undefined && currPage.hasTradeSlider) {
                    var sceanIndex = _Scenario.GetScenarioIndex();
                    if (currPage.datalevel == 4 && sceanIndex == 1) {
                        _Animation.LadyGoWithFish();
                    } else {
                        _Animation.LadyGoWithWood();
                    }
                    var ts = _TradeSlider.GetTradeSettings();
                    var tr = _TradeSlider.GetTradeResult();
                    $(".t_animation_c .fishcounter .count").text(tr.consumptionfish)
                    $(".t_animation_c .woodcounter .count").text(tr.consumptionwood)
                    fish = tr.consumptionfish - AnimConfig.nightFishValueDeduction;
                    wood = tr.consumptionwood - AnimConfig.nightWoodValueDeduction;
                    animInterval = 2500;
                } else {
                    var potData = DataStorage.getPotData();
                    fish = potData.fish - AnimConfig.nightFishValueDeduction;
                    wood = potData.wood - AnimConfig.nightWoodValueDeduction;
                    animInterval = 0;
                }
                $(".runtimeslider").k_hide();
                $(".nighttimeslider").k_show();
                $("#onewoodfor-range").k_disable();
                $("#givewood-range").k_disable();
                $("#givefish-range").k_disable();
                $("#btnfindout").k_disable();
                setTimeout(function () {
                    $('.fishBarrelRaft3').k_hide();
                    _Animation.night();
                    _Animation.SetFishCountValue(fish, 5000);
                    _Animation.SetWoodCountValue(wood, 5000);
                    _Slider.nightSliderSchedule();
                }, animInterval)
            });

        },
        OnTryAgain: function () {
            _Animation.day();
            Table.hide();
            var fishhrs = 0;
            var woodhrs = 0;
            $("#collect-wood .wood-slider").val(woodhrs);
            $("#collect-fish .fish-slider").val(fishhrs);
            $(".fishcounter .count").text(fishhrs);
            $(".woodcounter .count").text(woodhrs);
            $("#w_val").text(woodhrs);
            $("#f_val").text(fishhrs);
            $(".colorful-slider1").css("width", (fishhrs * 10) + "%");
            $(".animate-slider1").css("width", (fishhrs * 10) + "%");
            $(".colorful-slider2").css("width", (woodhrs * 10) + "%");
            $(".animate-slider2").css("width", (woodhrs * 10) + "%");
            $(".runtimeslider").k_hide();
            $(".startbtnpanel").k_show();
            $(".selecttimeslider").k_show();
            $(".questionband").k_hide();
            $(".nighttimeslider").k_hide();
            $("#onewoodfor-range").k_enable();
            $("#givewood-range").k_enable();
            $("#givewfish-range").k_enable();
            $(".tot-slider").removeClass('disabled');
            $(".tot-slider").removeAttr('disabled');
            $("#graph-div").attr("aria-label", "Daytime Schedule Idle");
            $(".assistive-text").text('');
            _Question.UnloadFeedback();
            $("#btnfindout").k_enable();
            $("#dayno").text(DataStorage.getCurrentDay());
            var currPage = _Navigator.GetCurrentPage();
            //NM: Need to check this call.
            _Slider.InitSelectTimeSlider();
            if (currPage.hasTradeSlider != undefined && currPage.hasTradeSlider) {
                _Animation.MngAnimationEle();
                _TradeSlider.ResetTradeSlider();
            }
        },
        onNextDay: function () {
            $('.stickBarrelRaft2, .fishBarrelRaft2').k_hide();
            $('.castawaySprites1').removeClass('castawaySprites1').addClass('castawaySprites');
            $('.fridaySprites2').removeClass('fridaySprites2').addClass('fridaySprites');
            $('.friday-raftSprites2').removeClass('friday-raftSprites2').addClass('friday-raftSprites');
            $("#linknext").k_disable();
            _TradeSlider.UpdateInventoryTables();
            DataStorage.updateDay();
            var currentDay = DataStorage.getCurrentDay();
            $("#dayno").text(currentDay);
            _Animation.day();
            var fishhrs = 0;
            var woodhrs = 0;
            $("#collect-wood .wood-slider").val(fishhrs);
            $("#collect-fish .fish-slider").val(woodhrs);
            $("#w_val").text(woodhrs);
            $("#f_val").text(fishhrs);
            $(".colorful-slider1").css("width", (fishhrs * 10) + "%");
            $(".animate-slider1").css("width", (fishhrs * 10) + "%");
            $(".colorful-slider2").css("width", (woodhrs * 10) + "%");
            $(".animate-slider2").css("width", (woodhrs * 10) + "%");
            //Table.hide();
            //TopLinkSlider.UpdateSurplusChartData(DataStorage.getSurplusChartData().fish, DataStorage.getSurplusChartData().wood);


            $(".nighttimeslider").k_hide();
            $(".runtimeslider").k_hide();
            $(".selecttimeslider").k_show();
            $('.startbtnpanel').k_show();
            $(".questionband").k_hide();
            $("#btnfindout").k_enable();
            $("#onewoodfor-range").k_enable()
            $("#givewood-range").k_enable();
            $("#givefish-range").k_enable();
            _Question.UnloadFeedback();
            _TradeSlider.ResetTradeSlider();
            $('body').animate({
                scrollTop: $(".t_animation_c").position().top - _Settings.topMargin
            }, 200);
        },
        onAnimComplete: function () {
            $("#assist-txt").attr("aria-hidden","true");
            var currPage = _Navigator.GetCurrentPage();
            var fish = DataStorage.getPotData().fish;
            var wood = DataStorage.getPotData().wood;
            if (fish < 0) {
                fish = 0;
            }
            if (wood < 0) {
                wood = 0;
            }
            if (currPage.hasTradeSlider != undefined && currPage.hasTradeSlider) {
                $('.castawaySprites1, .fridaycastawaySprites').k_show();
                var sceanindex = _Scenario.GetScenarioIndex();
                if (currPage.datalevel == 4 && sceanindex == 1) {
                    _Animation.LadyComeWithWood();
                } else {
                    _Animation.LadyComeWithFish();
                }
                setTimeout(function () {
                    $('.startbtnpanel').k_hide();
                    $(".questionband").k_show();
                    $(".questionband").removeClass("displaynone");
                    $('.castawaySprites').removeClass('castawaySprites').addClass('castawaySprites1');
                    //$("#onewoodfor-range").k_enable()
                    //$("#givewood-range").k_enable()
                    $('body').animate({
                        scrollTop: document.body.scrollHeight
                    }, 1000);
                    _Common.SetReader(_Settings.hiddenAnchor,"div_question");
                }, 2500)
            } else {
                Table.setfish(DataStorage.getProducedData().fish, fish);
                Table.setWood(DataStorage.getProducedData().wood, wood);
                Table.show();
                $('.castawaySprites1, .fridaycastawaySprites').k_show();
                $('.startbtnpanel').k_hide();
                $(".questionband").k_show();
                $(".questionband").removeClass("displaynone");
                $('.castawaySprites').removeClass('castawaySprites').addClass('castawaySprites1');
                //$("#onewoodfor-range").k_enable()
                //$("#givewood-range").k_enable()
                $('body').animate({
                    scrollTop: document.body.scrollHeight
                }, 1000);
                _Common.SetReader(_Settings.hiddenAnchor,"div_question");
            }
        },
        onNightAnimComplete: function () {
            $("#linkprevious").k_enable();
            if(_Navigator.GetBookmarkData().levelRetry == 'level' || _Navigator.GetBookmarkData().levelRetry == 'all') {
                $("#appmenu").k_disable();
            }else{
                $("#appmenu").k_enable();
            }
            $("#assist-txt").attr("aria-hidden","true");
            _Animation.day();
            var currPage = _Navigator.GetCurrentPage();
            var isdie = false;
            var diereason = "";
            var diereason2 = "";
            var remdata = {};
            if (currPage.hasTradeSlider != undefined && currPage.hasTradeSlider) {
                var ts = _TradeSlider.GetTradeSettings();
                var tr = _TradeSlider.GetTradeResult();
                //your wood time fraction
                var yftf = tr.consumptionfish / AnimConfig.nightFishValueDeduction;
                var ywtf = tr.consumptionwood / AnimConfig.nightWoodValueDeduction;
                //friday wood time fraction
                var fftf = tr.fridayconsumptionfish / AnimConfig.nightFishValueDeductionfriday;
                var fwtf = tr.fridayconsumptionwood / AnimConfig.nightWoodValueDeductionfriday;
                if (yftf < 1 || ywtf < 1) {
                    isdie = true;
                    diereason = "you_die";
                    if (yftf < 1 && ywtf < 1) {
                        diereason2 = "both";
                    } else if (yftf < 1 && yftf < ywtf) {
                        diereason2 = "fish";
                    } else if (ywtf < 1 && ywtf < yftf) {
                        diereason2 = "wood";
                    }
                } else if (fftf < 1 || fwtf < 1) {
                    isdie = true;
                    diereason = "friday_die";
                    if (fftf < 1 && fwtf < 1) {
                        diereason2 = "both";
                    } else if (fftf < 1 && fftf < fwtf) {
                        diereason2 = "fish";
                    } else if (fwtf < 1 && fwtf < fftf) {
                        diereason2 = "wood";
                    }
                }
                remdata.wood = tr.consumptionwood - AnimConfig.nightWoodValueDeduction;
                remdata.fish = tr.consumptionfish - AnimConfig.nightFishValueDeduction;
                remdata.fridaywood = tr.fridayconsumptionwood - AnimConfig.nightWoodValueDeductionfriday;
                remdata.fridayfish = tr.fridayconsumptionfish - AnimConfig.nightFishValueDeductionfriday;
                if (remdata.wood < 0) {
                    remdata.wood = 0;
                }
                if (remdata.fish < 0) {
                    remdata.fish = 0;
                }
                if (remdata.fridaywood < 0) {
                    remdata.fridaywood = 0;
                }
                if (remdata.fridayfish < 0) {
                    remdata.fridayfish = 0;
                }
            } else {
                var potData = DataStorage.getPotData();
                var woodtimefraction = potData.wood / AnimConfig.nightWoodValueDeduction;
                var fishtimefraction = potData.fish / AnimConfig.nightFishValueDeduction;
                if (woodtimefraction < 1 || fishtimefraction < 1) {
                    isdie = true;
                    if (woodtimefraction < fishtimefraction) {
                        diereason = "less_wood";
                    } else {
                        diereason = "less_fish";
                    }
                }
                remdata.wood = potData.wood - AnimConfig.nightWoodValueDeduction;
                remdata.fish = potData.fish - AnimConfig.nightFishValueDeduction;
                if (remdata.wood < 0) {
                    remdata.wood = 0;
                }
                if (remdata.fish < 0) {
                    remdata.fish = 0;
                }

                Table.setfish(DataStorage.getProducedData().fish, remdata.fish);
                Table.setWood(DataStorage.getProducedData().wood, remdata.wood);
            }

            if (!isdie) {
                var _currentQuestionObj = _Question.GetCurrentQuestion();                
                DataStorage.SetRemainingData(remdata);
                if (currPage.hasTradeSlider != undefined && currPage.hasTradeSlider) {
                    _TradeSlider.SetRemTradeData(remdata);
                    DataStorage.SetTradeData();
                    if (_TradeSlider.IsTargetComplete()) {
                        _currentQuestionObj.isAnswered = true;
                        _currentQuestionObj.points = parseFloat(_currentQuestionObj.totalPoints);
                        currPage.IsComplete = true;
                        var target = _TradeSlider.GetTarget();
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
                        if (currPage.customNext != undefined) {
                            currPage.customNext.isComplete = true;
                        }
                        $('.friday-raftSprites').removeClass('friday-raftSprites').addClass('friday-raftSprites2');
                    } else {                        
                        _Question.Loadfeedback(0);
                    }
                } else {
                    _currentQuestionObj.isAnswered = true;
                    _currentQuestionObj.points = parseFloat(_currentQuestionObj.totalPoints);
                    currPage.IsComplete = true;
                    _Question.Loadfeedback(0);
                }

                DataStorage.updateCollection();
                _Navigator.UpdateScore();
                $("#linknext").k_enable();
                
                //activity is complete and page is last then increment the attempt
                if(_currentQuestionObj.isAnswered && currPage.isLevelEnd) {
                    _Module.IncrementAttempted(currPage.datalevel);
                }
                if(_currentQuestionObj.isAnswered) {
                    _Module.SaveSessionData();
                }                

            } else if (diereason == "less_fish" || diereason == "you_die") {
                if (currPage.pageId == "l4p5") {
                    if (diereason2 == "wood") {
                        _Question.Loadfeedback(2);
                    } else if (diereason2 == "fish") {
                        _Question.Loadfeedback(3);
                    } else if (diereason2 == "both") {
                        _Question.Loadfeedback(4);
                    }
                } else {
                    _Question.Loadfeedback(1);
                }
            } else if (diereason == "less_wood" || diereason == "friday_die") {
                if (currPage.pageId == "l4p5") {
                    if (diereason2 == "wood") {
                        _Question.Loadfeedback(5);
                    } else if (diereason2 == "fish") {
                        _Question.Loadfeedback(6);
                    } else if (diereason2 == "both") {
                        _Question.Loadfeedback(7);
                    }
                } else {
                    _Question.Loadfeedback(2);
                }
            }
        },
        UpdateDayInFeedback: function () {
            var currentDay = DataStorage.getCurrentDay();
            var dayval = _Navigator.ordinalInWord(currentDay);
            $("#dayval").text(dayval);
             //var remdata = DataStorage.getRemainingPotData();
            // PPFQuestion.FindOutComplete({ IsAlive: true, totalRemainingLbs: remdata.wood, totalRemainingCals: remdata.fish, day: dayval });
           // var dayval = ""
           /* var days = {
                1: "st",
                2: "nd",
                3: "rd"
            }
            if ((currentDay > 10 && currentDay < 14) || (currentDay % 10) == 0 || (currentDay % 10) > 3) {
                dayval = currentDay + "th";
            } else {
                dayval = currentDay + days[(currentDay % 10)]
            }*/ 
        }        
    }
}();
var Table = function () {
    var round = function (val) {
        if (Math.round(val) !== val) {
            val = Number(val.toFixed(1));
        }
        return val;
    }
    return {
        show: function () {
            $(".tableInventory").k_show();
        },
        hide: function () {
            $(".tableInventory").k_hide();
        },
        setFishAtStart: function (lastRemaining) {
            $(".sodfish").text(round(lastRemaining));
        },
        setWoodAtStart: function (lastRemaining) {
            $(".sodwood").text(round(lastRemaining));
        },
        setWood: function (woodproduced, woodremaining) {
            $(".prdwood").text(round(woodproduced));
            $(".eodwood").text(round(woodremaining));
        },
        setfish: function (ishproduced, fishremaining) {
            $(".prdfish").text(round(ishproduced));
            $(".eodfish").text(round(fishremaining));
        },
    }
}();