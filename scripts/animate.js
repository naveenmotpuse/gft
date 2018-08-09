var round = function (val) {
    if (Math.round(val) !== val) {
        val = val.toFixed(1);
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
        $(_ele).show().delay(_dur).queue(function (nxt) {
            $(this).dequeue();
            callback();
        });
    }
    var _staticImages = function () {
        var div = getDiv();
        //var _potData = DataStorage.getPotData()
        var _potData = DataStorage.getLastDayPotData()
        var _stickpot = $(div).addClass("stickBarrelRaft");
        var _stickpottext = $(div).attr('aria-live', 'polite').addClass("woodcounter OpenSansFont12px").append("Wood : <span class='count'>" + round(_potData.wood) + "</span> lbs");
        var _fishpot = $(div).addClass("fishBarrelRaft");
        var _fishpottext = $(div).attr('aria-live', 'polite').addClass("fishcounter OpenSansFont12px").append("Fish : <span class='count'>" + round(_potData.fish) + "</span> cals");
        var _sticksbrush = $(div).addClass("brush");
        var _firepot = $(div).addClass("firePit");
        var _pondFish = $(div).addClass("pondFish").hide();
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
        var _firePit2 = $(div).addClass("firePit2").hide();

        $(_firePit2).insertAfter(AnimationPlace);
        $(_overlay).insertAfter(AnimationPlace);
        _setimgaccessibility();
    }
    var _gatheringWood = function (_dur, data) {
        var div = getDiv();
        if (_Navigator.GetCurrentPage().isFriday) {
            var _gatheringwood = $(div).addClass("fridaygatheringSprites").hide();
            $(_gatheringwood).insertAfter(AnimationPlace);
            _SetWood(data, _dur);
            _delay(".fridaygatheringSprites", _dur, function () {
                $(".fridaygatheringSprites").remove();
            })
        } else {
            var _gatheringwood = $(div).addClass("gatheringSprites").hide();
            $(_gatheringwood).insertAfter(AnimationPlace);
            _SetWood(data, _dur);
            _delay(".gatheringSprites", _dur, function () {
                $(".gatheringSprites").remove();
                var currPage = _Navigator.GetCurrentPage();
                if (currPage.pageId == 'l2p3' || currPage.pageId == 'l3p2') {
                    _Animation.LadyComeWithFish();
                }
            });
        }
    }
    var _chopping = function (_dur, data) {
        var div = getDiv();
        var _gatheringwood = $(div).addClass("chopping").hide();
        $(_gatheringwood).insertAfter(AnimationPlace);
        _SetWood(data, _dur);
        _delay(".chopping", _dur, function () {
            $(".chopping").remove();
        })
    }
    var _fishing = function (_dur, data) {
        var div = getDiv();
        if (_Navigator.GetCurrentPage().isFriday) {
            var _gatheringwood = $(div).addClass("fridayfishing1Sprites").hide();
            $(_gatheringwood).insertAfter(AnimationPlace);
            _SetFish(data, _dur);
            _delay(".fridayfishing1Sprites,.pondFish", _dur, function () {
                $(".fridayfishing1Sprites").remove();
                $(".pondFish").hide();
            });
        } else {
            var _gatheringwood = $(div).addClass("fishing1Sprites").hide();
            $(_gatheringwood).insertAfter(AnimationPlace);
            _SetFish(data, _dur);
            _delay(".fishing1Sprites,.pondFish", _dur, function () {
                $(".fishing1Sprites").remove();
                $(".pondFish").hide();
            });
        }
    }
    var _fishingNet = function (_dur, data) {
        var div = getDiv();
        var _gatheringwood = $(div).addClass("fishingNet").hide();
        $(_gatheringwood).insertAfter(AnimationPlace);
        _SetFish(data, _dur);
        _delay(".fishingNet,.pondFish", _dur, function () {
            $(".fishingNet").remove();
            $(".pondFish").hide();
        });
    }
    var _SetWood = function (val, dur) {
        
        var _dur = dur || 1000;
        if (val >= 0) {
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
        } else {
            val = 0;
            $('.woodcounter .count').each(function () {
                $(this).prop('Counter', $(this).text()).animate({
                    Counter: val
                }, {
                    duration: _dur,
                    complete: function () {
                        EventManager.onDie("less_wood")
                    },
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(round(now))
                    }
                })
            });
        }
        //DataStorage.setWoodRemaining(val);

        _setimgaccessibility();

    }
    var _SetFish = function (val, dur) {
        
        var _dur = dur || 1000;
        if (val >= 0) {
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
        } else {
            val = 0;
            $('.fishcounter .count').each(function () {
                $(this).prop('Counter', $(this).text()).animate({
                    Counter: val
                }, {
                    duration: _dur,
                    complete: function () {
                        EventManager.onDie("less_fish")
                    },
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(round(now))
                    }
                })
            });
        }
        //DataStorage.setFishRemaining(val);
        _setimgaccessibility();
    }
    var _setimgaccessibility = function () {
        if (AnimationPlace != undefined && AnimationPlace != "" && $('.woodcounter .count').length > 0 && $('.fishcounter .count').length > 0) {
            $(AnimationPlace).attr("alt", "wood " + $('.woodcounter .count').text() + " lbs, fish " + $('.fishcounter .count').text() + " cals")
        }
    }
    var _Night = function () {
        var div = getDiv();
        var _flameHiSprites = $(div).addClass("flameHiSprites").hide();
        var _flameLoSprites = $(div).addClass("flamelow").hide();

        $(_flameLoSprites).insertAfter(AnimationPlace);
        $(_flameHiSprites).insertAfter(AnimationPlace);

        $(".flamelow").show();
        _delay(".flamelow", 500, function () {
            $(".flamelow").hide();

            $(".firePit2").show();
            _delay(".flameHiSprites", 500, function () {
                $(".overlay").removeClass("dayTime").addClass("nightTime");
                $(".flameHiSprites").show();
                $(".firePit2").css("backgroundImage", "url(" + _Settings.dataRoot + "'firePitGlow3.png')");
            })
        });
    }
    var _Die = function () {
        //_Day();
    }
    var _Day = function () {
        $(".flameHiSprites").hide();
        _delay(".flamelow", 500, function () {
            $(".flamelow").remove();
            $(".firePit2").css("backgroundImage", "url(" + _Settings.dataRoot + "'firePitGlow2.png')");
            $(".firePit2").hide();
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
            
            $(".castawaySprites").hide();
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
                        $(".castawaySprites").show();
                        callback();
                        //console.timeEnd("wood");
                    });
                }
            });
        },
        choppingNfishing: function (_dur1, _dur2, potData, callback) {
            $(".castawaySprites").hide();
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
                        $(".castawaySprites").show();
                        callback();
                        //console.timeEnd("wood");
                    });
                }
            });
        },
        collectWoodNfishingNet: function (_dur1, _dur2, potData, callback) {
            $(".castawaySprites").hide();
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
                        $(".castawaySprites").show();
                        callback();
                        //console.timeEnd("wood");
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
            var CurrPage = _Navigator.GetCurrentPage();
            if (CurrPage.pageId == 'l1p1' || CurrPage.pageId == 'l1p2' || CurrPage.pageId == 'l1p3') {
                $('.friday-raftSprites, .fridaySprites, .stickBarrelRaft2, .fishBarrelRaft2').hide();
            } else if (CurrPage.pageId == 'l1p4' || CurrPage.pageId == 'l1p5') {
                $('.friday-raftSprites, .fridaySprites, .stickBarrelRaft2, .fishBarrelRaft2').hide();
                $('.castawaySprites1').removeClass('castawaySprites1').addClass('fridaycastawaySprites');
            } else if (CurrPage.pageId == "l2p1") {
                $('.stickBarrelRaft2, .fishBarrelRaft2').hide();
                $('.castawaySprites1').removeClass('castawaySprites1').addClass('castawaySprites');
                $('.friday-raftSprites, .fridaySprites').show();
            } else if (CurrPage.pageId == "l2p3") {
                $('.fishBarrelRaft2').hide();
                $('.castawaySprites1').removeClass('castawaySprites1').addClass('castawaySprites');
            } else if (CurrPage.pageId == "l3p2") {
                $('.fishBarrelRaft2').hide();
                $('.castawaySprites1').removeClass('castawaySprites1').addClass('castawaySprites');
            }
        },
        LadyComeWithFish: function () {
            
            $('.castawaySprites1').removeClass('castawaySprites1').addClass('castawaySprites');
            $('.friday-raftSprites2').removeClass('friday-raftSprites2').addClass('friday-raftSprites');
            $('.fishBarrelRaft2').show();
            $('.castawaySprites').show();
            $('.fridaySprites2').removeClass('fridaySprites2').addClass('fridaySprites');
        },
        LadyGoWithWood: function () {
            
            $('.fishBarrelRaft2').removeClass('fishBarrelRaft2').addClass('stickBarrelRaft2');
            $('friday-raftSprites').removeClass('friday-raftSprites').addClass('friday-raftSprites2');
        }
    }
})();

