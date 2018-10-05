//BLOCK 1 - Existing Common - Service Calls
//Attach Preloader and focus AR 7May2018//
var Macbrowser = navigator.userAgent.indexOf('Chrome');
var Macos = navigator.userAgent.indexOf('Mac');
var userAgentCustom = window.navigator.userAgent;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

var preloader = '<div class="preloader ui-draggable ui-draggable-handle k-element-box ui-widget-content ui-resizable positionAbsolute" data-temptypes="top,tip,tvp,cep,poll,assessment" temptype="Image" data-hasqtip="101" aria-describedby="qtip-101" style="z-index: 3000;position: absolute !important;left: 0px;top: 0px;width:100%;height: 100%;border-width: 0px;opacity: 0.68;background: #FFF;display:block;"  showcontainer="False" defaultvisibility="Visible" ><img src="/assets/156/images/preloader.GIF" class="k-element-image div-edit-properties preloaderimg" fname="preloader" tabindex=6 alt="Loading FRED Data..." aria-label="Loading FRED Data..." role="alert" style="width: 30px; height: 30px;position: absolute;left: 50%;top: 25%;"><div class="preloaderText" tabindex=6>Loading...</div></div>';
//**//


var showSeparateLabels = false;

var Utility = function () {
    return {
        shuffle: function (e) {
            for (var t, n, r = e.length; 0 !== r;) n = Math.floor(Math.random() * r), r -= 1, t = e[r], e[r] = e[n], e[n] = t;
            return e
        },
        getParameterByName: function (e, t) {
            e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var n = new RegExp("[\\?&]" + e + "=([^&#]*)"),
                r = n.exec(t);
            return null === r ? "" : decodeURIComponent(r[1].replace(/\+/g, " "))
        },
        updateHtml: function (e, t) {
            $.each(e, function (e, n) {
                var r = "",
                    a = $(n);
                $.each(t, function (e, t) {
                    var n = new RegExp(e, "g");
                    r += a.html().replace(n, t)
                }), a.html(r)
            })
        },
        mergeArray: function (e, t) {
            var n = e.concat(t).sort(function (e, t) {
                return e > t ? 1 : t > e ? -1 : 0
            });
            return n.filter(function (e, t) {
                return n.indexOf(e) === t
            })
        },
        injectCss: function (e) {
            var t = document.getElementsByTagName("head")[0],
                n = document.createElement("style");
            n.setAttribute("type", "text/css"), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e)), t.appendChild(n)
        },
        getRandomIntInclusive: function (e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e
        }
    }
}();


//Default setting
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//1. for levels set on DI
var visibleLevels = JSON.parse('{"Intro": true, "level1": true, "level2": true, "level3": true }');

var g_isFromSummary = "no";
var g_isFromSummaryRetry;
var g_TPIDuration = 0;

// Enums
// Global TPI data
var TPIAttempts = {}; // save q-a data
var TPIData = {};
TPIData.SessionId = 0;
TPIData.SessionData = {};
TPIData.Mode = 'do';
TPIData.Roles = '';
TPIData.CurrentQuestion = '';
TPIData.TargetId = '';
TPIData.ResourceId = '';
TPIData.SessionObj = {};
TPIData.Sessionstate = {};
TPIData.TargetPoints = 1
TPIData.AllowedAttempts = 0;

if (gPackageType == 'Presenter') {
    TPIData.Roles = 'Presenter';
    TPIData.Mode = 'do';
}

//Time starts now 
var _startTime = new Date();

