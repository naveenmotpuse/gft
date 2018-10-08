//need to initiate in document.ready
var _startTime = new Date();

//This api will contain navigation logic and page load.
//It will also handle the question navigation if the page is having multiple questions.
var _Navigator = (function () {
    var _currentPageId = "";
    var _currentPageObject = {};
    var _progressLevels = [1, 8, 8, 3, 6];
    var _AttemptNData = {};
    var _TempNData = {};
    var _bookmarkData = {};
    /*
    var _bookmarkData = {
        pageId:"",
        questionId:"",
        duration:0
    };*/
    var _lastDuration = 0;
    var _levelStartPages = ["l1p1", "l1p2", "l2p1", "l3p1", "l4p1","summary"];
    var _NData = {
        "l1p1": {
            pageId: "l1p1",
            prevPageId: "",
            nextPageId: "l1p2",
            dataurl: "l1p1.htm",
            datalevel: 0,
            questions: [],
            isStartPage: true,
            hasAnimation: true,
            isLevelStart:true,
            isLevelEnd:true
        },
        "l1p2": {
            pageId: "l1p2",
            prevPageId: "l1p1",
            nextPageId: "l1p3",
            dataurl: "l1p2.htm",
            datalevel: 1,
            questions: [{
                Id: "Q1",
                dataurl: "l1p2/q1.htm"
            }, {
                Id: "Q2",
                dataurl: "l1p2/q2.htm"
            }, {
                Id: "Q3",
                dataurl: "l1p2/q3.htm"
            }],
            hasAnimation: true,
            isLevelStart:true
        },
        "l1p3": {
            pageId: "l1p3",
            prevPageId: "l1p2",
            nextPageId: "l1p4",
            dataurl: "l1p3.htm",
            datalevel: 1,
            questions: [{
                Id: "Q4",
                dataurl: "l1p3/q4.htm"
            }],
            hasTimeSlider: true,
            hasAnimation: true
        },
        "l1p4": {
            pageId: "l1p4",
            prevPageId: "l1p3",
            nextPageId: "l1p5",
            dataurl: "l1p4.htm",
            datalevel: 1,
            questions: [{
                Id: "Q5",
                dataurl: "l1p4/q5.htm"
            }, {
                Id: "Q6",
                dataurl: "l1p4/q6.htm"
            }, {
                Id: "Q7",
                dataurl: "l1p4/q7.htm"
            }],
            hasAnimation: true,
            isFriday: true,
        },
        "l1p5": {
            pageId: "l1p5",
            prevPageId: "l1p4",
            nextPageId: "l2p1",
            dataurl: "l1p5.htm",
            datalevel: 1,
            questions: [{
                Id: "Q8",
                dataurl: "l1p5/q8.htm"
            }],
            hasTimeSlider: true,
            hasAnimation: true,
            isFriday: true,
            isLevelEnd:true       
        },
        "l2p1": {
            pageId: "l2p1",
            prevPageId: "l1p5",
            nextPageId: "l2p2",
            dataurl: "l2p1.htm",
            datalevel: 2,
            questions: [],
            hasAnimation: true,
            isLevelStart:true,
        },
        "l2p2": {
            pageId: "l2p2",
            prevPageId: "l2p1",
            nextPageId: "l2p3",
            dataurl: "l2p2.htm",
            datalevel: 2,
            questions: [{
                Id: "Q9",
                dataurl: "l2p2/q9.htm"
            },
            {
                Id: "Q10",
                dataurl: "l2p2/q10.htm"
            },
            {
                Id: "Q11",
                dataurl: "l2p2/q11.htm"
            },
            {
                Id: "Q12",
                dataurl: "l2p2/q12.htm"
            },
            {
                Id: "Q13",
                dataurl: "l2p2/q13.htm"
            },
            {
                Id: "Q14",
                dataurl: "l2p2/q14.htm"
            }
            ]
        },
        "l2p3": {
            pageId: "l2p3",
            prevPageId: "l2p2",
            nextPageId: "l3p1",
            dataurl: "l2p3.htm",
            datalevel: 2,
            questions: [{
                Id: "Q15",
                dataurl: "l2p3/q15.htm"
            }],
            customNext: {
                isComplete: false,
                jsFunction: "EventManager.onNextDay();",
            },
            hasTimeSlider: true,
            hasTradeSlider: true,
            hasAnimation: true,
            isLevelEnd:true
        },
        "l3p1": {
            pageId: "l3p1",
            prevPageId: "l2p3",
            nextPageId: "l3p2",
            dataurl: "l3p1.htm",
            datalevel: 3,
            questions: [],
            hasActivity: true,
            hasAnimation: true,
            isLevelStart:true,
        },
        "l3p2": {
            pageId: "l3p2",
            prevPageId: "l3p1",
            nextPageId: "l3p3",
            dataurl: "l3p2.htm",
            datalevel: 3,
            questions: [{
                Id: "Q16",
                dataurl: "l3p2/q16.htm"
            }],
            customNext: {
                isComplete: false,
                jsFunction: "EventManager.onNextDay();",
            },
            hasTimeSlider: true,
            hasTradeSlider: true,
            hasAnimation: true,
        },
        "l3p3": {
            pageId: "l3p3",
            prevPageId: "l3p2",
            nextPageId: "l4p1",
            dataurl: "l3p3.htm",
            datalevel: 3,
            questions: [{
                Id: "Q17",
                dataurl: "l3p3/q17.htm"
            }],
            customNext: {
                isComplete: false,
                jsFunction: "EventManager.onNextDay();",
            },
            hasTimeSlider: true,
            hasTradeSlider: true,
            hasAnimation: true,
            isLevelEnd:true
        },
        "l4p1": {
            pageId: "l4p1",
            prevPageId: "l3p3",
            nextPageId: "l4p2",
            dataurl: "l4p1.htm",
            datalevel: 4,
            questions: [],
            hasTimeSlider: false,
            hasTradeSlider: false,
            hasAnimation: true,
            isLevelStart:true,
        },
        "l4p2": {
            pageId: "l4p2",
            prevPageId: "l4p1",
            nextPageId: "l4p3",
            dataurl: "l4p2.htm",
            datalevel: 4,
            questions: [{
                Id: "Q18",
                dataurl: "l4p2/q18.htm"
            }],

        },
        "l4p3": {
            pageId: "l4p3",
            prevPageId: "l4p2",
            nextPageId: "l4p4",
            dataurl: "l4p3.htm",
            datalevel: 4,
            isFriday: true,
            questions: [{
                Id: "Q19",
                dataurl: "l4p3/q19.htm"
            }],
        },

        "l4p4": {
            pageId: "l4p4",
            prevPageId: "l4p3",
            nextPageId: "l4p5",
            dataurl: "l4p4.htm",
            datalevel: 4,
            questions: [{
                Id: "Q20",
                dataurl: "l4p4/q20.htm"
            },
            {
                Id: "Q21",
                dataurl: "l4p4/q21.htm"
            }
            ],
            hasTimeSlider: false,
            hasTradeSlider: false,
            hasAnimation: false,
            hasScenario: true,
        },
        "l4p5": {
            pageId: "l4p5",
            prevPageId: "l4p4",
            nextPageId: "summary",
            dataurl: "l4p5.htm",
            datalevel: 4,
            questions: [{
                Id: "Q22",
                dataurl: "l4p5/q22.htm"
            }],
            customNext: {
                isComplete: false,
                jsFunction: "EventManager.onNextDay();",
            },
            hasTimeSlider: true,
            hasTradeSlider: true,
            hasAnimation: true,
            isLevelEnd:true
        },
        "summary": {
            pageId: "summary",
            prevPageId: "l4p5",
            nextPageId: "",
            dataurl: "summary.htm",
            datalevel: 5,
            questions: [],
            isLevelStart:true,
            isLevelEnd:true,
            isLastPage: true,
        }
    }
    var _StateData = {}

    function OnPageLoad(jsonObj, buttonPressed) {
        _bookmarkData.pageId = _currentPageObject.pageId;
        _bookmarkData.questionId = "";
        if(_currentPageObject.pageId == "summary") {
            _bookmarkData.levelRetry = "";    
        }
        _TopSlider.OnLoad();
        _CustomPage.OnPageLoad();
        _Navigator.UpdateMenuVisibility();
        _Navigator.LoadDefaultQuestion(jsonObj, buttonPressed);
        _Module.SaveSessionData();
    }
    return {
        Get: function () {
            return _NData;
        },
        Start: function (jsonObj) {
            var Dataurl = $.url('?page');
            if (Dataurl == "" || Dataurl == undefined) {
                this.LoadPage("l1p1", jsonObj);
            } else {
                this.LoadPage(Dataurl, jsonObj);
            }
        },
        GetBookmarkData: function () { 
            _bookmarkData.duration = this.GetTotalDuration();           
            return JSON.parse(JSON.stringify(_bookmarkData));
        },
        SetBookmarkData: function(extendedJson){
            _bookmarkData = $.extend(true, _bookmarkData, extendedJson)
        },
        InitBookmarkData: function(_bdata_object){
            _bookmarkData = JSON.parse(JSON.stringify(_bdata_object));
            if(_bookmarkData.duration!=undefined){
                _lastDuration = parseInt(_bookmarkData.duration);
            }
        },
        GetTotalDuration: function(){
            return parseInt((new Date().getTime() - _startTime.getTime()) / 1000) + _lastDuration;
        },
        GetNavigationData: function () {
            return JSON.parse(JSON.stringify(_NData));
        },
        InitNavigationData: function (_ndata_object) {
            _NData = JSON.parse(JSON.stringify(_ndata_object));
        },
        LoadPage: function (pageId, jsonObj, buttonPressed) {
            debugger;
            _currentPageId = pageId;
             if (!_Common.IsEmptyObject(jsonObj) && jsonObj != undefined) {
                if (jsonObj.isBookMark) {
                    _currentPageId = jsonObj.bookmarkdata.pageId;
                }
                else if (jsonObj.isMenuVisit) {
                    _currentPageId = jsonObj.pageId;
                }

            }
            
            if(isIpad){
                $('.progress *').removeAttr('aria-hidden');
                $('.progress').attr('aria-label','Level 1 progress 0%, Level 2 progress 0%, Level 3 progress 0%, Level 4 progress 0%')
                $('.progress').attr('role','text');
                $('.progress').attr('tabindex','0')
            }
            this.UpdateProgressBar();
            
            // if level retry then jump to summary page
            if(this.GetBookmarkData().levelRetry == 'level') {
                if(_currentPageObject.datalevel < _NData[_currentPageId].datalevel) {
                    _currentPageId = 'summary';
                } 
            }
            _currentPageObject = _NData[_currentPageId];
            
            if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
                $("#linkprevious").k_disable();
                $("#linknext").k_enable();
            }
            if(this.GetBookmarkData().levelRetry == 'level' && _currentPageObject.isLevelStart) {
                $("#linkprevious").k_disable();
            }
            if (_currentPageObject.hasActivity != undefined && _currentPageObject.hasActivity &&
                (_currentPageObject.IsComplete == undefined || !_currentPageObject.IsComplete)) {
                $("#linknext").k_disable();
            } else {
                $("#linknext").k_enable();
            }
            if (_currentPageObject.isLastPage != undefined && _currentPageObject.isLastPage) {
                $("#linknext").k_disable();
                $("#header-btn-container *").hide();
                $("#scorediv").css("bottom","9px");
            }
            else{
                $("#header-btn-container *").show();
                $("#scorediv").css("bottom","53px");
            }
            _currentPageObject.isVisited = true;

            var pageUrl = _Settings.dataRoot + _currentPageObject.dataurl + _Caching.GetUrlExtension();
            if (_currentPageObject.isStartPage) {
                $(".main-content").load(pageUrl, function () {
                    OnPageLoad(jsonObj, buttonPressed);                    
                    _Common.SetReader(_Settings.hiddenAnchor,"pagetitle");
                    if(_Navigator.GetBookmarkData().levelRetry == 'level' || _Navigator.GetBookmarkData().levelRetry == 'all') {
                        $("#appmenu").k_disable();
                    }
                });
            } else {
                $(".main-content").fadeTo(250, 0.25, function () {
                    $(".main-content").load(pageUrl, function () {
                        $(this).fadeTo(600, 1)
                        OnPageLoad(jsonObj, buttonPressed);
                        
                        if (isIpad) {
                            _Common.SetReader(_Settings.hiddenAnchor, "progress");
                        } else {
                            _Common.SetReader(_Settings.hiddenAnchor, "progress_bar");
                        }
                        if(_Navigator.GetBookmarkData().levelRetry == 'level' || _Navigator.GetBookmarkData().levelRetry == 'all') {
                            $("#appmenu").k_disable();
                        }
                        if(_currentPageObject.pageId == 'summary'){
                            $("#appmenu").k_enable();
                            $("#appmenu").removeAttr('disabled');
                            $("#appmenu").removeClass('disabled');
                            _LevelAccess.InitLevels();
                        }
                    });
                })
            }
        },
        LoadDefaultQuestion: function (jsonObj, buttonPressed) {
            if (_currentPageObject.questions.length > 0) {
                _questionId = 0;
                if (!_Common.IsEmptyObject(jsonObj) && jsonObj != undefined) {
                    if (jsonObj.isBookMark) {
                        for (var i = 0; i < _currentPageObject.questions.length; i++) {
                            if ((jsonObj.bookmarkdata.Qid == _currentPageObject.questions[i].Id)) {
                                _questionId = i;
                            }
                        }
                    }
                    else if (jsonObj.isMenuVisit) {
                        for (var i = 0; i < _currentPageObject.questions.length; i++) {
                            _currentPageObject.questions[i].isQuestionVisit = false;
                        }
                        _currentPageObject.questions[0].isQuestionVisit = true;
                        _questionId = 0;
                    }

                }
                else {
                    _currentPageObject.questions[0].isQuestionVisit = true;
                    _questionId = 0;
                    if(buttonPressed == 'prev') {
                        _questionId = _currentPageObject.questions.length - 1
                    }
                }
                //second parameter is to disable question effect.
                _Question.Load(_currentPageObject.questions[_questionId], {
                    disableEffect: true
                });
            }
        },        
        Prev: function () {
            if (_currentPageObject.questions.length > 0) {
                //if current question is first then jump to prev page
                if(_Question.GetCurrentQuestion().Id == _currentPageObject.questions[0].Id) {
                    var prvPageId = _currentPageObject.prevPageId;
                    if(_currentPageObject.isLevelStart) {
                        prvPageId = _LevelAccess.JumpToPreviousAvailableLevel(_currentPageObject.datalevel);
                    }
                    this.LoadPage(prvPageId, undefined,'prev');
                } else {
                    _Question.Prev();
                }
            } else {
                var prvPageId = _currentPageObject.prevPageId;
                if(_currentPageObject.isLevelStart) {
                    prvPageId = _LevelAccess.JumpToPreviousAvailableLevel(_currentPageObject.datalevel);
                }
                this.LoadPage(prvPageId, undefined,'prev');
            }
        },
        Next: function () {
            $("#linkprevious").k_enable();
            if (_currentPageObject.customNext != undefined && !_currentPageObject.customNext.isComplete) {
                var custFunction = new Function(_currentPageObject.customNext.jsFunction);
                custFunction();
            } else if (_currentPageObject.questions.length > 0) {
                var IsAllQCompleted = true;
                
                //if current question is last then over, jump to next page
                if(_Question.GetCurrentQuestion().Id == _currentPageObject.questions[_currentPageObject.questions.length-1].Id) {
                    IsAllQCompleted = true;
                } else {
                    IsAllQCompleted = false;
                }
                if (IsAllQCompleted) {
                    var nxtPageId = _currentPageObject.nextPageId
                    if(_currentPageObject.isLevelEnd) {
                        nxtPageId = _LevelAccess.JumpToNextAccessibleLevel(_currentPageObject.datalevel);
                    }                    
                    this.LoadPage(nxtPageId, undefined, 'next');

                } else {
                    this.UpdateProgressBar();
                    _Question.Next();
                }
            } else {
                if (_currentPageObject.IsComplete == undefined || !_currentPageObject.IsComplete) {
                    this.CompletePage()
                }
                var nxtPageId = _currentPageObject.nextPageId;
                if(_currentPageObject.isLevelEnd) {
                    nxtPageId = _LevelAccess.JumpToNextAccessibleLevel(_currentPageObject.datalevel);
                }
                this.LoadPage(nxtPageId, undefined, 'next');
            }
        },
        UpdateMenuVisibility: function () {
            for (var i = 0; i < _levelStartPages.length; i++) {
                if(_NData[_levelStartPages[i]].isVisited)
                {
                    $("a.menuitem[data-id='" + _NData[_levelStartPages[i]].pageId + "']").closest("li").css("display", "block"); 
                    // double reading issue //
                    //$("a.menuitem[data-id='" + _NData[_levelStartPages[i]].pageId + "']").closest("li").removeAttr("aria-hidden");
                    if (isAndroid){
                        var panel=  $("a.menuitem[data-id='" + _NData[_levelStartPages[i]].pageId + "']").closest("li a").text();
                         $("a.menuitem[data-id='" + _NData[_levelStartPages[i]].pageId + "']").closest("li").attr('aria-label', panel).removeAttr('aria-hidden');
                         $("a.menuitem[data-id='" + _NData[_levelStartPages[i]].pageId + "']").closest("li a").attr('aria-hidden','true');
                    }
                }
            }
            if(isIpad){
                $('.menu-icon *').removeAttr("aria-hidden");
            }
        },
        GetProgressData: function () {
            var progData = [];

            for (var p = 0; p < _progressLevels.length; p++) {
                var visitpage = 0;
                for (var i in _NData) {
                    if (p == _NData[i].datalevel) {
                        if (_NData[i].questions.length > 0) {
                            for (var j = 0; j < _NData[i].questions.length; j++) {
                                if (_NData[i].questions[j].isAnswered) {
                                    visitpage++;
                                }
                            }
                        } else {
                            if (_NData[i].IsComplete) {
                                visitpage++;
                            }
                        }
                    }
                }
                progData.push(visitpage);
            }
            return progData;
        },
        UpdateProgressBar: function () {
            var arialabel = "Level 1 progress 1%, Level 2 progress 2%, Level 3 progress 3%, Level 4 progress 4%";
            var progData = this.GetProgressData();
            for (var i = 0; i < progData.length; i++) {
                var lprog_pecent = (progData[i] / _progressLevels[i] * 100);
                $(".pgBgItem[data-level='" + i + "']").find(".pgBgItemFill").css("width", lprog_pecent + "%");
                arialabel = arialabel.replace(i + "%", lprog_pecent + "%")
                if (lprog_pecent == 100) {
                    $(".pgBgItem[data-level='" + i + "']").addClass("pgBgItemComplete")
                }
            }
            if(isIpad){
                $(".progress").attr("aria-label", arialabel);
            }else{
                $(".progress .background").attr("aria-label", arialabel);
            }
        },
        GetCurrentPage: function () {
            return _currentPageObject;
        },
        CompletePage: function (extendedJson) {
            _currentPageObject.IsComplete = true;
            _currentPageObject = $.extend(true, _currentPageObject, extendedJson)
            _StateData[_currentPageObject.pageId] = $.extend(true, {}, _currentPageObject);
        },
        GetTotalScore: function () {
            var ObtainPoint = 0;
            var totalPoints = 0;
            for (var i in _NData) {
                if(_LevelAccess.IsLevelVisible({"level": _NData[i].datalevel})) {
                    if (_NData[i].questions.length > 0) {
                        for (var j = 0; j < _NData[i].questions.length; j++) {
                            totalPoints = totalPoints + _QData[_NData[i].questions[j].Id].totalPoints;
                            if (_NData[i].questions[j].isAnswered != undefined && _NData[i].questions[j].isAnswered) {
                                ObtainPoint = ObtainPoint + (_NData[i].questions[j].points);
                            }
                        }
                    }
                }
            }
            var score = (ObtainPoint / totalPoints) * 100;
            return Number(score.toFixed(2));
        },
        UpdateScore: function () {
            var percScore = this.GetTotalScore()
            $("#scorediv").html("Overall Score: " + (percScore.toFixed(2)) + "%");
        },
        GetLevelScore: function (Data_Level) {
            var ObtainPoint = 0;
            var totalPoints = 0;
            //var levelScrore = [];
            for (var i in _NData) {
                if (_NData[i].questions.length > 0) {
                    for (var j = 0; j < _NData[i].questions.length; j++) {
                        if (_NData[i].datalevel == Data_Level) {
                            totalPoints = totalPoints + _QData[_NData[i].questions[j].Id].totalPoints;
                            if (_NData[i].questions[j].isAnswered != undefined && _NData[i].questions[j].isAnswered) {
                                ObtainPoint = ObtainPoint + (_NData[i].questions[j].points);
                            }
                        }
                    }
                }
            }
            var score = (ObtainPoint / totalPoints) * 100;
            return score
        },
        UpdateDefaultNData: function () {
            //NM: The call to this function should be only once in document.ready first call.
            //Used to save default navigator data.
            _TempNData = $.extend(true, {}, _NData);
        },
        GetAttemptNData: function () {
            return _AttemptNData;
        },
        GetQuestionAttemptData: function (pageId, Qid) {
            if (!_Common.IsEmptyObject(_AttemptNData)) {
                for (var i = 0; i < _AttemptNData[pageId].questions.length; i++) {
                    if (_AttemptNData[pageId].questions[i].Id == Qid) {
                        return _AttemptNData[pageId].questions[i];
                    }
                }
            }
        },        
        ReAttempt: function () {
            _AttemptNData = $.extend(true, {}, _NData);
            _NData = $.extend(true, {}, _TempNData);

            _Navigator.SetBookmarkData({ "levelRetry": 'all' })
            _Navigator.UpdateProgressBar();
            _Navigator.UpdateScore();
            DataStorage.ModuleRetry();
            _Navigator.LoadPage('l1p1');

            var progData = this.GetProgressData();
            for (var i = 0; i < progData.length; i++) {
                $(".pgBgItem[data-level='" + i + "']").removeClass("pgBgItemComplete");
            }
        },
        ReAttemptLevel: function (datalevel) {
            var pageId = "";
            for (var i in _NData) {
                if (_NData[i].datalevel == datalevel) {
                    _AttemptNData[i] = $.extend(true, {}, _NData[i]);
                    _NData[i] = $.extend(true, {}, _TempNData[i]);
                    if (pageId == "") {
                        pageId = _NData[i].pageId;
                    }
                }
            }
            _Navigator.SetBookmarkData({ "levelRetry": 'level' })
            _Navigator.LoadPage(pageId);
            _Navigator.UpdateScore();
            DataStorage.ModuleRetry();
            _Navigator.UpdateProgressBar();
            $(".pgBgItem[data-level='" + datalevel + "']").removeClass("pgBgItemComplete");
        },
        ordinalInWord: function(t){var e=["Zeroth","First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth","Ninth","Tenth","Eleventh","Twelfth","Thirteenth","Fourteenth","Fifteenth","Sixteenth","Seventeenth","Eighteenth","Nineteenth","Twentieth"];return t<=20?e[t]:t%10==0?{30:"Thirtieth",40:"Fortieth",50:"Fiftieth",60:"Sixtieth",70:"Seventieth",80:"Eightieth",90:"Ninetieth",100:"Hundredth"}[t]:{20:"Twenty ",30:"Thirty ",40:"Forty ",50:"Fifty ",60:"Sixty ",70:"Seventy ",80:"Eighty ",90:"Ninety ",100:"Hundred "}[t-t%10]+e[t%10]},
        GetLastPageId: function (thisLevel) {  
            var prevPageId = 1;  
            for (var key in arrTreeSettings) { 
                if (typeof arrTreeSettings[key] != "undefined" && 
                    typeof arrTreeSettings[key].options != "undefined" && 
                    arrTreeSettings[key].options[0].level == thisLevel) {
                if (typeof arrTreeSettings[key].isLastPage != "undefined" && 
                        arrTreeSettings[key].isLastPage != undefined && 
                        arrTreeSettings[key].isLastPage) {
                    prevPageId = arrTreeSettings[key].pgid;
                    break;
                };
                };
            };
            return prevPageId;
        },
    };
})();

$(document).on("click", "#linkprevious", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Prev();
});
$(document).on("click", "#linknext", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Next();
});