var EventManager = function () {
    return {
        onStart: function () {},
        onFind: function () {
            
            $('html,body').animate({
                scrollTop: $(".t_animation_c").position().top - _Settings.topMargin
            }, 200);

            var potData = DataStorage.getPotData();
            var potDataremainLastDay = DataStorage.getRemainingPotData();
            var fish = DataStorage.getPotData().fish - AnimConfig.nightFishValueDeduction;
            var wood = DataStorage.getPotData().wood - AnimConfig.nightWoodValueDeduction;
            _Animation.night();
            _Animation.SetFishCountValue(fish, 5000);
            _Animation.SetWoodCountValue(wood, 5000);
            _Slider.nightSliderSchedule();
            if (fish < 0) {
                fish = 0;
            }
            if (wood < 0) {
                wood = 0;
            }
            //Table.setfish(DataStorage.getProducedData().fish, fish);
            //Table.setWood(DataStorage.getProducedData().wood, wood);
            // update datastroage 
            DataStorage.setFishRemaining(fish);
            DataStorage.setWoodRemaining(wood);
            //Moved to next
            DataStorage.updateCollection();
            $(".runtimeslider").hide();
            $(".nighttimeslider").show();
            $("#btnfindout").k_disable();
            $("#linknext").k_enable();
        },
        OnTryAgain: function () {
            
            _Slider.Reset();
            _Animation.day();
            DataStorage.retry();
            Table.hide();
            var fishhrs = 0;
            var woodhrs = 0;
            var fish = 0;
            var wood = 0;
            AnimConfig.die = false;
            DataStorage.setFishRemaining(fish);
            DataStorage.setWoodRemaining(wood);
            $("#collect-wood .wood-slider").val(woodhrs);
            $("#collect-fish .fish-slider").val(fishhrs);
            $("#w_val").text(woodhrs);
            $("#f_val").text(fishhrs);
            $(".colorful-slider1").css("width", (fishhrs * 10) + "%");
            $(".animate-slider1").css("width", (fishhrs * 10) + "%");
            $(".colorful-slider2").css("width", (woodhrs * 10) + "%");
            $(".animate-slider2").css("width", (woodhrs * 10) + "%");
            _Question.UnloadFeedback();
            $(".runtimeslider").hide();
            $(".startbtnpanel").show();
            $(".selecttimeslider").show();
            $(".questionband").hide();
            $(".nighttimeslider").hide();
            $("#btnfindout").k_enable();
            $("#day").text(DataStorage.getCurrentDay());
        },
        onNextDay: function () {
            //DataStorage.updateCollection();
            _Slider.Reset();
            DataStorage.updateDay();
            var currentDay = DataStorage.getCurrentDay();
            if ($(".removeonnextday").length > 0) {
                $(".removeonnextday").remove();
                $("li.c-tool").remove();
                ValidationProps = {
                    "wood": 0,
                    "fish": 0,
                    "tool": false
                }
                AnimConfig.toolTime = 0;
            }
            $("#day").text(currentDay);
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
            Table.hide();
            TopLinkSlider.UpdateSurplusChartData(DataStorage.getSurplusChartData().fish, DataStorage.getSurplusChartData().wood);
            $("#dayinstruction").html("You can also use the surplus tab to keep track of your inventory totals over time. Click the surplus tab to learn more.  You will proceed to the next level when your inventories reach 30 logs and 3000 calories.<br/><br/>Once again, decide how to spend your time and then click Start button to begin the day. You’re on your own now. Good luck! ");

            $(".nighttimeslider").hide();
            $(".runtimeslider").hide();
            $(".startdaytimeshedulerbtn").show();
            $(".selecttimeslider").show();
            $(".questionband").hide();
            $(".findout").hide();
            $(".pgfeedback").hide();
            $(".row.retrybuttonpanelfind").hide();

            $('html,body').animate({
                scrollTop: 0
            }, 200);
            $(".fishcounter .count").text(0);
            $(".woodcounter .count").text(0);

            var tableData = DataStorage.getTableData();
            Table.surplus.setTableValue(tableData.todayWood, tableData.yesterdayWood, tableData.todayFish, tableData.yesterdayFish);
            setTimeout(function () {
                $(".headinglevel2").focus();
            }, 100)
        },
        onNightAnimComplete: function () {
            debugger;
            _Animation.day();
            _Slider.Reset();
            $("#btnfindout").k_disable()
            $("#linknext").k_enable()
            var remdata = DataStorage.getRemainingPotData();
            var currentDay = DataStorage.getCurrentDay();
            // var days = { 1: "1st", 2: "2nd", 3: "3rd", 4: "4th", 5: "5", 6: "6th", 7: "7th", 8: '8th', 9: "9th", 10: '10th', 11: '11th', 12: '12th', 13: '13th', 14: '14th', 15: '15th', 16: '16th', 17: '17th', 18: '18th', 19: '19th', 20:'20th' };
            var dayval = ""
            var days = {
                1: "st",
                2: "nd",
                3: "rd"
            }
            if ((currentDay > 10 && currentDay < 14) || (currentDay % 10) == 0 || (currentDay % 10) > 3) {
                dayval = currentDay + "th";
            } else {
                dayval = currentDay + days[(currentDay % 10)]
            }
            _CustomQuestion.FindOutComplete({
                IsAlive: true,
                totalRemainingLbs: remdata.wood,
                totalRemainingCals: remdata.fish,
                day: dayval
            });
            Table.setfish(DataStorage.getProducedData().fish, remdata.fish);
            Table.setWood(DataStorage.getProducedData().wood, remdata.wood);
        },
        onDie: function (because) {            
            AnimConfig.die = true;
            _CustomQuestion.FindOutComplete({
                IsAlive: false,
                DiedReason: because
            });
            $("#btnfindout").k_disable();
        },
        ActivityPrevAnswer: function () {
            var pageId = _Navigator.GetCurrentPage().pageId;            
            var datacoll = DataStorage.getCollection();
            for (var i = 0; i < datacoll.length; i++) {
                if (datacoll[i].pageId == pageId) {
                    Table.setWood(datacoll[i]._woodsLbs, 0);
                    Table.setfish(datacoll[i]._fishCals, 0);
                    break;
                }
            }
            _Question.Loadfeedback(0);

            $(".selecttimeslider").hide();
            $(".startbtnpanel").hide();
            $(".runtimeslider").hide();
            $(".nighttimeslider").show();
            $(".slider-arrow-night").css({
                "right": "0px"
            });
            $("#div_question").removeClass("displaynone").show();
            $(".findout").k_disable();
            $("#linknext").k_enable();
        }
    }
}();
var Table = function () {
    var round = function (val) {
        if (Math.round(val) !== val) {
            val = val.toFixed(1);
        }
        return val;
    }
    return {
        show: function () {
            $(".tableInventory").show();
        },
        hide: function () {
            $(".tableInventory").hide();
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