//2.for intro and summary page visibility customtomization code
function disableRefreshAttempts() {
    if (visibleLevels.level1 === false) {
        $(".heading_dt.level1").addClass("disabled").attr({
            "aria-disabled": "true"
        });
        $(".dd_text.level1").addClass("disabled").attr({
            "aria-disabled": "true"
        });
        $("#k-element-image8234").closest(".k-element-box").addClass("disabled");
        $("#k-element-text8214").closest(".k-element-box").addClass("disabled");
        $("#k-element-image824").closest(".k-element-box").addClass("disabled");
        $("#k-element-text826").closest(".k-element-box").css({
            'display': 'none'
        });
        $("#k-element-image829").closest(".k-element-box").css({
            'display': 'none'
        });
        $("#k-element-text8218").closest(".k-element-box").addClass("disabled");
    } else {
        if (TPIData.AllowedAttempts > 0 &&
            TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].levels[1].attempted != undefined &&
            TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].levels[1].attempted >= TPIData.AllowedAttempts) {
            $("#k-element-image824").css({
                'opacity': '0.4'
            });
            $("#k-element-image824").closest(".k-element-box").addClass("disabled")
        }
    }
    if (visibleLevels.level2 === false) {
        $(".heading_dt.level2").addClass("disabled").attr({
            "aria-disabled": "true"
        });
        $(".dd_text.level2").addClass("disabled").attr({
            "aria-disabled": "true"
        });
        $("#k-element-image8233").closest(".k-element-box").addClass("disabled");
        $("#k-element-text8215").closest(".k-element-box").addClass("disabled");
        $("#k-element-image8217").closest(".k-element-box").addClass("disabled");
        $("#k-element-text825").closest(".k-element-box").css({
            'display': 'none'
        });
        $("#k-element-image8218").closest(".k-element-box").css({
            'display': 'none'
        });
        $("#k-element-text8219").closest(".k-element-box").addClass("disabled");
    } else {
        if (TPIData.AllowedAttempts > 0 &&
            TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].levels[2].attempted != undefined &&
            TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].levels[2].attempted >= TPIData.AllowedAttempts) {
            $("#k-element-image8217").css({
                'opacity': '0.4'
            });
            $("#k-element-image8217").closest(".k-element-box").addClass("disabled");
        }

    }
    if (visibleLevels.level3 === false) {
        $(".heading_dt.level3").addClass("disabled").attr({
            "aria-disabled": "true"
        });
        $(".dd_text.level3").addClass("disabled").attr({
            "aria-disabled": "true"
        });
        $("#k-element-image8232").closest(".k-element-box").addClass("disabled");
        $("#k-element-text8216").closest(".k-element-box").addClass("disabled");
        $("#k-element-image8216").closest(".k-element-box").addClass("disabled");
        $("#k-element-text824").closest(".k-element-box").css({
            'display': 'none'
        });
        $("#k-element-image8214").closest(".k-element-box").css({
            'display': 'none'
        });
        $("#k-element-text8220").closest(".k-element-box").addClass("disabled");
    } else {
        if (TPIData.AllowedAttempts > 0 &&
            TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].levels[3].attempted != undefined &&
            TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].levels[3].attempted >= TPIData.AllowedAttempts) {
            $("#k-element-image8216").css({
                'opacity': '0.4'
            });
            $("#k-element-image8216").closest(".k-element-box").addClass("disabled")
        }
    }
    if (visibleLevels.level4 === false) {
        $(".heading_dt.level4").addClass("disabled").attr({
            "aria-disabled": "true"
        });
        $(".dd_text.level4").addClass("disabled").attr({
            "aria-disabled": "true"
        });
        $("#k-element-image8231").closest(".k-element-box").addClass("disabled");
        $("#k-element-text8217").closest(".k-element-box").addClass("disabled");
        $("#k-element-image8215").closest(".k-element-box").addClass("disabled");
        $("#k-element-text8212").closest(".k-element-box").css({
            'display': 'none'
        });
        $("#k-element-image828").closest(".k-element-box").css({
            'display': 'none'
        });
        $("#k-element-text8221").closest(".k-element-box").addClass("disabled");
    } else {
        if (TPIData.AllowedAttempts > 0 &&
            TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].levels[4].attempted != undefined &&
            TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].levels[4].attempted >= TPIData.AllowedAttempts) {
            $("#k-element-image8215").css({
                'opacity': '0.4'
            });
            $("#k-element-image8215").closest(".k-element-box").addClass("disabled")
        }
    }

    if (LevelAccess.IsAllLevelsAttempted() == true) {
        $("#k-element-button821").closest(".k-element-box").addClass("disabled");
    }
}


