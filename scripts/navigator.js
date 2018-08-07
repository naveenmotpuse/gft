//This api will contain navigation logic and page load.
//It will also handle the question navigation if the page is having multiple questions.
var _Navigator = (function () {
    var _currentPageId = "";
    var _currentPageObject = {};
    var progressLevels = [1, 8, 7, 0];
    var _NData = {
        "l1p1": {  
            pageId:  "l1p1",        
            prevPageId: "",
            nextPageId: "l1p2",
            dataurl: "l1p1.htm",
            datalevel: 0,            
            questions: [],
            isStartPage: true,
            hasAnimation:true,
        },
        "l1p2": {           
            pageId:  "l1p2", 
            prevPageId: "l1p1",
            nextPageId: "l1p3",
            dataurl: "l1p2.htm",
            datalevel: 1,
            questions: [{ Id: "Q1", dataurl: "l1p2/q1.htm" }, { Id: "Q2", dataurl: "l1p2/q2.htm" }, { Id: "Q3", dataurl: "l1p2/q3.htm" }],
            hasAnimation:true,
        },
        "l1p3": {   
            pageId:  "l1p3",          
            prevPageId: "l1p2",
            nextPageId: "l1p4",
            dataurl: "l1p3.htm",
            datalevel: 1,
            questions: [{ Id: "Q4", dataurl: "l1p3/q4.htm" }],
            hasTimeSlider: true,
            hasAnimation:true,
        },
        "l1p4": { 
            pageId:  "l1p4",              
            prevPageId: "l1p3",
            nextPageId: "l1p5",
            dataurl: "l1p4.htm",
            datalevel: 1,            
            questions: [{ Id: "Q5", dataurl: "l1p4/q5.htm" }, { Id: "Q6", dataurl: "l1p4/q6.htm" }, { Id: "Q7", dataurl: "l1p4/q7.htm" }],            
            hasAnimation:true,
            isFriday: true,
        },
        "l1p5": {  
            pageId:  "l1p5",                       
            prevPageId: "l1p4",
            nextPageId: "l2p1",
            dataurl: "l1p5.htm",
            datalevel: 1,
            questions: [{ Id: "Q8", dataurl: "l1p5/q8.htm" }],
            hasTimeSlider: true,  
            hasAnimation:true,
            isFriday: true,
        },
        "l2p1": {
            pageId:  "l2p1",   
            prevPageId: "l1p5",
            nextPageId: "l2p2",
            dataurl: "l2p1.htm",
            datalevel: 2,
            questions: [],
            hasAnimation:true,
        },
        "l2p2": {  
            pageId:  "l2p2",             
            prevPageId: "l2p1",
            nextPageId: "l2p3",
            dataurl: "l2p2.htm",
            datalevel: 2,
            questions: [{ Id: "Q9", dataurl: "l2p2/q9.htm" },
                        { Id: "Q10", dataurl: "l2p2/q10.htm" },
                        { Id: "Q11", dataurl: "l2p2/q11.htm" },
                        { Id: "Q12", dataurl: "l2p2/q12.htm" },
                        { Id: "Q13", dataurl: "l2p2/q13.htm" },
                        { Id: "Q14", dataurl: "l2p2/q14.htm" }]
        },
        "summary":{
            pageId:  "summary",            
            prevPageId: "",
            nextPageId: "", 
            dataurl: "summary.htm",           
            datalevel: 5,
            questions: [],
            isLastPage: true,            
        }        
    }
    var _StateData = {}

    function OnPageLoad(){
        _TopSlider.OnLoad();   
        _CustomPage.OnPageLoad();                    
        _Navigator.LoadDefaultQuestion();
        $("h2.pageheading").focus();
    }
    return {
        Get: function () {
            return _NData;
        },
        Start: function () {
            var Dataurl = $.url('?page');
            if (Dataurl == "" || Dataurl == undefined) {
                this.LoadPage("l1p1");                
            }
            else {
                this.LoadPage(Dataurl);                
            }
        },
        LoadPage: function (pageId) {
            _currentPageId = pageId;
            this.UpdateProgressBar();
            _currentPageObject = _NData[_currentPageId]            
            if(_currentPageObject.isStartPage!=undefined && _currentPageObject.isStartPage)
            {
                $("#linkprevious").k_disable();
                $("#linknext").k_enable();  
            }
            if(_currentPageObject.isLastPage!=undefined && _currentPageObject.isLastPage)
            {
               $("#linknext").k_disable();
            }
            _currentPageObject.isVisited = true; 
            
            var pageUrl = dataRoot + _currentPageObject.dataurl + "?npage=" + Math.random();
            if (_currentPageObject.isStartPage) {
                $(".main-content").load(pageUrl, function () {
                    OnPageLoad();
                });
            }
            else {
                $(".main-content").fadeTo(250, 0.25, function () {
                    $(".main-content").load(pageUrl, function () {
                        $(this).fadeTo(600, 1)
                        OnPageLoad();                        
                    });
                })
            }
        },
        LoadDefaultQuestion: function () {
            if (_currentPageObject.questions.length > 0) {

                _questionId = 0;
                _currentPageObject.questions[0].isQuestionVisit = true;
                for (var i = 0; i < _currentPageObject.questions.length; i++) {
                    if (_currentPageObject.questions[i].isCurrent) {
                        _questionId = i;
                    }
                }
                //second parameter is to disable question effect.
                _Question.Load(_currentPageObject.questions[_questionId],true);
            }
        },
        Prev: function () {
            if (_currentPageObject.questions.length > 0) {
                if (_currentPageObject.questions[0].isCurrent) {
                    this.LoadPage(_currentPageObject.prevPageId);
                }
                else {
                    _Question.Prev();
                }
            } else {
                this.LoadPage(_currentPageObject.prevPageId);
            }
        },
        Next: function () {
            debugger;
            $("#linkprevious").k_enable();
            if (_currentPageObject.questions.length > 0) {
                var IsAllQCompleted = true;
                for (var i = 0; i < _currentPageObject.questions.length; i++) {
                    if (_currentPageObject.questions[i].isAnswered == undefined || !_currentPageObject.questions[i].isAnswered || _currentPageObject.questions[i].isQuestionVisit == undefined || !_currentPageObject.questions[i].isQuestionVisit) {
                        IsAllQCompleted = false;
                        break;
                    }
                }
                if (IsAllQCompleted) {
                    this.LoadPage(_currentPageObject.nextPageId);

                }
                else {
                    this.UpdateProgressBar();
                    _Question.Next();
                }
            } else {
                if (_currentPageObject.IsComplete == undefined || !_currentPageObject.IsComplete) {
                    this.CompletePage()
                }
                this.LoadPage(_currentPageObject.nextPageId);
            }
        },
        GetProgressData: function () {
            var progData = [];

            for (var p = 0; p < progressLevels.length; p++) {
                var visitpage = 0;
                for (let i in _NData) {
                    if (p == _NData[i].datalevel) {
                        if (_NData[i].questions.length > 0) {
                            for (var j = 0; j < _NData[i].questions.length; j++) {
                                if (_NData[i].questions[j].isAnswered) {
                                    visitpage++;
                                }
                            }
                        }
                        else {
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
            var progData = this.GetProgressData();
            for (var i = 0; i < progData.length; i++) {
                var lprog_pecent = (progData[i] / progressLevels[i] * 100).toFixed(2);
                $(".pgBgItem[data-level='" + i + "']").find(".pgBgItemFill").css("width", lprog_pecent + "%");
                if (lprog_pecent == 100) {
                    $(".pgBgItem[data-level='" + i + "']").addClass("pgBgItemComplete")
                }
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
        GetTotalScore: function(){
            var ObtainPoint = 0;
            var totalPoints = 0;
            for (let i in _NData) {
                if (_NData[i].questions.length > 0) {
                    for (var j = 0; j < _NData[i].questions.length; j++) {
                        totalPoints = totalPoints + _QData[_NData[i].questions[j].Id].totalPoints;
                        if (_NData[i].questions[j].isAnswered!=undefined && _NData[i].questions[j].isAnswered) {
                            ObtainPoint = ObtainPoint + (_NData[i].questions[j].points);
                        }
                    }
                }
            }
            var score = (ObtainPoint / totalPoints) * 100;
            return score.toFixed(0);
        },
        UpdateScore: function () {            
            var percScore = this.GetTotalScore()
            $("#scoreInnrDiv").html(percScore + "%");
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