//1. Level Access
var LevelAccess = (function () {
    var tempVisLvls = [{
        level: "start",
        id: 0,
        pgid: 3,
        totQs: 0,
        isLevel: true,
        totPgs: 1,
        CPN: 0
    }, {
        level: "level1",
        id: 2,
        pgid: 4,
        totQs: 40,
        isLevel: true,
        totPgs: 11,
        CPN: 0
    }, {
        level: "level2",
        id: 3,
        pgid: 16,
        totQs: 20,
        isLevel: true,
        totPgs: 4,
        CPN: 0
    }, {
        level: "level3",
        id: 4,
        pgid: 20,
        totQs: 40,
        isLevel: true,
        totPgs: 10,
        CPN: 0
    }, {
        level: "summary",
        id: 5,
        pgid: 30,
        totQs: 0,
        isLevel: false,
        totPgs: 0,
        CPN: 0
    }];

    return {
        isLevelAttempted: function (_indx) {

            var pyes = false;
            if (tempVisLvls[_indx].isLevel) {
                if (TPIData.Mode != LaunchMode.review) {
                    if (TPIData.AllowedAttempts > 0 &&
                        TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].levels[tempVisLvls[_indx].id].attempted != undefined &&
                        TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].levels[tempVisLvls[_indx].id].attempted >= TPIData.AllowedAttempts) {
                        pyes = true;
                    }
                }
            }
            return pyes;
        },
        isLevelVisible: function (lvl) {

            for (var key in visibleLevels) {
                if (visibleLevels.hasOwnProperty(key)) {
                    if (key == lvl.level) {
                        return visibleLevels[key];
                        break;
                    }
                }
            }
            return false;
        },
        IsAllLevelsAttempted: function () {
            var result = true;
            var _this = this;
            var Attempted = function (tmp) {
                for (var i = 1; i <= tmp.length - 1; i++) {
                    if (_this.isLevelVisible(tmp[i])) {
                        if (!_this.isLevelAttempted(i)) {
                            result = false;
                            break;
                        }
                    }
                }
            };
            Attempted(tempVisLvls);
            return result;
        },
        JumpToNextAccessibleLevel: function (thisLevel) {
            var gotopageid = 0;
            var _this = this;
            var next = function (tmp, key) {
                for (var i = 0; i < tmp.length - 1; i++) {
                    if (tmp[i].level === key) {
                        do {
                            i++;
                        } while ((_this.isLevelVisible(tmp[i]) == false || _this.isLevelAttempted(i)) && i < tmp.length - 1);
                        gotopageid = tmp[i].pgid;
                        break;
                    }
                }
            };
            next(tempVisLvls, thisLevel);
            return gotopageid;
        },
        GetTotalQs: function () {
            var result = 0;
            var _this = this;
            var sum = function (tmp) {
                for (var i = 0; i < tmp.length; i++) {
                    if (tmp[i].isLevel === true && _this.isLevelVisible(tmp[i]) == true) {
                        result += tmp[i].totQs;
                    }
                }
            };
            sum(tempVisLvls);
            return result;
        },
        GetAllLevelsArray: function () {
            var result = [];
            var _this = this;
            var allLevels = function (tmp) {
                for (var i = 0; i < tmp.length; i++) {
                    if (tmp[i].isLevel === true) {
                        result.push(tmp[i]);
                    }
                }
            };
            allLevels(tempVisLvls);

            return result;
        }
    };

})();

// 2. User Scoring
var g_userScore = (function () {
    var arrScore = [0, 0, 0, 0],
        bestScore = [0, 0, 0, 0];

    return {
        GetScoreArray: function () {
            return arrScore;
        },
        SetScoreArray: function (arrS) {
            arrScore = arrS;
        },
        GetBestScoreArray: function () {
            return bestScore;
        },
        SetBestScoreArray: function (arrS) {
            bestScore = arrS;
        },
        GetLevelScore: function (idx) {
            return arrScore[idx];
        },
        SetLevelScore: function (idx, levelScore) {
            arrScore[idx] = levelScore;
        },
        SetLevelScoreToZeroForAttempt: function (idx) {
            this.UpdateBestScore(idx, arrScore[idx]);
            arrScore[idx] = 0;
        },
        GetTotalScore: function () {
            if (TPIData.Mode !== LaunchMode.review) {
                var total = 0;
                for (var i = 0; i < arrScore.length; i++) {
                    total += arrScore[i];
                }
                var totScore = total / LevelAccess.GetTotalQs() * 100;
                if (totScore != parseInt(totScore))
                    totScore = totScore.toFixed(2);
                return totScore;
            } else {
                var totScore = TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].overallScore;
                return totScore;
            }
        },
        UpdateBestScore: function (idx) {
            if (bestScore[idx] < arrScore[idx]) {
                bestScore[idx] = arrScore[idx];
            }
        },
        AddScoreToLevel: function (idx, qScore) {
            this.SetLevelScore(idx, this.GetLevelScore(idx) + qScore);
        },
        ShowScore: function () {
            $("#scorediv").show();
            $("#scoreInnrDiv").html(this.GetTotalScore() + "%");
            if (isAndroid) {
                $("#scorediv").attr("aria-label", $("#scorediv").text());
            }
        }
    };
})();

//4. User attempts Module
var Module = (function () {
    var arrUserAttempts = [];

    function GetIndexOfLevelQid(levelNo, qid) {
        // check Qid and LevelNo is present
        var indx = -1;
        for (var i = 0; i < arrUserAttempts.length; i++) {
            var temp = arrUserAttempts[i];
            if (temp.LevelNo == levelNo && temp.Qid == qid) {
                indx = i;
                break;
            }
        }
        return indx;
    };

    return {
        Set: function (arrUA) {
            arrUserAttempts = arrUA;
        },
        Get: function () {
            return arrUserAttempts;
        },
        //Get user data
        GetUserAttemptsData: function (AttDett) {
            var indx = GetIndexOfLevelQid(AttDett.LevelNo, AttDett.Qid);
            if (indx > -1) {
                var temp = arrUserAttempts[indx];
                return temp;
            }
        },
        //Update the maxscore data to database and update levelwise score too
        UpdateAttemptMaxScore: function (AttDett, popupCntrl) {
            var isWorsen = AttDett.IsWorsen === true ? true : false;
            if (isWorsen == true) {
                if (popupCntrl == undefined) {
                    $(".row.pgfeedback .col1 .k-element-text").append($('<p class="popupNote"><span><i>Note: Even though you missed this question, because you got a better score in a previous attempt, the score from that attempt will count towards the final grade.</i></span></p></br>'));
                } else {
                    popupCntrl.append($('<p class="popupNote"><span><i>Note: Even though you missed this question, because you got a better score in a previous attempt, the score from that attempt will count towards the final grade.</i></span></p></br>'));
                }
            }
            g_userScore.AddScoreToLevel(AttDett.LevelNo, AttDett.MaxScore);
            //return AttDett;
            this.UpdateUserAttempts(AttDett);
        },
        //insert or update users current attempt
        UpdateUserAttempts: function (AttDett) {
            var indx = GetIndexOfLevelQid(AttDett.LevelNo, AttDett.Qid);
            if (indx > -1) {
                var prevAttDett = arrUserAttempts[indx]; //reference
                if (AttDett.MaxScore > prevAttDett.MaxScore) {
                    prevAttDett.MaxScore = AttDett.MaxScore;
                    prevAttDett.IsCorrect = AttDett.IsCorrect;
                }
            } else {
                arrUserAttempts.push(AttDett);
            }
            //knowdl tracking
            if (AttDett != undefined) {
                var obj = {}
                obj.QId = AttDett.Qid;
                obj.QPoints = AttDett.MaxScore;
                obj.QTotal = AttDett.QTotal;
                obj.QText = $("<div>" + AttDett.QText + "</div>").text();
                KnowdlTracking.SendPageData(obj);
            }
        },
        //Increament Attempted number
        IncreamentAttempted: function (levelNo) {
            if (TPIData.Mode != LaunchMode.review) {
                var cLevel = TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].levels[levelNo];
                if (cLevel.attempted === undefined) {
                    cLevel.attempted = 0;
                }
                cLevel.attempted++;
            }
        }
    };

})();

var reviewModeNo = 1; // default best score attempt number
//5. Service calls Module
//++++++++++++++++++ Service calls ++++++++++++++++++
var ServiceCalls = (function () {
    //URLs
    var _serviceurl = window.location.origin + "/econservice";
    //var _gradePostUrl = "http://cert.isb.lift.pearsoncmg.com/v1/dataexchange/tpi/submit";
    return {
        get_service_Url: function () {
            return _serviceurl;
        },
        set_reviewModeNoUsingHref: function () {
            if (Utility.getParameterByName("mode", window.location.href) === LaunchMode.review) {
                reviewModeNo = Number(Utility.getParameterByName("att", window.location.href));
            }
        },
        //Get session data from server
        get_session_data: function () {
            var servcUrl = _serviceurl + "/gldata/get_session_data/" + TPIData.SessionId + "/";
            $.ajax({
                type: "GET",
                url: servcUrl,
                dataType: "json",
                async: false,
                cache: false,
                success: function (result) {
                    

                    //att=1&mode=review
                    var atmptIndx = TPIAttempts.Attempts.length;
                    if (TPIData.Mode === LaunchMode.review) {
                        atmptIndx = reviewModeNo;
                    }

                    

                    if (TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].reqdData != undefined) {
                        if (TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].reqdData.UserScoreArray != undefined)
                            g_userScore.SetScoreArray(TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].reqdData.UserScoreArray);

                        if (TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].reqdData.UserBestScoreArray != undefined)
                            g_userScore.SetBestScoreArray(TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].reqdData.UserBestScoreArray);

                        if (TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].reqdData.youPersona)
                            youPersona = TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].reqdData.youPersona;

                        if (TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].reqdData.g_isFromSummary)
                            g_isFromSummary = TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].reqdData.g_isFromSummary;
                    }
                    PPFQuestion.InitBookmark(); //DDeva

                    if (TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].reqdData.gVisitedPage)
                        gVisitedPage = TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].reqdData.gVisitedPage;
                    if (TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].duration)
                        g_TPIDuration = Number(TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].duration);

                    ServiceCalls.getInflationSettings();

                    $("#scorediv").show();
                    g_userScore.ShowScore();

                    Module.Set(TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].arrUserAttempts)

                    KnowdlTracking.InitLaunch();
                    KnowdlTracking.InitBookmarking();

                    var hideLoader = true;
                    var autoredirect = true;
                    if (TPIData.Mode === LaunchMode.do) {
                        if (TPIAttempts.Attempts !== undefined &&
                            atmptIndx > 0 && (TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].lastVisitedPgIndex - 1) > 0) {
                            //GotoPage(TPIAttempts.Attempts[TPIAttempts.Attempts.length - 1].lastVisitedPgIndex);
                            hideLoader = false;
                            autoredirect = false;
                        }
                    }
                    if (autoredirect) {
                        GotoPageId(gPages[2].PageId);
                    }
                },
                error: function (error) {
                    //$('#k-element-text34').closest('.k-element-box').css("display", "none");
                    //$('#k-element-image34').closest('.k-element-box').css("display", "none");
                    //$('#tk-element-button31').closest('.k-element-box').removeClass("disabled");
                    if (TPIData.Roles.trim().toLowerCase().indexOf(UserRoles.presenter) >= 0) {
                        $(".levelfooterdiv").show();
                    }
                    if (TPIAttempts == undefined)
                        TPIAttempts = {};
                    if (TPIAttempts.Attempts == undefined) {
                        TPIAttempts.Attempts = [];
                        TPIAttempts.Attempts.push(attempt)
                    }
                    GotoPageId(gPages[2].PageId);
                }
            });

        },        
    };
})();

var userAgentCustom = window.navigator.userAgent;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);